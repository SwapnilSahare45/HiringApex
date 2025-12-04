"use server";

import cloudinary from "@/lib/cloudinary";
import { connectDB } from "@/lib/db";
import {
  editSeekerProfileSchemaType,
  EducationSchemaType,
  experienceSchemaType,
  projectSchemaType,
} from "@/lib/zodSchema/userSchema";
import { Education } from "@/models/Education";
import { Experience } from "@/models/Experience";
import { Project } from "@/models/Project";
import { Resume } from "@/models/Resume";
import { Skills } from "@/models/Skills";
import { User } from "@/models/User";
import { AppResponse } from "@/types/response";
import { revalidatePath } from "next/cache";

async function bufferToDataUrl(file: File): Promise<string> {
  const fileBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(fileBuffer);
  return `data:${file.type};base64,${buffer.toString("base64")}`;
}

export async function editSeekerProfile(
  _: AppResponse,
  data: editSeekerProfileSchemaType
): Promise<AppResponse> {
  console.log(data);
  try {
    await connectDB();

    const user = await User.findById(data.id).select("-password -__v");
    if (!user) {
      return {
        success: false,
        error: "User not found.",
      };
    }

    let avatarUrl = user.avatar;

    if (data.avatar instanceof File && data.avatar.size > 0) {
      const fileDataUrl = await bufferToDataUrl(data.avatar);
      const uploadResponse = await cloudinary.uploader.upload(fileDataUrl, {
        folder: `hiring_apex/avatars`,
        public_id: `user-${user.id}`,
        overwrite: true,
        format: "webp",
      });
      console.log(uploadResponse);
      avatarUrl = uploadResponse.secure_url;
    }

    user.name = data.name;
    user.mobileNo = data.mobileNo;
    user.city = data.city;
    user.headline = data.headline;
    user.avatar = avatarUrl;

    await user.save();

    revalidatePath("/seeker/profile");

    return {
      success: true,
      message: "Profile updated successfully",
    };
  } catch (error) {
    console.log("Error while editing seeker profile: ", error);
    return {
      success: false,
      error: "Something went wrong. Please try again.",
    };
  }
}

export async function uploadResume(
  _: AppResponse,
  formData: FormData
): Promise<AppResponse> {
  try {
    const data = Object.fromEntries(formData);
    await connectDB();
    const user = await User.findById(data.id).select("id");
    if (!user) {
      return {
        success: false,
        error: "User not found",
      };
    }

    let resumeFile;

    if (data.resumeFile instanceof File && data.resumeFile.size > 0) {
      const fileDataUrl = await bufferToDataUrl(data.resumeFile);
      const uploadResponse = await cloudinary.uploader.upload(fileDataUrl, {
        folder: `hiring_apex/resumes`,
        public_id: `user-${user.id}-resume`,
        overwrite: true,
        resource_type: "raw",
      });
      resumeFile = uploadResponse.secure_url;
    }

    const resume = await Resume.findOne({ user: user.id });
    if (resume) {
      resume.resumeFile = resumeFile;
      resume.save();
      return {
        success: true,
        message: "Resume updated successfully.",
      };
    } else {
      Resume.create({
        user: user.id,
        resumeFile,
      });

      revalidatePath("/seeker/profile");

      return {
        success: true,
        message: "Resume uploaded successfully.",
      };
    }
  } catch (error) {
    console.log("Error while uploading resume : ", error);
    return {
      success: false,
      error: "Something went wrong. Please try again.",
    };
  }
}

export async function getResume(userId: string) {
  const response = await Resume.findOne({ user: userId });
  return response?.resumeFile;
}

export async function addSkills(
  _: AppResponse,
  formData: FormData
): Promise<AppResponse> {
  const data = Object.fromEntries(formData);
  const { userId, skills } = data;

  const skillsString = skills && typeof skills === "string" ? skills : "";
  const skillsArray = skillsString
    ? skillsString
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s.length > 0)
    : [];
  try {
    await connectDB();

    const updatedSkills = await Skills.findOneAndUpdate(
      { userId: userId },
      { $set: { skills: skillsArray } },
      {
        new: true,
        upsert: true,
      }
    );

    if (!updatedSkills) {
      return {
        success: false,
        error: "Failed to save skills",
      };
    }

    revalidatePath("/seeker/profile");

    return {
      success: true,
      message: "Skills save successfully",
    };
  } catch (error) {
    console.log("Error occur while adding skills : ", error);
    return {
      success: false,
      error: "Something went wrong. Please try again",
    };
  }
}

interface SkillsProjection {
  skills: string[];
}

export async function getSkills(userId: string) {
  await connectDB();
  const userSkills = (await Skills.findOne({ userId })
    .select("skills -_id")
    .lean()) as SkillsProjection | null;
  if (!userSkills) return [];
  return userSkills.skills;
}

export async function addExperience(
  _: AppResponse,
  data: experienceSchemaType
): Promise<AppResponse> {
  try {
    const newExperience = await Experience.create({
      userId: data.userId,
      title: data.title,
      company: data.company,
      location: data.location,
      isCurrent: data.isCurrent,
      joiningDate: data.joiningDate,
      leavingDate: data.leavingDate,
      description: data.description,
    });

    if (!newExperience) {
      return {
        success: false,
        error: "Experience not save. Try again.",
      };
    }

    revalidatePath("/seeker/profile");

    return {
      success: true,
      message: "Experience added successfully",
    };
  } catch (error) {
    console.log("Error while adding experience : ", error);
    return {
      success: false,
      error: "Something went wrong. Please try again.",
    };
  }
}

export async function getExperiences(userId: string) {
  const experiences = await Experience.find({ userId }).lean();
  return experiences.map((exp: any) => ({
    ...exp,
    _id: exp._id.toString(),
    userId: exp.userId.toString(),
    joiningDate: exp.joiningDate.toISOString(),
    leavingDate: exp.leavingDate ? exp.leavingDate.toISOString() : null,
  }));
}

export async function addProject(
  _: AppResponse,
  data: projectSchemaType
): Promise<AppResponse> {
  try {
    const newProject = await Project.create({
      userId: data.userId,
      title: data.title,
      startDate: data.startDate,
      endDate: data.endDate,
      description: data.description,
      liveUrl: data.liveUrl,
      githubUrl: data.githubUrl,
    });

    if (!newProject) {
      return {
        success: false,
        error: "Project not save. Try again.",
      };
    }

    revalidatePath("/seeker/profile");

    return {
      success: true,
      message: "Project save successfully.",
    };
  } catch (error) {
    console.log("Error occur while adding project : ", error);
    return {
      success: false,
      error: "Something went wrong. Please try again.",
    };
  }
}

export async function getProjects(userId: string) {
  const projects = await Project.find({ userId }).lean();
  return projects.map((project: any) => ({
    ...project,
    _id: project._id.toString(),
    userId: project.userId.toString(),
    startDate: project.startDate.toISOString(),
    endDate: project.endDate.toISOString(),
  }));
}

export async function addEducation(
  _: AppResponse,
  data: EducationSchemaType
): Promise<AppResponse> {
  try {
    const newEducation = await Education.create({
      userId: data.userId,
      institution: data.institution,
      degree: data.degree,
      isCurrent: data.isCurrent,
      startDate: data.startDate,
      endDate: data.endDate,
      grade: data.grade,
      description: data.description,
    });

    if (!newEducation) {
      return {
        success: false,
        error: "Education not save. Try again.",
      };
    }

    revalidatePath("/seeker/profile");

    return {
      success: true,
      message: "Education added successfully",
    };
  } catch (error) {
    console.log("Error while adding education : ", error);
    return {
      success: false,
      error: "Something went wrong. Please try again.",
    };
  }
}

export async function getEducations(userId: string) {
  const educations = await Education.find({ userId }).lean();
  return educations.map((education: any) => ({
    ...education,
    _id: education._id.toString(),
    userId: education.userId.toString(),
    startDate: education.startDate.toISOString(),
    endDate: education.endDate ? education.endDate.toISOString() : null,
  }));
}
