import { User } from "@/models/User";
import { connectDB } from "../db";

export async function getSkills(userId: string): Promise<string[]> {
  await connectDB();
  const user = await User.findById(userId).select("skills -_id");
  if (!user) {
    return [];
  }
  return user.skills || [];
}
