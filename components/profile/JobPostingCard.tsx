import { CirclePlus, FileText, Settings } from "lucide-react";
import { Button } from "../ui/button";
import { TypographyH4, TypographyMuted } from "../ui/typography";

export default function JobPostingCard() {
  type Job = {
    title: string;
    status: "Open" | "Closed" | "Paused" | "Draft" | string;
  };

  const jobs: Job[] = [
    { title: "Senior Frontend Engineer", status: "Open" },
    { title: "Backend Engineer (Node.js)", status: "Paused" },
    { title: "Product Designer", status: "Draft" },
    { title: "QA Engineer", status: "Closed" },
  ];

  const hasJobs = jobs && jobs.length > 0;
  return (
    <section className="w-4/5 p-6 border rounded-xl shadow-md">
      <div className="flex justify-between items-center pb-4">
        <TypographyH4 className="text-xl font-bold">
          Your Active Job Listings 45
        </TypographyH4>

        <Button size="lg" variant="outline">
          <CirclePlus className="h-5 w-5 mr-2" /> Post New Job
        </Button>
      </div>

      {!hasJobs ? (
        <div className="text-center py-10 border border-dashed border-gray-300 rounded-md mt-4">
          <FileText className="h-10 w-10 mx-auto mb-3 text-muted-foreground" />
          <p className="text-base font-semibold">No Jobs Posted Yet</p>
          <p className="text-sm text-muted-foreground mt-1">
            Use the button above to start recruiting and track applicants.
          </p>
        </div>
      ) : (
        <div className="space-y-4 pt-4">
          {jobs.map((job, index) => (
            <div
              key={index}
              className="flex justify-between items-center border p-3 rounded-md hover:bg-gray-50 dark:hover:bg-neutral-800"
            >
              <div>
                <p className="font-semibold">{job.title}</p>
                <TypographyMuted className="text-sm">
                  Status: {job.status}
                </TypographyMuted>
              </div>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" /> Manage
              </Button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
