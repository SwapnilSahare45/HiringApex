import CreateCompanyForm from "@/components/forms/CreateCompanyForm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function CompanySetup() {
  return (
    <main className="py-4 flex justify-center">
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
                <Button className="w-full">Request Access</Button>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
