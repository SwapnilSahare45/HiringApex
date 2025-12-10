import { getEducations } from "@/app/actions/seeker.actions";
import AddEducation from "@/components/forms/AddEducation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  TypographyH3,
  TypographyH4,
  TypographyMuted,
  TypographyP,
} from "@/components/ui/typography";
import { CalendarDays, GraduationCap, Pencil } from "lucide-react";

export default async function EducationCard() {
  const educations = (await getEducations()) as any[];
  const hasEducation = educations && educations.length > 0;
  const dateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
  };
  return (
    <Card className="w-full lg:w-4/5">
      <CardHeader className="flex flex-col md:flex-row md:items-center justify-between">
        <div className="flex items-center gap-1 md:gap-3">
          <GraduationCap className="w-6 h-6" />
          <CardTitle className="text-xl font-bold">Education</CardTitle>
        </div>

        <AddEducation />
      </CardHeader>
      <Separator />
      <CardContent>
        {hasEducation ? (
          <div>
            {educations.map((education) => {
              const startDate = new Date(
                education.startDate
              ).toLocaleDateString("en-US", dateOptions);
              const endDate =
                education.isCurrent || !education.endDate
                  ? "Present"
                  : new Date(education.endDate).toLocaleDateString(
                      "en-US",
                      dateOptions
                    );
              return (
                <div
                  key={education._id}
                  className="mb-2 flex flex-col px-4 md:px-12 py-4 border rounded-2xl"
                >
                  <div className="flex md:items-center md:gap-2">
                    <TypographyH4>{education.degree}</TypographyH4>
                    <Button variant="ghost">
                      <Pencil />
                    </Button>
                  </div>

                  <TypographyP className="-mt-2 leading-6 mb-2">
                    {education.institution}
                  </TypographyP>

                  <div className="flex items-center gap-1">
                    <CalendarDays className="w-4 h-4" />
                    <span>
                      {startDate} - {endDate}
                    </span>
                  </div>

                  {education.grade && (
                    <TypographyP className="mb-2">
                      {education.grade}
                    </TypographyP>
                  )}

                  {education.description && (
                    <TypographyMuted>{education.description}</TypographyMuted>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 rounded-xl border border-dashed">
            <div className="bg-gray-100 p-4 rounded-full">
              <GraduationCap className="w-8 h-8 text-black" />
            </div>
            <TypographyH3>No education history added</TypographyH3>

            <TypographyMuted>
              Add your{" "}
              <b>degrees, certifications, and educational institutions</b> to
              provide employers with your academic background and
              qualifications.
            </TypographyMuted>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
