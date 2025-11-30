import { BriefcaseBusiness, SquarePen } from "lucide-react";
import { TypographyH4, TypographyMuted } from "../ui/typography";
import { Button } from "../ui/button";
import AddExperience from "./AddExperience";
import { LoggedInUser } from "@/types/loggedInUser";
import { getExperience } from "@/lib/data/experience";

interface ExperienceCardProps {
  user: LoggedInUser;
}

interface ExperienceItem {
  _id: string;
  title: string;
  company: string;
  location?: string;
  startDate: Date | string;
  endDate?: Date | string | null;
  isCurrent: boolean;
  description?: string;
}
export default async function ExperienceCard({ user }: ExperienceCardProps) {
  const experiences = (await getExperience(user._id)) as ExperienceItem[];
  const dateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
  };
  return (
    <section className="w-4/5 border flex justify-between px-12 py-6 rounded-xl shadow">
      <div className="space-y-4">
        <TypographyH4 className="flex items-center gap-2">
          <BriefcaseBusiness />
          Experience
        </TypographyH4>

        {experiences.map((experience, idx) => (
          <div key={idx}>
            <div className="flex items-center mb-1">
              <h5 className="font-semibold">{experience.title}</h5>
              <Button variant="ghost">
                <SquarePen />
              </Button>
            </div>
            <div className="flex items-center gap-2 mb-0.5">
              <TypographyMuted>{experience.company}</TypographyMuted>
              <TypographyMuted>
                {new Date(experience.startDate).toLocaleDateString(
                  "en-US",
                  dateOptions
                )}
                {" - "}
                {experience.isCurrent || !experience.endDate
                  ? "Present"
                  : new Date(experience.endDate).toLocaleDateString(
                      "en-US",
                      dateOptions
                    )}
              </TypographyMuted>
              <TypographyMuted>{experience.location}</TypographyMuted>
            </div>

            <TypographyMuted>{experience.description}</TypographyMuted>
          </div>
        ))}
      </div>

      <AddExperience userId={user._id} />
    </section>
  );
}
