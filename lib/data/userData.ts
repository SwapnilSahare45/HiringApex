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

export async function getExperience(userId: string) {
  await connectDB();
  const user = await User.findById(userId).select("experience -_id");
  if (!user || !user.experience) {
    return [];
  }
  return user.experience;
}

export async function getEduction(userId: string) {
  await connectDB();
  const user = await User.findById(userId).select("education -_id");

  if (!user || !user.education) {
    return [];
  }

  return user.education;
}
