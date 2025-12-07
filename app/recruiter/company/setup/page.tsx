import { getLoggedInUser } from "@/app/actions/auth.actions";
import CreateCompanyForm from "@/components/forms/CreateCompanyForm";
import LinkToCompany from "@/components/forms/LinkToCompany";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { redirect } from "next/navigation";

export default async function CompanySetup() {
  const userResponse = await getLoggedInUser();
  const user = userResponse.data;

  if (user?.companyId) {
    return redirect("/recruiter/dashboard");
  }
  return (
    <main className="px-2 md:px-0 py-4 flex justify-center">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Company Setup Required
          </CardTitle>
          <CardDescription className="text-center">
            To post jobs, you must first link your account to a verified company
            profile.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">
                  Create a New Company Profile
                </CardTitle>
                <CardDescription>
                  {`Your company doesn't exist on our platform yet. Start fresh
                  and build your public profile.`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CreateCompanyForm />
              </CardContent>
            </Card>

            <div className="flex items-center justify-center overflow-hidden gap-4">
              <Separator />
              <span>OR</span>
              <Separator />
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">
                  Link to an Existing Company
                </CardTitle>
                <CardDescription>
                  {`If a colleague has already set up your company's profile,
                  request access here.`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <LinkToCompany />
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
