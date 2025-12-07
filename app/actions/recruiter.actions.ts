"use server";

import { connectDB } from "@/lib/db";
import { CreateCompanySchemaType } from "@/lib/zodSchema/companySchema";
import { AppResponse } from "@/types/response";
import { getLoggedInUser } from "./auth.actions";
import { Company } from "@/models/Company";
import cloudinary from "@/lib/cloudinary";
import { User } from "@/models/User";
import { revalidatePath } from "next/cache";
import { PostJobSchemaType } from "@/lib/zodSchema/jobSchema";
import { Job } from "@/models/Job";

async function bufferToDataUrl(file: File): Promise<string> {
  const fileBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(fileBuffer);
  return `data:${file.type};base64,${buffer.toString("base64")}`;
}

export async function addCompany(
  _: AppResponse,
  data: CreateCompanySchemaType
): Promise<AppResponse> {
  try {
    await connectDB();
    const userResult = await getLoggedInUser();
    if (!userResult.success || userResult.data.role !== "RECRUITER") {
      return {
        success: false,
        error: "Unauthorize. You don't have an access.",
      };
    }

    const recruiterId = userResult.data._id;

    const existingCompany = await Company.findOne({ name: data.name });
    if (existingCompany) {
      return {
        success: false,
        error: "A company with this name already exists.",
      };
    }

    let companyLogo: string | undefined = undefined;
    if (data.companyLogo instanceof File && data.companyLogo.size > 0) {
      const fileDataUrl = await bufferToDataUrl(data.companyLogo);
      const uploadResponse = await cloudinary.uploader.upload(fileDataUrl, {
        folder: `hiring_apex/company_logo`,
        public_id: `company-logo-${data.name}`,
        overwrite: true,
        format: "webp",
      });
      companyLogo = uploadResponse.secure_url;
    }

    const slug = data.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-*|-*$/g, "");

    const newCompany = await Company.create({
      ...data,
      slug,
      companyLogo: companyLogo,
      adminRecruiterId: recruiterId,
      recruiterIds: [recruiterId],
      verificationStatus: "Pending",
      foundedYear: data.foundedYear
        ? parseInt(data.foundedYear as unknown as string)
        : undefined,
    });
    if (!newCompany) {
      return {
        success: false,
        error: "Failed to create company record.",
      };
    }

    await User.findByIdAndUpdate(recruiterId, {
      companyId: newCompany._id,
    });

    revalidatePath("/recruiter/company/setup");
    revalidatePath("/recruiter");

    return {
      success: true,
      message: "Company profile created and submitted for verification.",
    };
  } catch (error) {
    console.log("Error while creating company: ", error);
    return {
      success: false,
      error: "Something went wrong. Please try again.",
    };
  }
}

export async function getCompanies() {
  const companies = await Company.find().select("_id name").lean();
  return companies.map((company: any) => ({
    _id: company._id.toString(),
    name: company.name,
  }));
}

export async function postJob(
  _: AppResponse,
  jobData: PostJobSchemaType
): Promise<AppResponse> {
  try {
    await connectDB();
    const userResponse = await getLoggedInUser();
    if (!userResponse.success || userResponse.data.role !== "RECRUITER") {
      return {
        success: false,
        error: "Unauthorize. You don't have an access.",
      };
    }
    const recruiterId = userResponse.data._id;
    const companyId = userResponse.data.companyId;
    if (!companyId) {
      return {
        success: false,
        error: "You need to be associated with a company to post jobs.",
      };
    }

    const newJob = await Job.create({
      ...jobData,
      postedById: recruiterId,
      companyId: companyId,
      salaryMin: jobData.salaryMin ? parseFloat(jobData.salaryMin) : undefined,
      salaryMax: jobData.salaryMax ? parseFloat(jobData.salaryMax) : undefined,
      requiredSkills: jobData.requiredSkills
        ? jobData.requiredSkills.split(",").map((skill) => skill.trim())
        : [],
    });

    if (!newJob) {
      return {
        success: false,
        error: "Failed to create job posting.",
      };
    }

    revalidatePath("/recruiter/jobs");

    return {
      success: true,
      message: "Job posted successfully.",
    };
  } catch (error) {
    console.log("Error while posting job : ", error);
    return {
      success: false,
      error: "Something went wrong. Please try again.",
    };
  }
}
