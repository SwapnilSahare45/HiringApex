import { Monitor, ShieldCheck, SlidersHorizontal, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { TypographyH2 } from "../ui/typography";

export default function WhyChooseUS() {
  const reasons = [
    {
      icon: <Zap />,
      title: "Lightning-Fast Performance",
      description:
        "Built on Next.js, our platform minimizes load times and instantly fetches search results, ensuring a smooth, uninterrupted user experience.",
    },
    {
      icon: <ShieldCheck />,
      title: "Fully Verified Ecosystem",
      description:
        "We prioritize trust. Every company and recruiter profile is vetted to ensure a legitimate and secure environment for your job search.",
    },
    {
      icon: <Monitor />,
      title: "Clean, Intuitive UI",
      description:
        "Track applications and grow faster. Use our One-Click Apply feature and immediately monitor your application status through the dedicated pipeline tracker until you secure your next role.",
    },
    {
      icon: <SlidersHorizontal />,
      title: "Precise Opportunity Matching",
      description:
        "Stop sifting through irrelevant listings. Our smart filters help you precisely narrow down opportunities based on skills, location, and role type.",
    },
  ];
  return (
    <section className="w-full pb-8 flex flex-col justify-center items-center gap-4">
      <TypographyH2>Why Choose Us</TypographyH2>

      <div className="w-3/4 flex gap-4">
        {reasons.map((reason, idx) => (
          <Card key={idx}>
            <CardHeader>
              <CardTitle>{reason.icon}</CardTitle>
              <CardTitle>{reason.title}</CardTitle>
            </CardHeader>
            <CardContent>{reason.description}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
