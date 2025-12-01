import { User } from "@/models/User";
import { connectDB } from "../db";

export async function getEduction(userId: string) {
  await connectDB();
  const user = await User.findById(userId).select("education -_id");

  if (!user || !user.education) {
    return [];
  }

  return user.education;
}
