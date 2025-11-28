import { Button } from "@/components/ui/button";
import { TypographyH1, TypographyMuted } from "@/components/ui/typography";
import { getLoggedInUser } from "@/lib/auth";
import Image from "next/image";
import Link from "next/link";

export default async function Hero() {
  const userResponse = await getLoggedInUser();
  const user = userResponse.success ? userResponse.data : null;

  return (
    <section className="w-full flex justify-around items-center py-12">
      <div className="text-center space-y-4">
        <TypographyH1>Find the Perfect Opportunity Faster</TypographyH1>

        <TypographyMuted>
          A smart job portal that connects talent with the right companies in
          seconds.
        </TypographyMuted>

        <div className={`mt-6 ${user ? "space-x-0" : "space-x-2"}`}>
          {!user && (
            <Button asChild variant="outline" size="lg">
              <Link href="/register">Get Started</Link>
            </Button>
          )}

          <Button asChild variant="outline" size="lg">
            <Link href="/jobs"> Browse Jobs</Link>
          </Button>
        </div>
      </div>

      <div className="relative w-1/3 aspect-square">
        <Image
          src="./job_offers.svg"
          alt="Job offers Illustrations"
          fill={true}
          style={{ objectFit: "contain" }}
        />
      </div>
    </section>
  );
}
