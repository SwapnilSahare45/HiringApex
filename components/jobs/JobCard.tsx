import { JobResponseType } from "@/types/Job";
import { Card, CardContent, CardTitle } from "../ui/card";
import Image from "next/image";
import {
  Bookmark,
  Briefcase,
  Building2,
  Calendar,
  Clock,
  ExternalLink,
  MapPin,
  Users,
} from "lucide-react";
import { AspectRatio } from "../ui/aspect-ratio";
import { TypographyMuted, TypographyP } from "../ui/typography";
import { Separator } from "../ui/separator";
import { formatDate, formatDistanceToNow } from "date-fns";
import { Button } from "../ui/button";
import Link from "next/link";

interface JobCardProps {
  jobs: JobResponseType[];
}

export default function JobCard({ jobs }: JobCardProps) {
  const getLocationTypeStyle = (type: string) => {
    switch (type) {
      case "Remote":
        return "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20";
      case "Hybrid":
        return "bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400 border-fuchsia-500/20";
      case "On-site":
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20";
      default:
        return "";
    }
  };
  return (
    <>
      {jobs.map((job) => (
        <Link href={`/jobs/${job._id}`} key={job._id}>
          <Card>
            <CardContent className="flex gap-8">
              <div className="hidden md:block md:w-1/12">
                {job.companyLogo ? (
                  <AspectRatio ratio={1 / 1}>
                    <Image
                      src={job.companyLogo}
                      alt={job.companyName}
                      fill
                      className="w-full h-full object-fit"
                    />
                  </AspectRatio>
                ) : (
                  <p className="bg-gray-600/10 dark:bg-gray-400/10 p-8 rounded-full">
                    <Building2 className="w-14 h-14" />
                  </p>
                )}
              </div>

              <div className="grow">
                <div>
                  <div className="flex flex-col-reverse gap-3 md:gap-0 md:flex-row md:items-center justify-between">
                    <CardTitle className="text-2xl">{job.title}</CardTitle>
                    {job.locationType && (
                      <p
                        className={`text-xs py-1 px-4 rounded-full border font-semibold self-start ${getLocationTypeStyle(
                          job.locationType
                        )}`}
                      >
                        {job.locationType}
                      </p>
                    )}
                  </div>
                  <TypographyMuted className="text-lg">
                    {job.companyName}
                  </TypographyMuted>
                </div>

                <div className="flex flex-wrap space-x-6 md:space-x-0 md:gap-6 mt-4 md:mt-2">
                  {job.location && (
                    <TypographyMuted className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{job.location}</span>
                    </TypographyMuted>
                  )}

                  {job.employmentType && (
                    <TypographyMuted className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{job.employmentType}</span>
                    </TypographyMuted>
                  )}

                  {job.experienceLevel && (
                    <TypographyMuted className="flex items-center gap-1">
                      <Briefcase className="w-4 h-4" />
                      <span>{job.experienceLevel}</span>
                    </TypographyMuted>
                  )}

                  {job.salaryRange && (
                    <TypographyP className="text-green-600 dark:text-green-400 font-semibold">
                      {job.salaryRange}
                    </TypographyP>
                  )}

                  {job.positions && (
                    <TypographyMuted className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{job.positions}</span>
                    </TypographyMuted>
                  )}
                </div>

                {job.skills && job.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 md:gap-4 mt-4 mb-6">
                    {job.skills.map((skill, idx) => (
                      <p
                        key={idx}
                        className="text-sm bg-gray-900/10 dark:bg-gray-100/10 px-4 py-1 rounded-lg"
                      >
                        {skill}
                      </p>
                    ))}
                  </div>
                )}

                <Separator />

                <div className="flex flex-wrap justify-between space-y-4 md:space-y-0 mt-6">
                  <div className="flex flex-wrap items-center space-x-6 md:space-x-0 md:gap-6">
                    <TypographyMuted className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {formatDistanceToNow(job.createdAt, {
                          addSuffix: true,
                        })}
                      </span>
                    </TypographyMuted>

                    <TypographyMuted className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{`${job.applicants.length} applicants`}</span>
                    </TypographyMuted>

                    {job.deadline && (
                      <TypographyMuted className="flex items-center gap-1 text-red-600 dark:text-red-400">
                        <Calendar className="w-4 h-4" />
                        <span>{`Closes ${formatDate(
                          job.deadline,
                          "dd/MM/yyyy"
                        )}`}</span>
                      </TypographyMuted>
                    )}
                  </div>

                  <div className="flex w-full md:w-auto items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Bookmark className="w-5 h-5" />
                    </Button>

                    <Button className="grow">
                      <span>View Details</span>
                      <ExternalLink />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </>
  );
}
