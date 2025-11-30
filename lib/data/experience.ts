import { User } from "@/models/User";
import { connectDB } from "../db";

export async function getExperience(userId: string) {
  await connectDB();
  const user = await User.findById(userId).select("experience -_id");
  if (!user || !user.experience) {
    return [];
  }
  return user.experience;
}
