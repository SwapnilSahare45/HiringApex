import { Search, Trophy, UserPlus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { TypographyH2 } from "./ui/typography";

export default function HowItWorks() {
  const howItWorks = [
    {
      icon: <UserPlus />,
      title: "Create Your Account",
      description:
        "Start your journey in minutes. Quickly set up your personalized profile. This single step configures your settings for efficient job matching and unlocks One-Click Application submission.",
    },
    {
      icon: <Search />,
      title: "Explore & Discover Jobs",
      description:
        "Find the best opportunities for your career. Leverage smart filters and verified listings to explore highly relevant roles, ensuring you only see jobs that match your skills and goals.",
    },
    {
      icon: <Trophy />,
      title: "Apply, Track, & Get Hired",
      description:
        "Track applications and grow faster. Use our One-Click Apply feature and immediately monitor your application status through the dedicated pipeline tracker until you secure your next role.",
    }
  ];
  return (
    <section className="w-full pb-8 flex flex-col justify-center items-center gap-4">
      <TypographyH2>How It Works</TypographyH2>

      <div className="w-3/4 flex gap-4">
        {howItWorks.map((work, idx) => (
          <Card key={idx}>
            <CardHeader>
              <CardTitle>{work.icon}</CardTitle>
              <CardTitle>{work.title}</CardTitle>
            </CardHeader>
            <CardContent>{work.description}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
