import {
  Monitor,
  ShieldCheck,
  SlidersHorizontal,
  Zap,
  Clock,
  DollarSign,
  MessageSquare,
  CheckCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { TypographyH2 } from "../ui/typography";

export default function WhyChooseUS({ user }: { user: any }) {
  const guestReasons = [
    {
      icon: <Zap />,
      title: "Lightning-Fast Performance",
      description:
        "Platform minimizes load times and instantly fetches search results.",
    },
    {
      icon: <ShieldCheck />,
      title: "Fully Verified Ecosystem",
      description:
        "Every company is vetted to ensure a legitimate environment.",
    },
    {
      icon: <Monitor />,
      title: "Clean, Intuitive UI",
      description:
        "No clutter. Just the tools you need to find or post jobs efficiently.",
    },
    {
      icon: <SlidersHorizontal />,
      title: "Precise Matching",
      description:
        "Smart filters help you narrow down opportunities based on skills.",
    },
  ];

  const seekerReasons = [
    {
      icon: <CheckCircle />,
      title: "No Fake Jobs",
      description: "We have a zero-tolerance policy for spam or scam listings.",
    },
    {
      icon: <MessageSquare />,
      title: "Direct Chat",
      description:
        "Communicate directly with hiring managers, skipping the middleman.",
    },
    {
      icon: <Clock />,
      title: "Fast Response Time",
      description:
        "Companies on our platform are required to respond within 7 days.",
    },
    {
      icon: <Zap />,
      title: "One-Click Apply",
      description:
        "Apply to dozens of jobs in minutes using your saved profile.",
    },
  ];

  const recruiterReasons = [
    {
      icon: <DollarSign />,
      title: "Lower Cost Per Hire",
      description:
        "Save up to 40% compared to traditional recruiting agencies.",
    },
    {
      icon: <CheckCircle />,
      title: "Quality Over Quantity",
      description:
        "Our matching algorithm filters out unqualified candidates automatically.",
    },
    {
      icon: <Clock />,
      title: "Faster Time-to-Hire",
      description: "Fill your open positions in days, not months.",
    },
    {
      icon: <Monitor />,
      title: "Easy Dashboard",
      description:
        "Manage your entire hiring pipeline from a single, intuitive screen.",
    },
  ];

  let reasons = guestReasons;
  if (user?.role === "SEEKER") reasons = seekerReasons;
  if (user?.role === "RECRUITER") reasons = recruiterReasons;

  return (
    <section className="w-full pb-8 px-32 flex flex-col justify-center items-center gap-4">
      <TypographyH2>Why Choose Us</TypographyH2>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {reasons.map((reason, idx) => (
          <Card key={idx} className="h-full">
            <CardHeader>
              <CardTitle className="mb-2">{reason.icon}</CardTitle>
              <CardTitle className="text-lg">{reason.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              {reason.description}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
