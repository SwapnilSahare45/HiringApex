import { Button } from "@/components/ui/button";
import { TypographyH1, TypographyMuted } from "@/components/ui/typography";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="w-full flex justify-around items-center py-12">
      <div className="text-center space-y-4">
        <TypographyH1>Find the Perfect Opportunity Faster</TypographyH1>

        <TypographyMuted>
          A smart job portal that connects talent with the right companies in
          seconds.
        </TypographyMuted>

        <div className="space-x-2 mt-6">
          <Button variant="outline" size="lg">
            Get Started
          </Button>

          <Button variant="outline" size="lg">
            Browse Jobs
          </Button>
        </div>
      </div>

      <div className="relative w-1/3 aspect-square">
        <Image
          src="./job_offers.svg"
          alt="Job offers Illustrations"
          layout="fill"
          objectFit="cover"
        />
      </div>
    </section>
  );
}
