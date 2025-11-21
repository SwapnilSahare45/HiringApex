import { BadgeCheck, Fingerprint, ListChecks, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { TypographyH2 } from "./ui/typography";

export default function Features() {
  const features = [
    {
      icon: <Fingerprint />,
      title: "One-Click Application",
      description:
        "Submit your full profile instantly without repetitive forms, dramatically speeding up your job search.",
    },
    {
      icon: <ListChecks />,
      title: "Personalized Pipeline Tracker",
      description:
        "Visually manage all your applications—from 'Applied' to 'Interview' to 'Offer'—in one simple dashboard.",
    },
    {
      icon: <Shield />,
      title: "Enterprise-Grade Security",
      description:
        "Your profile and application data are protected with modern encryption and secure user authentication.",
    },
    {
      icon: <BadgeCheck />,
      title: "Verified Company Listings",
      description:
        "Apply with confidence knowing every job and recruiter profile has been manually reviewed and approved.",
    },
  ];

  return (
    <section className="w-full pb-8 flex flex-col justify-center items-center gap-4">
      <TypographyH2>Features</TypographyH2>

      <div className="w-3/4 flex gap-4">
        {features.map((feature, idx) => (
          <Card key={idx}>
            <CardHeader>
              <CardTitle>{feature.icon}</CardTitle>
              <CardTitle>{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>{feature.description}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
