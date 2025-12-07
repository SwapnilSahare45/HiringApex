import { connectDB } from "@/lib/db";
import { Job } from "@/models/Job";
import { Company } from "@/models/Company";
import { User } from "@/models/User";

export async function getJobs() {
  await connectDB();
  const [jobs, total] = await Promise.all([
    (Job || Company)
      .find()
      .populate(
        "companyId",
        "-adminRecruiterId -recruiterIds -verificationNotes"
      )
      .populate("postedById", "name")
      .limit(10)
      .exec(),
    Job.countDocuments(),
  ]);

  const mappedJobs = jobs.map((job: any) => ({
    ...job._doc,
    _id: job._id.toString(),
  }));
  return {
    jobs: mappedJobs,
    total: total,
  };
}
