import {
  GlobeLock,
  ShieldCheck,
  Users,
  Search,
  FileText,
  ListChecks,
  Bookmark,
  Settings,
  Send,
  UserCheck,
  Building2,
  Activity,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { TypographyH2 } from "../../ui/typography";
import { LoggedInUser } from "@/types/loggedInUser";

interface ServicesProps {
  user: LoggedInUser;
}

export default function Services({ user }: ServicesProps) {
  const guestServices = [
    {
      icon: <GlobeLock />,
      title: "Vetted Ecosystem",
      description:
        "We manually review companies and jobs for authenticity before posting.",
    },
    {
      icon: <Search />,
      title: "Advanced Filtering",
      description:
        "Search jobs by salary, type (Remote/On-site), and required skills efficiently.",
    },
    {
      icon: <Users />,
      title: "Direct Recruiter Contact",
      description:
        "Profiles are sent directly to hiring managers without complex intermediate steps.",
    },
    {
      icon: <ShieldCheck />,
      title: "Secure Profile Data",
      description:
        "User profiles are protected with standard encryption and secure sessions.",
    },
  ];

  const seekerServices = [
    {
      icon: <FileText />,
      title: "Comprehensive Profile Builder",
      description:
        "Easily input and manage your experience, education, and projects in one place.",
    },
    {
      icon: <ListChecks />,
      title: "Application Pipeline Tracker",
      description:
        "Visually monitor the status (Applied, Interviewing, Rejected) of every job application.",
    },
    {
      icon: <Bookmark />,
      title: "Job Saving & Alerts",
      description:
        "Save job listings for later and receive email alerts for new matching positions.",
    },
    {
      icon: <Settings />,
      title: "Personalized Settings",
      description: "Customize your dashboard and notification preferences.",
    },
  ];

  const recruiterServices = [
    {
      icon: <Send />,
      title: "Intuitive Job Posting",
      description:
        "Create and publish detailed job listings in minutes using a simple form interface.",
    },
    {
      icon: <UserCheck />,
      title: "Applicant Review Dashboard",
      description:
        "Filter and manage candidates, changing application statuses (Shortlist, Interview) easily.",
    },
    {
      icon: <Building2 />,
      title: "Company Profile Management",
      description:
        "Maintain your company brand and information with a dedicated profile editor.",
    },
    {
      icon: <Activity />,
      title: "Job Activity Monitoring",
      description:
        "View basic analytics on job views and application volume for your posts.",
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
