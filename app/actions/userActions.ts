"use server";

import { connectDB } from "@/lib/db";
import { userSchema } from "@/lib/schema/userSchema";
import { User } from "@/models/User";
import bcrypt from "bcrypt";

export async function registerUser(_: unknown, formData: FormData) {
  // convert FormData into normal JS object
  const raw = Object.fromEntries(formData);

  // convert companySize to number
  const userData = {
    ...raw,
    companySize: raw.companySize ? Number(raw.companySize) : undefined,
  };

  // Validate using zod
  const parsed = userSchema.safeParse(userData);

  
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
