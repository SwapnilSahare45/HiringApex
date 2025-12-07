import {
  Bookmark,
  Briefcase,
  Building2,
  Clock,
  ExternalLink,
  MapPin,
} from "lucide-react";
import { Card, CardContent } from "../ui/card";
import {
  TypographyH3,
  TypographyList,
  TypographyMuted,
  TypographyP,
} from "../ui/typography";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { JobResponseType } from "@/types/Job";

interface JobCardProps {
  jobs: JobResponseType[];
}

export default function JobCard({ jobs }: JobCardProps) {
  return (
    <>
      {jobs.map((job) => (
        <Card key={job._id}>
          <CardContent className="flex items-center gap-24">
            <div className="bg-gray-500 ml-12 p-4 rounded-md">
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

            <div className="w-full">
              <TypographyH3>{job.title}</TypographyH3>
              <TypographyP className="font-bold">
                {job.companyId.name}
              </TypographyP>

              {(job.city ||
                job.employmentType ||
                job.salaryMin ||
                job.salaryMax) && (
                <TypographyList className="list-none my-3 flex gap-8 [&>li]:flex [&>li]:items-center [&>li]:gap-1 text-neutral-400">
                  {job.city && (
                    <li>
                      <MapPin className="w-4 h-4" />
                      <span>{job.city}</span>
                    </li>
                  )}
                  {job.employmentType && (
                    <li>
                      <Clock className="w-4 h-4" />
                      <span>{job.employmentType}</span>
                    </li>
                  )}
                  {job.experienceLevel && (
                    <li>
                      <Briefcase className="w-4 h-4" />
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

              {job.requiredSkills && (
                <TypographyList className="list-none mt-0 mb-4 flex gap-2">
                  {job.requiredSkills.map((skill) => (
                    <li key={skill}>
                      <Badge>{skill}</Badge>
                    </li>
                  ))}
                </TypographyList>
              )}

              <Separator />

              <div className="flex justify-between mt-6">
                <TypographyMuted>
                  {formatDistanceToNow(job.createdAt, { addSuffix: true })}
                </TypographyMuted>

                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon-lg">
                    <Bookmark />
                  </Button>
                  <Button>
                    <span>Apply Now</span>
                    <ExternalLink />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
