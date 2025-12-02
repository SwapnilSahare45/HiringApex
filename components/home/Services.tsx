import {
  Rocket,
  Target,
  GlobeLock,
  ShieldCheck,
  FileSearch,
  LineChart,
  Star,
  Briefcase,
  Users,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { TypographyH2 } from "../ui/typography";

export default function Services({ user }: { user: any }) {
  const guestServices = [
    {
      icon: <Rocket />,
      title: "Accelerated Application",
      description: "Submit profiles to multiple roles in minutes, not hours.",
    },
    {
      icon: <Target />,
      title: "Career Management",
      description:
        "A dedicated dashboard for logging and tracking every application.",
    },
    {
      icon: <GlobeLock />,
      title: "Data Integrity",
      description:
        "Commitment to protecting personal data through secure protocols.",
    },
    {
      icon: <ShieldCheck />,
      title: "Vetted Ecosystem",
      description:
        "We manually verify every company and job posting before it goes live.",
    },
  ];

  const seekerServices = [
    {
      icon: <FileSearch />,
      title: "AI Resume Review",
      description:
        "Get instant feedback on your resume to increase your chances of being shortlisted.",
    },
    {
      icon: <LineChart />,
      title: "Salary Insights",
      description:
        "View detailed salary ranges for every role to ensure you are paid what you're worth.",
    },
    {
      icon: <Star />,
      title: "Priority Application",
      description:
        "Your application gets highlighted to recruiters, ensuring you don't get lost in the pile.",
    },
    {
      icon: <Briefcase />,
      title: "Job Alerts",
      description:
        "Get notified instantly when a job matching your exact skills is posted.",
    },
  ];

  const recruiterServices = [
    {
      icon: <Rocket />,
      title: "Promoted Listings",
      description:
        "Boost your job posts to the top of search results to get 3x more applicants.",
    },
    {
      icon: <Users />,
      title: "Candidate Database",
      description:
        "Search our entire database of active job seekers to find hidden talent.",
    },
    {
      icon: <ShieldCheck />,
      title: "Background Checks",
      description:
        "One-click integration to verify the work history and identity of applicants.",
    },
    {
      icon: <Target />,
      title: "Headhunting Mode",
      description:
        "Let our system auto-match the top 1% of candidates to your job requirements.",
    },
  ];

  let services = guestServices;
  if (user?.role === "SEEKER") services = seekerServices;
  if (user?.role === "RECRUITER") services = recruiterServices;

  return (
    <section className="w-full pb-8 px-32 flex flex-col justify-center items-center gap-4">
      <TypographyH2>Our Services</TypographyH2>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {services.map((service, idx) => (
          <Card key={idx} className="h-full">
            <CardHeader>
              <CardTitle className="mb-2">{service.icon}</CardTitle>
              <CardTitle className="text-lg">{service.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              {service.description}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
