"use server";

import { generateToken } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { loginSchema, registerSchema } from "@/lib/schema/userSchema";
import { Session } from "@/models/Session";
import { User } from "@/models/User";
import { AppResponse } from "@/types/response";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";

export async function registerUser(_: unknown, formData: FormData): Promise<AppResponse> {
  // convert FormData into normal JS object
  const raw = Object.fromEntries(formData);

  // convert companySize to number
  const userData = {
    ...raw,
    companySize: raw.companySize ? Number(raw.companySize) : undefined,
  };

  // Validate using zod
  const parsed = registerSchema.safeParse(userData);

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const data = parsed.data;

  await connectDB();

  try {
    const existingUser = await User.findOne({ email: data.email });

    if (existingUser) {
      return {
        success: false,
        error: "User already exists.",
      };
    }

    const hashPassword = await bcrypt.hash(data.password, 10);

    await User.create({
      role: data.role,
      username: data.username,
      email: data.email,
      password: hashPassword,
      companyName: data.role === "recruiter" ? data.companyName : undefined,
      companyWebsite:
        data.role === "recruiter" ? data.companyWebsite : undefined,
      companySize:
        data.role === "recruiter" ? Number(data.companySize) : undefined,
    });

    return {
      success: true,
      message: "User registered successfully.",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Something went wrong.",
    };
  }
}

export async function loginUser(_: unknown, formData: FormData): Promise<AppResponse> {
  const userData = Object.fromEntries(formData);

  const parsed = loginSchema.safeParse(userData);

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const data = parsed.data;

  await connectDB();

  const cookie = await cookies();
  try {
    const user = await User.findOne({ email: data.email });

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

    const session = await Session.create({ userId: user.id })

    cookie.set("session_id", generateToken(session.id), {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
    });

    return {
      success: true,
      message: "Login successful",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Something went wrong.",
    };
  }
}
