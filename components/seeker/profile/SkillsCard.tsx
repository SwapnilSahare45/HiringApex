import { getSkills } from "@/app/actions/seeker.actions";
import AddSkills from "@/components/forms/AddSkills";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { TypographyH3, TypographyMuted } from "@/components/ui/typography";
import { LoggedInUser } from "@/types/loggedInUser";
import { Brain, Zap } from "lucide-react";

interface SkillsCardProps {
  user: LoggedInUser;
}

export default async function SkillsCard({ user }: SkillsCardProps) {
  const skills = await getSkills(user._id);
  const hasSkills = skills && skills.length > 0;
  return (
    <Card className="w-4/5">
      <CardHeader className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Brain className="w-6 h-6" />
          <CardTitle className="text-xl font-bold">Skills</CardTitle>
        </div>
        <AddSkills userId={user._id} prevSkills={skills} />
      </CardHeader>
      <Separator />
      <CardContent>
        {hasSkills ? (
          <div className="flex flex-wrap gap-4">
            {skills.map((skill, idx) => (
              <div key={idx} className="px-6 py-2 border">
                <span className="text-sm">{skill}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 rounded-xl border border-dashed">
            <div className="bg-gray-100 p-4 rounded-full">
              <Zap className="w-8 h-8 text-black" />
            </div>
            <TypographyH3>No skills added yet</TypographyH3>

            <TypographyMuted>
              List your primary{" "}
              <b>technologies, languages, and core competencies</b> to help
              recruiters match you to the perfect role.
            </TypographyMuted>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
