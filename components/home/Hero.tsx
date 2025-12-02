import { Button } from "@/components/ui/button";
import { TypographyH1, TypographyMuted } from "@/components/ui/typography";
import Image from "next/image";
import Link from "next/link";

export default function Hero({ user }: { user: any }) {
  let content = {
    title: "Find the Perfect Opportunity Faster",
    subtext:
      "A smart job portal that connects talent with the right companies in seconds.",
    primaryBtn: { text: "Get Started", href: "/register" },
    secondaryBtn: { text: "Browse Jobs", href: "/jobs" },
  };

  if (user?.role === "SEEKER") {
    content = {
      title: `Welcome back, ${user.name.split(" ")[0]}`,
      subtext:
        "Track your applications, update your profile, and land your dream job today.",
      primaryBtn: { text: "My Dashboard", href: "/seeker/dashboard" },
      secondaryBtn: { text: "Search Jobs", href: "/jobs" },
    };
  } else if (user?.role === "RECRUITER") {
    content = {
      title: "Build Your Dream Team",
      subtext:
        "Post jobs, manage applicants, and hire the best talent efficiently.",
      primaryBtn: { text: "Post a Job", href: "/recruiter/create-job" },
      secondaryBtn: { text: "Go to Dashboard", href: "/recruiter/dashboard" },
    };
  }

  return (
    <section className="w-full flex flex-col-reverse md:flex-row justify-around items-center py-12 gap-8 md:gap-0">
      <div className="text-center md:text-left space-y-4 max-w-xl">
        <TypographyH1>{content.title}</TypographyH1>

        <TypographyMuted>{content.subtext}</TypographyMuted>

        <div className="mt-6 flex justify-center space-x-2">
          <Button asChild size="lg">
            <Link href={content.primaryBtn.href}>
              {content.primaryBtn.text}
            </Link>
          </Button>

          <Button asChild variant="outline" size="lg">
            <Link href={content.secondaryBtn.href}>
              {content.secondaryBtn.text}
            </Link>
          </Button>
        </div>
      </div>

      <div className="relative w-full md:w-1/3 aspect-square">
        <Image
          src="./job_offers.svg"
          alt="Illustration"
          fill={true}
          style={{ objectFit: "contain" }}
          priority
        />
      </div>
    </section>
  );
}
