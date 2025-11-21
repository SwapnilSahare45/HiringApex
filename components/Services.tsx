import { Rocket, Target, GlobeLock, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { TypographyH2 } from "./ui/typography";

export default function Services() {
  const services = [
    {
      icon: <Rocket />,
      title: "Accelerated Application Submission",
      description:
        "We streamline the application process, allowing talent to submit profiles to multiple roles in minutes, not hours.",
    },
    {
      icon: <Target />,
      title: "Comprehensive Career Management",
      description:
        "Utilize a dedicated dashboard for logging, tracking, and updating the status of every application you submit.",
    },
    {
      icon: <GlobeLock />,
      title: "Guaranteed Data Integrity & Speed",
      description:
        "Commitment to protecting personal data through secure protocols while ensuring a sub-second search and load time.",
    },
    {
      icon: <ShieldCheck />,
      title: "Vetted Hiring Ecosystem",
      description:
        "We maintain a clean, trustworthy platform by manually verifying every company and job posting before it goes live.",
    },
  ];
  return (
    <section className="w-full pb-8 flex flex-col justify-center items-center gap-4">
      <TypographyH2>Our Services</TypographyH2>

      <div className="w-3/4 flex gap-4">
        {services.map((service, idx) => (
          <Card key={idx}>
            <CardHeader>
              <CardTitle>{service.icon}</CardTitle>
              <CardTitle>{service.title}</CardTitle>
            </CardHeader>
            <CardContent>{service.description}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
