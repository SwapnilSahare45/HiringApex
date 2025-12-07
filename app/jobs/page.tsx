import Filters from "@/components/jobs/Filters";
import JobCard from "@/components/jobs/JobCard";
import SearchInput from "@/components/jobs/SearchInput";
import { TypographyH1 } from "@/components/ui/typography";
import { getJobs } from "../actions/jobs.action";
import { JobResponseType } from "@/types/Job";

export default async function Jobs() {
  const jobResponse = await getJobs();
  const jobs = jobResponse.jobs as JobResponseType[];
  const total = jobResponse.total as number;
  return (
    <main className="py-4 px-2 md:px-12 space-y-4">
      <TypographyH1>Find Your Next Opportunity</TypographyH1>

      <div className="flex items-start justify-center gap-2">
        <SearchInput />
        <Filters />
      </div>

      <div>
        Showing {jobs.length} of {total} jobs
      </div>

      <JobCard jobs={jobs} />
    </main>
  );
}
