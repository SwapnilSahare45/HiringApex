import { getJob } from "@/app/actions/jobs.action";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  TypographyH2,
  TypographyH4,
  TypographyMuted,
  TypographyP,
} from "@/components/ui/typography";
import { format, formatDistanceToNow } from "date-fns";
import {
  AlertCircle,
  ArrowLeft,
  Award,
  Bookmark,
  Briefcase,
  Building2,
  Calendar,
  CircleCheck,
  Clock,
  Eye,
  MapPin,
  Target,
  Users,
} from "lucide-react";
import Image from "next/image";

export default async function Job({
  params,
}: {
  params: Promise<{ jobId: string }>;
}) {
  const { jobId } = await params;
  const jobResponse = await getJob(jobId);
  const job = jobResponse.job;

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
    <main className="[&>div:not(:first-child)]:mx-2 lg:[&>div:not(:first-child)]:mx-auto">
      <div className=" bg-gray-900/10 dark:bg-gray-100/10 py-3 px-4 md:px-0">
        <div className="max-w-6xl mx-auto flex justify-between">
          <Button variant="ghost">
            <ArrowLeft />
            <span>Back</span>
          </Button>

          <Button variant="outline">
            <Bookmark className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <Card className="max-w-6xl mx-auto mt-6">
        <CardContent>
          <div className="flex gap-6">
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
                <TypographyH2 className="pb-0">{job.title}</TypographyH2>
                <TypographyP>{job.companyName}</TypographyP>
              </div>

              <div className="mt-4 md:mt-2 flex flex-wrap-reverse items-center gap-2 md:gap-6">
                {job.location && (
                  <TypographyMuted className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{job.location}</span>
                  </TypographyMuted>
                )}

                {job.experienceLevel && (
                  <TypographyMuted className="flex items-center gap-1">
                    <Briefcase className="w-4 h-4" />
                    <span>{job.experienceLevel}</span>
                  </TypographyMuted>
                )}

                {job.employmentType && (
                  <TypographyMuted className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{job.employmentType}</span>
                  </TypographyMuted>
                )}

                {job.locationType && (
                  <p
                    className={`text-xs py-1 px-4 rounded-full border font-semibold ${getLocationTypeStyle(
                      job.locationType
                    )}`}
                  >
                    {job.locationType}
                  </p>
                )}
              </div>

              {job.skills && job.skills.length > 0 && (
                <div className="flex flex-wrap gap-2 md:gap-4 mt-6 md:mt-4 mb-6">
                  {job.skills.map((skill: string, idx: number) => (
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

              <div className="mt-6 flex flex-wrap items-center space-x-4 md:space-x-0 md:gap-6">
                {job.createdAt && (
                  <TypographyMuted className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {formatDistanceToNow(job.createdAt, { addSuffix: true })}
                    </span>
                  </TypographyMuted>
                )}

                <TypographyMuted className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{`${job.applicants.length} applicants`}</span>
                </TypographyMuted>

                <TypographyMuted className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>{`${job.views} views`}</span>
                </TypographyMuted>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {job.description && (
        <Card className="max-w-6xl mx-auto mt-6">
          <CardContent>
            <TypographyH4>About the Role</TypographyH4>
            <TypographyMuted className="text-base mt-2 ">
              {job.description}
            </TypographyMuted>
          </CardContent>
        </Card>
      )}

      {job.responsibilities && job.responsibilities.length > 0 && (
        <Card className="max-w-6xl mx-auto mt-6">
          <CardContent>
            <TypographyH4 className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              <span>Responsibilities</span>
            </TypographyH4>

            <div className="mt-4 space-y-4 md:space-y-2">
              {job.responsibilities.map(
                (responsibility: string, idx: number) => (
                  <TypographyMuted
                    key={idx}
                    className="flex items-center gap-6 md:gap-3"
                  >
                    <CircleCheck className="min-w-5 min-h-5 md:w-5 text-blue-600 dark:text-blue-400" />
                    <span className="text-base">{responsibility}</span>
                  </TypographyMuted>
                )
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {job.requiredQualifications && job.requiredQualifications.length > 0 && (
        <Card className="max-w-6xl mx-auto mt-6">
          <CardContent>
            <TypographyH4 className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              <span>Qualifications</span>
            </TypographyH4>

            <div className="mt-4 space-y-4 md:space-y-2">
              {job.requiredQualifications.map(
                (qualification: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-5 md:gap-3">
                    <div className="relative flex items-center justify-center">
                      <p className="p-2 rounded-full bg-primary/10"></p>
                      <p className="absolute p-1 rounded-full bg-black"></p>
                    </div>
                    <TypographyMuted>{qualification}</TypographyMuted>
                  </div>
                )
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {job.companyBenefits && job.companyBenefits.length > 0 && (
        <Card className="max-w-6xl mx-auto mt-6">
          <CardContent>
            <TypographyH4>Benefits</TypographyH4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
              {job.companyBenefits.map((benefit: string, idx: number) => (
                <TypographyMuted
                  key={idx}
                  className="flex items-center gap-3 p-2 bg-gray-900/10 dark:bg-gray-100/10"
                >
                  <CircleCheck className="min-w-5 min-h-5 md:w-5 md:h-5" />
                  <span>{benefit}</span>
                </TypographyMuted>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="max-w-6xl mx-auto mt-6">
        <CardContent className="w-full">
          {job.salaryRange && (
            <div className="mb-6">
              <TypographyH2 className="pb-0">{job.salaryRange}</TypographyH2>
              <TypographyMuted>Annual salary</TypographyMuted>
            </div>
          )}

          <Button size="lg" className="w-full">
            Apply Now
          </Button>

          <div className="mt-6 space-y-2">
            {job.deadline && (
              <TypographyMuted className="flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                <span>{`Deadline: ${format(job.deadline, "yyyy-MM-dd")}`}</span>
              </TypographyMuted>
            )}

            {job.applicants && (
              <TypographyMuted className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{`${job.applicants.length} applicants`}</span>
              </TypographyMuted>
            )}

            {job.positions && (
              <TypographyMuted className="flex items-center gap-1">
                <Briefcase className="w-4 h-4" />
                <span>{`${job.positions} positions`}</span>
              </TypographyMuted>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="max-w-6xl mx-auto my-6">
        <CardHeader>
          <CardTitle>Job Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {job.employmentType && (
            <div>
              <TypographyMuted>Type</TypographyMuted>
              <TypographyP className="font-semibold">
                {job.employmentType}
              </TypographyP>
            </div>
          )}

          {job.experienceLevel && (
            <div>
              <TypographyMuted>Level</TypographyMuted>
              <TypographyP className="font-semibold">
                {job.experienceLevel}
              </TypographyP>
            </div>
          )}

          {job.industry && (
            <div>
              <TypographyMuted>Industry</TypographyMuted>
              <TypographyP className="font-semibold">
                {job.industry}
              </TypographyP>
            </div>
          )}

          {job.locationType && (
            <div>
              <TypographyMuted>Location Type</TypographyMuted>
              <TypographyP className="font-semibold">
                {job.locationType}
              </TypographyP>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
