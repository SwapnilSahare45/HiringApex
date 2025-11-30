import { Brain } from "lucide-react";
import { TypographyH4, TypographyList } from "../ui/typography";
import AddSkills from "./AddSkills";
import { LoggedInUser } from "@/types/loggedInUser";
import { getSkills } from "@/lib/data/skills";

interface SkillsCardProps {
  user: LoggedInUser;
}

export default async function SkillsCard({ user }: SkillsCardProps) {
  const skills = await getSkills(user._id);
  return (
    <section className="w-4/5 border flex justify-between px-12 py-6 rounded-xl shadow">
      <div className="space-y-4">
        <TypographyH4 className="flex items-center gap-2">
          <Brain />
          Skills
        </TypographyH4>

        <TypographyList className="w-4/5 list-none m-0 flex flex-wrap items-center gap-3">
          {skills.map((skill, idx) => (
            <li key={idx} className="border py-2 px-5">
              {skill}
            </li>
          ))}
        </TypographyList>
      </div>

      <AddSkills userId={user._id} prevSkills={skills} />
    </section>
  );
}
