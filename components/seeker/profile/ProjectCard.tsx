import { getProjects } from "@/app/actions/seeker.actions";
import AddProject from "@/components/forms/AddProject";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  TypographyH3,
  TypographyH4,
  TypographyList,
  TypographyMuted,
} from "@/components/ui/typography";
import {
  CalendarDays,
  Code2,
  ExternalLink,
  Github,
  Pencil,
} from "lucide-react";
import Link from "next/link";

export default async function ProjectCard() {
  const projects = (await getProjects()) as any[];
  const hasProject = projects && projects.length > 0;

  const dateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
  };
  return (
    <Card className="w-full lg:w-4/5">
      <CardHeader className="flex items-center justify-between">
        <div className="flex items-center gap-1 md:gap-3">
          <Code2 className="w-6 h-6" />
          <CardTitle className="text-xl font-bold">Project</CardTitle>
        </div>

        <AddProject />
      </CardHeader>
      <Separator />
      <CardContent>
        {hasProject ? (
          <div>
            {projects.map((project) => {
              const startDate = new Date(project.startDate).toLocaleDateString(
                "en-US",
                dateOptions
              );
              const endDate = new Date(project.endDate).toLocaleDateString(
                "en-US",
                dateOptions
              );
              return (
                <div
                  key={project._id}
                  className="mb-2 flex flex-col px-4 md:px-12 py-4 border rounded-2xl"
                >
                  <div className="flex md:items-center mb-1 md:mb-0 md:gap-2">
                    <TypographyH4>{project.title}</TypographyH4>
                    <Button variant="ghost">
                      <Pencil />
                    </Button>
                  </div>

                  <div className="flex items-center gap-1 mb-2">
                    <CalendarDays className="w-4 h-4" />
                    <span>
                      {startDate} - {endDate}
                    </span>
                  </div>

                  <TypographyMuted>{project.description}</TypographyMuted>

                  {(project.liveUrl || project.githubUrl) && (
                    <TypographyList className="list-none flex gap-2">
                      {project.liveUrl && (
                        <li>
                          <Button asChild variant="secondary">
                            <Link href={project.githubUrl}>
                              <ExternalLink className="w-4 h-4" />
                              Live
                            </Link>
                          </Button>
                        </li>
                      )}
                      {project.githubUrl && (
                        <li>
                          <Button asChild variant="secondary">
                            <Link href={project.githubUrl}>
                              <Github className="w-4 h-4" />
                              GitHub
                            </Link>
                          </Button>
                        </li>
                      )}
                    </TypographyList>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 rounded-xl border border-dashed">
            <div className="bg-gray-100 p-4 rounded-full">
              <Code2 className="w-8 h-8 text-black" />
            </div>
            <TypographyH3>No projects showcased</TypographyH3>

            <TypographyMuted>
              Showcase your personal projects, portfolio, and contributions to
              demonstrate your <b>practical skills</b> and <b>initiative</b> to
              potential employers.
            </TypographyMuted>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
