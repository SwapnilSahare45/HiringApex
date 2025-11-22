import LoginForm from "@/components/LoginForm";
import { TypographyH2, TypographyP } from "@/components/ui/typography";

export default function LoginPage() {
  return (
    <div className="w-full h-full py-6 flex flex-col items-center justify-center">
      <div className="w-1/3">
        <TypographyH2>Welcome Back</TypographyH2>

        <TypographyP className="not-first:mt-0 mb-6 text-muted-foreground">
          Log in to your account to continue.
        </TypographyP>

        <LoginForm />
      </div>
    </div>
  );
}
