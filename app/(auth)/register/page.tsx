import RegisterForm from "@/components/register/RegisterForm";
import { TypographyH2, TypographyP } from "@/components/ui/typography";

export default function RegisterPage() {
  return (
    <div className="w-full h-full py-6 flex flex-col items-center justify-center">
      <div className="w-1/3">
        <TypographyH2>Create Account</TypographyH2>

        <TypographyP className="not-first:mt-0 mb-6 text-muted-foreground">
          Join us and start your journey today.
        </TypographyP>

        <RegisterForm />
      </div>
    </div>
  );
}
