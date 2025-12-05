import {
  Search,
  Trophy,
  UserPlus,
  FileText,
  CheckCircle,
  Users,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { TypographyH2 } from "../../ui/typography";
import { LoggedInUser } from "@/types/loggedInUser";

interface HowItWorksProps {
  user: LoggedInUser;
}

export default function HowItWorks({ user }: HowItWorksProps) {
  const seekerSteps = [
    {
      icon: <UserPlus />,
      title: "1. Create Profile",
      description:
        "Set up your professional profile once to unlock One-Click Apply.",
    },
    {
      icon: <Search />,
      title: "2. Discover Jobs",
      description:
        "Use smart filters to find verified roles that match your skills.",
    },
    {
      icon: <Trophy />,
      title: "3. Get Hired",
      description:
        "Track your applications from submission to the final offer letter.",
    },
  ];

  const recruiterSteps = [
    {
      icon: <FileText />,
      title: "1. Post a Job",
      description: "Fill out the job details, requirements, and salary range.",
    },
    {
      icon: <Users />,
      title: "2. Review Candidates",
      description:
        "See applicants in real-time and view their resumes instantly.",
    },
    {
      icon: <CheckCircle />,
      title: "3. Hire Talent",
      description:
        "Shortlist the best fits and schedule interviews seamlessly.",
    },
  ];

  const steps = user?.role === "RECRUITER" ? recruiterSteps : seekerSteps;

  return (
    <section className="w-full px-4 pb-8 flex flex-col justify-center items-center gap-4 md:px-12 lg:px-32">
      <TypographyH2>How It Works</TypographyH2>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {steps.map((step, idx) => (
          <Card key={idx}>
            <CardHeader>
              <CardTitle>{step.icon}</CardTitle>
              <CardTitle className="-mb-2 lg:mb-0">{step.title}</CardTitle>
            </CardHeader>
            <CardContent>{step.description}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
