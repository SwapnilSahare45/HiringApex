import { getRecruiterJobs } from "@/app/actions/recruiter.actions";
import JobCard from "@/components/recruiter/jobs/JobCard";
import StatsCard from "@/components/recruiter/jobs/StatsCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TypographyH2, TypographyMuted } from "@/components/ui/typography";
import { JobResponseType } from "@/types/Job";
import { Briefcase, Eye, Plus, Search, TrendingUp, Users } from "lucide-react";
import Link from "next/link";

export default async function Jobs() {
  const jobResponse = await getRecruiterJobs();
  const jobs = jobResponse.jobs as JobResponseType[];
  const total = jobResponse.total;
  const totalApplicants = jobs.reduce(
    (sum, job) => sum + (job.applicants.length || 0),
    0
  );
  const totalViews = jobs.reduce((sum, job) => sum + (job.views || 0), 0);
  return (
    <main className="space-y-8 py-4">
      <div className="flex items-center justify-between md:px-12">
        <div>
          <TypographyH2 className="pb-1">My Posted Jobs</TypographyH2>
          <TypographyMuted className="text-base">
            Manage and track your jobs posting
          </TypographyMuted>
        </div>

        <Button asChild>
          <Link href="/recruiter/jobs/new">
            <Plus />
            <span>Post New Job</span>
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:px-12">
        <StatsCard
          icon={
            <Briefcase className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          }
          iconBG={"bg-blue-500/10"}
          stats={total}
          statHeading={"Total Jobs Posted"}
        />

        <StatsCard
          icon={
            <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
          }
          iconBG={"bg-green-500/10"}
          stats={jobs.filter((job) => job.status === "Active").length}
          statHeading={"Active Jobs"}
        />

        <StatsCard
          icon={
            <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          }
          iconBG={"bg-purple-500/10"}
          stats={totalApplicants}
          statHeading={"Total Applicants"}
        />

        <StatsCard
          icon={
            <Eye className="w-5 h-5 text-orange-600 dark:text-orange-400" />
          }
          iconBG={"bg-orange-600/10"}
          stats={totalViews}
          statHeading={"Total Views"}
        />
      </div>

      <div className="relative flex items-center md:px-12">
        <Input placeholder="Search jobs by title" className="pl-10" />
        <Search className="absolute ml-3 w-5 h-5 text-neutral-500" />
      </div>

      <div className="space-x-2 md:px-12">
        <Button>All Jobs</Button>

        <Button>Active</Button>

        <Button>Closed</Button>

        <Button>Drafts</Button>
      </div>

      <div className="px-12">
        Showing {jobs.length} of {total} jobs
      </div>

      <div className="px-12 grid grid-cols-1 gap-2 md:grid-cols-2">
        <JobCard jobs={jobs} />
      </div>
    </main>
  );
}
