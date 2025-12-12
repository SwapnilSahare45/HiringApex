import { TypographyH2, TypographyMuted } from "@/components/ui/typography";
import { getJobs } from "../actions/jobs.action";
import SearchInput from "@/components/jobs/SearchInput";
import Filter from "@/components/jobs/Filter";
import JobCard from "@/components/jobs/JobCard";
import { JobResponseType } from "@/types/Job";

export default async function Jobs() {
  const jobResponse = await getJobs(1);
  const jobs = jobResponse.jobs as JobResponseType[];
  const total = jobResponse.total;
  return (
    <main className="py-4 px-2 md:px-12 space-y-8">
      <div className="max-w-6xl mx-auto">
        <TypographyH2 className="text-4xl font-extrabold pb-0">
          Discover Your Next Opportunity
        </TypographyH2>
        <TypographyMuted className="text-base">
          Explore job openings from top companies
        </TypographyMuted>
      </div>

      <div className="max-w-6xl mx-auto flex flex-wrap gap-2">
        <SearchInput />
        <Filter />
      </div>

      <TypographyMuted className="max-w-6xl mx-auto">
        Showing {jobs.length} of {total} jobs
      </TypographyMuted>

      <div className="max-w-6xl mx-auto flex flex-col gap-4">
        <JobCard jobs={jobs} />
      </div>
    </main>
  );
}
