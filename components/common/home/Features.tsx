import {
  BadgeCheck,
  Fingerprint,
  ListChecks,
  Shield,
  Users,
  Briefcase,
  BarChart,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { TypographyH2 } from "../../ui/typography";
import { LoggedInUser } from "@/types/loggedInUser";

interface FeaturesProps {
  user: LoggedInUser;
}

export default function Features({ user }: FeaturesProps) {
  const guestFeatures = [
    {
      icon: <Fingerprint />,
      title: "One-Click Application",
      description:
        "Submit your full profile instantly without repetitive forms.",
    },
    {
      icon: <ListChecks />,
      title: "Pipeline Tracker",
      description:
        "Visually manage all your applications in one simple dashboard.",
    },
    {
      icon: <Shield />,
      title: "Secure Platform",
      description: "Your data is protected with enterprise-grade encryption.",
    },
    {
      icon: <BadgeCheck />,
      title: "Verified Listings",
      description:
        "Apply with confidence knowing every job is manually reviewed.",
    },
  ];

  const recruiterFeatures = [
    {
      icon: <Briefcase />,
      title: "Smart Job Posting",
      description:
        "Create detailed job listings with rich text and custom requirements.",
    },
    {
      icon: <Users />,
      title: "Applicant Management",
      description:
        "View, shortlist, and reject candidates directly from your dashboard.",
    },
    {
      icon: <BadgeCheck />,
      title: "Company Branding",
      description:
        "Showcase your company culture with a verified profile page.",
    },
    {
      icon: <BarChart />,
      title: "Hiring Analytics",
      description:
        "Track views and application rates to optimize your job posts.",
    },
  ];

  const featuresToDisplay =
    user?.role === "RECRUITER" ? recruiterFeatures : guestFeatures;

  return (
    <section className="w-full px-4 pb-8 flex flex-col justify-center items-center gap-4 md:px-12 lg:px-32">
      <TypographyH2>
        {user?.role === "RECRUITER"
          ? "Tools for Hiring"
          : "Features for Candidates"}
      </TypographyH2>

      <div className="w-full h-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {featuresToDisplay.map((feature, idx) => (
          <Card key={idx} className="h-full">
            <CardHeader>
              <CardTitle className="md:mb-2">{feature.icon}</CardTitle>
              <CardTitle className="text-lg -mb-2 lg:mb-0">
                {feature.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              {feature.description}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
