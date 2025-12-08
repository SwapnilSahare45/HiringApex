import { JobResponseType } from "@/types/Job";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import JobCard from "./JobCard";
import { Button } from "../ui/button";
import Image from "next/image";
import {
  Briefcase,
  Building2,
  Clock,
  ExternalLink,
  MapPin,
} from "lucide-react";
import {
  TypographyH2,
  TypographyH4,
  TypographyList,
  TypographyP,
} from "../ui/typography";

interface JobDetailsProps {
  jobs: JobResponseType[];
}

export default function JobDetails({ jobs }: JobDetailsProps) {
  return (
    <section>
      {jobs.map((job) => (
        <Dialog key={job._id}>
          <DialogTrigger asChild className="w-full">
            <JobCard job={job} />
          </DialogTrigger>

          <DialogContent className="md:min-w-3xl">
            <div className="flex items-center gap-6">
              <div>
                {job.companyId.companyLogo ? (
                  <Image
                    src={job.companyId.companyLogo}
                    alt={job.companyId.name}
                    width={100}
                    height={100}
                  />
                ) : (
                  <Building2 className="w-16 h-16 text-white" />
                )}
              </div>
              <div>
                <DialogTitle className="text-3xl">{job.title}</DialogTitle>
                <TypographyH4>{job.companyId.name}</TypographyH4>
              </div>
            </div>

            {(job.city ||
              job.employmentType ||
              job.experienceLevel ||
              job.salaryMin ||
              job.salaryMax) && (
              <TypographyList className="list-none grid grid-cols-2 gap-4 [&>li]:flex [&>li]:items-center [&>li]:gap-1">
                {job.locationType === "Remote" ? (
                  <li>
                    <MapPin className="w-5 h-5" />
                    <span>{job.locationType}</span>
                  </li>
                ) : (
                  <li>
                    <MapPin className="w-5 h-5" />
                    <span>{job.city}</span>
                  </li>
                )}

                {job.employmentType && (
                  <li>
                    <Clock className="w-5 h-5" />
                    <span>{job.employmentType}</span>
                  </li>
                )}

                {job.experienceLevel && (
                  <li>
                    <Briefcase className="w-5 h-5" />
                    <span>{job.experienceLevel}</span>
                  </li>
                )}

                {(job.salaryMin || job.salaryMax) && (
                  <li>
                    {`₹${job.salaryMin}`}
                    {job.salaryMin && job.salaryMax && " - "}
                    {`₹${job.salaryMax}`} a year
                  </li>
                )}
              </TypographyList>
            )}

            {job.vacancies && (
              <TypographyP className="mb-8 pl-0 text-lg font-semibold">
                <span>Openings : </span>
                {job.vacancies} {job.vacancies === 1 ? "Position" : "Positions"}
              </TypographyP>
            )}

            {job.requiredSkills && job.requiredSkills.length > 0 && (
              <div>
                <TypographyH4 className="mb-4">Required Skills</TypographyH4>
                <div className="space-x-2">
                  {job.requiredSkills.map((skill, idx) => (
                    <span
                      className="bg-gray-100 text-black font-semibold px-4 py-2 rounded-lg"
                      key={idx}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {job.description && (
              <div className="mt-8">
                <TypographyH4>Job Description</TypographyH4>
                <TypographyP className="text-neutral-400">
                  {job.description}
                </TypographyP>
              </div>
            )}

            <DialogFooter className="mt-8 grid grid-cols-2">
              <DialogClose asChild>
                <Button variant="outline">Close</Button>
              </DialogClose>
              <Button>
                <span>Apply Now</span>
                <ExternalLink className="w-4 h-4" />
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ))}
    </section>
  );
}
