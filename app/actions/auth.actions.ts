"use server";

import { connectDB } from "@/lib/db";
import { generateToken, verifyToken } from "@/lib/jwt";
import {
  loginSchemaType,
  registerSchemaType,
} from "@/lib/zodSchema/userSchema";
import { Session } from "@/models/Session";
import { User } from "@/models/User";
import { AppResponse } from "@/types/response";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";

export async function registerUser(
  _: AppResponse,
  data: registerSchemaType
): Promise<AppResponse> {
  try {
    await connectDB();

    const existingUser = await User.findOne({ email: data.email }).select(
      "-password"
    );

    if (existingUser) {
      return {
        success: false,
        error: "User already exists.",
      };
    }

    const hashPassword = await bcrypt.hash(data.password, 10);

    const newUser = await User.create({
      role: data.role,
      name: data.name,
      email: data.email,
      password: hashPassword,
    });

    if (!newUser) {
      return {
        success: false,
        error: "There is a problem when registering.",
      };
    }

    return {
      success: true,
      message: "Registered successfully.",
    };
  } catch (error) {
    console.log("Error occur during user register: ", error);
    return {
      success: false,
      error: "Something went wrong. Please try again,",
    };
  }
}

type LoginSuccessWithRedirect = {
  success: true;
  message: string;
  redirectTo: string;
};
export async function userLogin(
  _: AppResponse,
  data: loginSchemaType
): Promise<AppResponse | LoginSuccessWithRedirect> {
  try {
    await connectDB();
    const cookieStore = await cookies();

    const user = await User.findOne({ email: data.email }).select(
      "password role companyId"
    );

    if (!user) {
      return {
        success: false,
        error: "Invalid Credentials!",
      };
    }

    const isPasswordMatch = await bcrypt.compare(data.password, user.password);

    if (!isPasswordMatch) {
      return {
        success: false,
        error: "Invalid Credentials!",
      };
    }

    const session = await Session.create({ userId: user.id });

    cookieStore.set(
      "session_id",
      generateToken(session.id, user.email, user.role),
      {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7,
      }
    );

    let redirectTo = "/";

    if (user.role === "RECRUITER") {
      if (!user.companyId) {
        redirectTo = "/recruiter/company/setup";
      } else {
        redirectTo = "/recruiter";
      }
    }
    return {
      success: true,
      message: "Login successfully.",
      redirectTo: redirectTo,
    };
  } catch (error) {
    console.log("Error occur during user login: ", error);
    return {
      success: false,
      error: "Something went wrong. Please try again.",
    };
  }
}

export const getLoggedInUser = cache(async () => {
  try {
    await connectDB();
    const cookieStore = await cookies();
    const token = cookieStore.get("session_id")?.value;

    if (!token) {
      return {
        success: false,
        error: "Not authenticated",
      };
    }

    const sessionId = verifyToken(token);
    if (!sessionId) {
      return {
        success: false,
        error: "Invalid token signature",
      };
    }

    const session = await Session.findById(sessionId);
    if (!session) {
      return {
        success: false,
        error: "Session experied or invalid",
      };
    }

    const user = await User.findById(session.userId)
      .select("-password -__v")
      .lean();
    if (!user) {
      return {
        success: false,
        error: "User account no longer exists",
      };
    }

    const plainUser = JSON.parse(JSON.stringify(user));

    return {
      success: true,
      data: plainUser,
    };
  } catch (error) {
    console.log("Auth error: ", error);
    return {
      success: false,
      error: "Something went wrong.",
    };
  }
});

export async function userLogout() {
  const cookieStore = await cookies();
  cookieStore.delete("session_id");
  redirect("/login");
}
