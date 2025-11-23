"use server";

import { connectDB } from "@/lib/db";
import { loginSchema, registerSchema } from "@/lib/schema/userSchema";
import { User } from "@/models/User";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { email, success } from "zod";

export async function registerUser(_: unknown, formData: FormData) {
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
        message: "User already exists.",
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
      message: "Something went wrong.",
    };
  }
}

export async function loginUser(_: unknown, formData: FormData) {
  const userData = Object.fromEntries(formData);

  const parsed = loginSchema.safeParse(userData);
  0;
  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const data = parsed.data;

  await connectDB();

  const cookieStore = await cookies();
  try {
    const user = await User.findOne({ email: data.email });

    if (!user) {
      return {
        success: false,
        message: "Invalid Credentials!",
      };
    }

    const isPasswordMatch = await bcrypt.compare(data.password, user.password);

    if (!isPasswordMatch) {
      return {
        success: false,
        message: "Invalid Credentials!",
      };
    }

    cookieStore.set("session_id", user.id, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
    });

    return {
      success: true,
      message: "Login successful",
      username: user.username,
      email: user.email,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Something went wrong.",
    };
  }
}
