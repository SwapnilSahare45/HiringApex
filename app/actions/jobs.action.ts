import { connectDB } from "@/lib/db";
import { Job } from "@/models/Job";
import { Company } from "@/models/Company";

const models = { Company };

export async function getJobs(page: number = 1) {
  await connectDB();
  const limit: number = 25;
  const skip: number = (page - 1) * limit;
  const [jobs, total] = await Promise.all([
    Job.find()
      .populate("companyId", "-_id name companyLogo")
      .skip(skip)
      .limit(limit)
      .exec(),
    Job.countDocuments(),
  ]);
  const mappedJobs = jobs.map((job) => ({
    _id: job._id.toString(),
    companyName: job.companyId.name,
    companyLogo: job.companyId.companyLogo,
    title: job.title,
    industry: job.industry,
    experienceLevel: job.experienceLevel,
    employmentType: job.employmentType,
    positions: job.positions,
    deadline: job.deadline,
    locationType: job.locationType,
    location: job.location,
    salaryRange: job.salaryRange,
    description: job.description,
    responsibilities: job.responsibilities,
    requiredQualifications: job.requiredQualifications,
    niceToHave: job.niceToHave,
    skills: job.skills,
    companyBenefits: job.companyBenefits,
    applicationEmail: job.applicationEmail,
    externalApplicationLink: job.externalApplicationLink,
    views: job.views,
    applicants: job.applicants,
    createdAt: job.createdAt,
  }));
  return {
    jobs: mappedJobs,
    total,
  };
}

export async function getJob(jobId: string) {
  await connectDB();
  const job = await Job.findById(jobId).populate(
    "companyId",
    "-_id name companyLogo"
  );
  const plainJob = {
    _id: job._id.toString(),
    companyName: job.companyId.name,
    companyLogo: job.companyId.companyLogo,
    title: job.title,
    industry: job.industry,
    experienceLevel: job.experienceLevel,
    employmentType: job.employmentType,
    positions: job.positions,
    deadline: job.deadline,
    locationType: job.locationType,
    location: job.location,
    salaryRange: job.salaryRange,
    description: job.description,
    responsibilities: job.responsibilities,
    requiredQualifications: job.requiredQualifications,
    niceToHave: job.niceToHave,
    skills: job.skills,
    companyBenefits: job.companyBenefits,
    applicationEmail: job.applicationEmail,
    externalApplicationLink: job.externalApplicationLink,
    views: job.views,
    applicants: job.applicants,
    createdAt: job.createdAt,
  };

  return {
    job: plainJob,
  };
}
