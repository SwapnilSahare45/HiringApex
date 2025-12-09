import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TypographyList, TypographyMuted } from "@/components/ui/typography";
import { JobResponseType } from "@/types/Job";
import { format } from "date-fns";
import {
  AlertCircle,
  Briefcase,
  Calendar,
  CheckCircle2,
  Clock,
  Edit,
  EllipsisVertical,
  MapPin,
  SquarePen,
  Users,
  X,
} from "lucide-react";

interface JobRecruiterResponseType extends JobResponseType {
  applicants: [];
  views: 0;
}

interface JobCardProps {
  jobs: JobRecruiterResponseType[];
}

export default function JobCard({ jobs }: JobCardProps) {
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20";
      case "paused":
        return "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20";
      case "closed":
        return "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20";
      case "draft":
        return "bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20";
      default:
        return "bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle2 className="w-3 h-3" />;
      case "paused":
        return <AlertCircle className="w-3 h-3" />;
      case "closed":
        return <X className="w-3 h-3" />;
      case "draft":
        return <Edit className="w-3 h-3" />;
      default:
        return null;
    }
  };
  return (
    <>
      {jobs.map((job) => (
        <Card key={job._id}>
          <CardHeader className="flex items-center gap-4">
            <CardTitle className="text-3xl">{job.title}</CardTitle>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold border flex items-center gap-1 ${getStatusStyle(
                job.status.toLowerCase()
              )}`}
            >
              {getStatusIcon(job.status.toLowerCase())}
              {job.status}
            </span>
          </CardHeader>
          <CardContent>
            <TypographyList className="list-none flex gap-4 -mt-4 mb-4 [&>li]:flex [&>li]:items-center [&>li>p]:flex [&>li>p]:items-center [&>li>p]:gap-1">
              <li>
                <TypographyMuted>
                  <MapPin className="w-4 h-4" />
                  {job.locationType === "Remote" ? (
                    <span>{job.locationType}</span>
                  ) : (
                    <span>{job.city}</span>
                  )}
                </TypographyMuted>
              </li>

              {job.employmentType && (
                <li>
                  <TypographyMuted>
                    <Clock className="w-4 h-4" />
                    <span>{job.employmentType}</span>
                  </TypographyMuted>
                </li>
              )}

              {job.experienceLevel && (
                <li>
                  <TypographyMuted>
                    <Briefcase className="w-4 h-4" />
                    <span>{job.experienceLevel}</span>
                  </TypographyMuted>
                </li>
              )}

              {(job.salaryMin || job.salaryMax) && (
                <li className="font-semibold text-green-400 dark:text-green-600">
                  {`₹${job.salaryMin}`}
                  {job.salaryMin && job.salaryMax && " - "}
                  {`₹${job.salaryMax}`} a year
                </li>
              )}
            </TypographyList>

            {job.requiredSkills && job.requiredSkills.length > 0 && (
              <div className="space-x-2">
                {job.requiredSkills.map((skill, idx) => (
                  <span
                    className="bg-gray-100 text-black px-3 py-1 rounded-xl"
                    key={idx}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}

            <TypographyMuted className="flex items-center gap-1 mt-4">
              <Calendar className="w-4 h-4" />
              Posted {format(job.createdAt, "dd MMM")}
            </TypographyMuted>
          </CardContent>

          <CardFooter className="space-x-2 -mt-2">
            <div className="flex flex-col items-center justify-center">
              <p className="text-3xl font-semibold">{1}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Applicants
              </p>
            </div>

            <div className="flex flex-col items-center justify-center">
              <p className="text-3xl font-semibold">{job.views}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Views</p>
            </div>

            <Button className="ml-2">
              <Users />
              <span>View Applicants</span>
            </Button>

            <Button variant="outline">
              <SquarePen />
              <span>Edit</span>
            </Button>

            <Button size="icon" variant="outline">
              <EllipsisVertical />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </>
  );
}
