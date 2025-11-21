import { Button } from "./ui/button";
import { TypographyH2, TypographyBlockquote } from "./ui/typography";

export default function CTA() {
  return (
    <section className="w-full py-12 bg-gray-100 dark:bg-neutral-900 flex flex-col justify-center items-center">
      <TypographyH2>Ready to get started?</TypographyH2>
      <TypographyBlockquote className="not-first:mt-0 mb-4">
        Join thousands of people who already trust our platform.
      </TypographyBlockquote>
      <Button >Create Account</Button>
    </section>
  );
}
