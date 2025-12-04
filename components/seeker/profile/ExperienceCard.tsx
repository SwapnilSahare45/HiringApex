import { getExperiences } from "@/app/actions/seeker.actions";
import AddExperience from "@/components/forms/AddExperience";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  TypographyH3,
  TypographyH4,
  TypographyList,
  TypographyMuted,
  TypographyP,
} from "@/components/ui/typography";
import { LoggedInUser } from "@/types/loggedInUser";
import {
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  MapPin,
  Pencil,
} from "lucide-react";

interface ExperienceCardProps {
  user: LoggedInUser;
}

export default async function ExperienceCard({ user }: ExperienceCardProps) {
  const experiences = await getExperiences(user?._id);

  const dateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
  };

  const hasExperience = experiences && experiences.length > 0;

  return (
    <Card className="w-4/5">
      <CardHeader className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BriefcaseBusiness className="w-6 h-6" />
          <CardTitle className="text-xl font-bold">Experience</CardTitle>
        </div>
        <AddExperience userId={user._id} />
      </CardHeader>
      <Separator />
      <CardContent>
        {hasExperience ? (
          <div>
            {experiences.map((exp) => {
              const startDate = new Date(exp.joiningDate).toLocaleDateString(
                "en-US",
                dateOptions
              );
              const endDate =
                exp.isCurrent || !exp.leavingDate
                  ? "Present"
                  : new Date(exp.leavingDate).toLocaleDateString(
                      "en-US",
                      dateOptions
                    );

              return (
                <div
                  key={exp._id}
                  className="mb-2 flex items-center gap-12 px-12 py-4 border rounded-2xl"
                >
                  <div>
                    <Building2 className="w-12 h-12" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <TypographyH4>{exp.title}</TypographyH4>
                      <Button variant="ghost">
                        <Pencil />
                      </Button>
                    </div>

                    <TypographyP className="-mt-2">{exp.company}</TypographyP>

                    <TypographyList className="list-none flex gap-4 my-2">
                      <li className="flex items-center gap-1">
                        <CalendarDays className="w-4 h-4" />
                        <span>
                          {startDate} - {endDate}
                        </span>
                      </li>
                      {exp.location && (
                        <li className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{exp.location}</span>
                        </li>
                      )}
                    </TypographyList>

                    {exp.description && (
                      <TypographyMuted>{exp.description}</TypographyMuted>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 rounded-xl border border-dashed">
            <div className="bg-gray-100 p-4 rounded-full">
              <BriefcaseBusiness className="w-8 h-8 text-black" />
            </div>
            <TypographyH3>No experience added</TypographyH3>

            <TypographyMuted>
              Add your previous job roles to verify your expertise and stand out
              to recruiters.
            </TypographyMuted>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
