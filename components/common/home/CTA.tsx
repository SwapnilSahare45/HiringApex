import { LoggedInUser } from "@/types/loggedInUser";
import { Button } from "../../ui/button";
import { TypographyH2, TypographyBlockquote } from "../../ui/typography";
import Link from "next/link";

interface CTAProps {
  user: LoggedInUser;
}
export default function CTA({ user }: CTAProps) {
  let content = {
    title: "Take your next step with us",
    quote:
      "Join thousands of people who already trust our platform and start your journey today.",
    btnText: "Get Started",
    btnLink: "/register",
  };

  if (user?.role === "SEEKER") {
    content = {
      title: "Ready to land your dream job?",
      quote: "Your next opportunity is just a search away.",
      btnText: "Browse All Jobs",
      btnLink: "/jobs",
    };
  } else if (user?.role === "RECRUITER") {
    content = {
      title: "Ready to grow your team?",
      quote: "Find the perfect candidate today.",
      btnText: "Post a Job Now",
      btnLink: "/recruiter/create-job",
    };
  }

  return (
    <section className="w-full py-12 bg-gray-100 dark:bg-neutral-900 flex flex-col justify-center items-center text-center">
      <TypographyH2>{content.title}</TypographyH2>
      <TypographyBlockquote className="not-first:mt-0 mb-4 max-w-2xl">
        {content.quote}
      </TypographyBlockquote>

      <div className="mt-2">
        <Button asChild variant="default" size="lg">
          <Link href={content.btnLink}>{content.btnText}</Link>
        </Button>
      </div>
    </section>
  );
}
