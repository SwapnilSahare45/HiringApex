import { FolderCode, SquarePen } from "lucide-react";
import { TypographyH4, TypographyMuted } from "../ui/typography";
import { Button } from "../ui/button";
import AddProject from "./AddProject";
import { LoggedInUser } from "@/types/loggedInUser";
import { getProject } from "@/lib/data/userData";

interface ProjectCardProps {
  user: LoggedInUser;
}

interface ProjectItem {
  _id: string;
  title: string;
  startDate: Date | string;
  endDate: Date | string;
  description: string;
}

export default async function ProjectCard({ user }: ProjectCardProps) {
  const projects = (await getProject(user._id)) as ProjectItem[];

  const dateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
  };
  return (
    <section className="w-4/5 border flex justify-between px-12 py-6 rounded-xl shadow">
      <div className="space-y-4">
        <TypographyH4 className="flex items-center gap-2">
          <FolderCode />
          Project
        </TypographyH4>

        {projects.map((project) => (
          <div key={project._id}>
            <div className="flex items-center mb-1">
              <h5 className="font-semibold">{project.title}</h5>
              <Button variant="ghost">
                <SquarePen />
              </Button>
            </div>
            <TypographyMuted className="mb-0.5">
              {new Date(project.startDate).toLocaleDateString(
                "en-US",
                dateOptions
              )}
              {" to "}
              {new Date(project.endDate).toLocaleDateString(
                "en-US",
                dateOptions
              )}
            </TypographyMuted>
            <TypographyMuted>{project.description}</TypographyMuted>
          </div>
        ))}
      </div>

      <AddProject userId={user._id} />
    </section>
  );
}
