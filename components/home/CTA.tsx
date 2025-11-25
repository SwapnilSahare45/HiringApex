import { getLoggedInUser } from "@/lib/auth";
import { Button } from "../ui/button";
import { TypographyH2, TypographyBlockquote } from "../ui/typography";
import Link from "next/link";

export default async function CTA() {

  const userResponse = await getLoggedInUser();
  const user = userResponse.success ? userResponse.data : null;

  return (
    <section className="w-full py-12 bg-gray-100 dark:bg-neutral-900 flex flex-col justify-center items-center">
      <TypographyH2>Take your next step with us</TypographyH2>
      <TypographyBlockquote className="not-first:mt-0 mb-4">
        {user
          ? "Discover new opportunities, explore jobs, and advance your career."
          : "Join thousands of people who already trust our platform and start your journey today."
        }
      </TypographyBlockquote>

      <div className={`mt-2 ${user ? "space-x-0" : "space-x-2"}`}>
        {!user && (
          <Button asChild variant="outline" size="lg">
            <Link href="/register">Get Started</Link>
          </Button>
        )}

        <Button asChild variant="outline" size="lg">
          <Link href="/jobs">Browse Jobs</Link>
        </Button>
      </div>
    </section>
  );
}
