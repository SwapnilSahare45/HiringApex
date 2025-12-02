import { User } from "@/models/User";
import { connectDB } from "../db";
import { Resume } from "@/models/Resume";

export async function getResume(userId: string) {
  await connectDB();
  const resume = await Resume.findOne({ user: userId });
  if (!resume || !resume.resumeFile) {
    return "";
  }
  return resume.resumeFile;
}

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

export async function getProject(userId: string) {
  await connectDB();
  const user = await User.findById(userId).select("project -_id");

  if (!user || !user.project) {
    return [];
  }

  return user.project;
}
