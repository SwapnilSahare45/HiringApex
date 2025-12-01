import { GraduationCap, SquarePen } from "lucide-react";
import { TypographyH4, TypographyMuted } from "../ui/typography";
import { Button } from "../ui/button";
import { LoggedInUser } from "@/types/loggedInUser";
import AddEducation from "./AddEducation";
import { getEduction } from "@/lib/data/userData";

interface EducationCardProps {
  user: LoggedInUser;
}

interface EducationItem {
  _id: string;
  degree: string;
  institution: string;
  location?: string;
  startDate: Date | string;
  endDate: Date | string;
  grade?: string;
}

export default async function EducationCard({ user }: EducationCardProps) {
  const educations = (await getEduction(user._id)) as EducationItem[];
  const dateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
  };
  return (
    <section className="w-4/5 border flex justify-between px-12 py-6 rounded-xl shadow">
      <div className="space-y-4">
        <TypographyH4 className="flex items-center gap-2">
          <GraduationCap />
          Education
        </TypographyH4>

        {educations.map((education) => (
          <div key={education._id}>
            <div className="flex items-center">
              <h5 className="font-semibold">{education.degree}</h5>
              <Button variant="ghost">
                <SquarePen />
              </Button>
            </div>

            <div className="flex items-center gap-2 mb-0.5">
              <TypographyMuted className="text-neutral-700 font-semibold">
                {education.institution}
              </TypographyMuted>
              <TypographyMuted>{education.location}</TypographyMuted>
            </div>
            <TypographyMuted>
              {new Date(education.startDate).toLocaleDateString(
                "en-US",
                dateOptions
              )}
              {" - "}
              {new Date(education.endDate).toLocaleDateString(
                "en-US",
                dateOptions
              )}
            </TypographyMuted>

            <TypographyMuted>{`Grade : ${education.grade}`}</TypographyMuted>
          </div>
        ))}
      </div>

      <AddEducation userId={user._id} />
    </section>
  );
}
