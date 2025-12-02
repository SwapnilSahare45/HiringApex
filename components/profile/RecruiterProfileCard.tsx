import { Building2, Globe, Mail, Pencil, Users } from "lucide-react";
import {
  TypographyH3,
  TypographyH4,
  TypographyList,
  TypographyMuted,
} from "../ui/typography";
import { Button } from "../ui/button";

export async function RecruiterProfileCard() {
  return (
    <section className="w-4/5 border flex justify-between items-center px-12 py-6 rounded-xl shadow">
      <div className="flex items-center gap-6">
        <p className="w-24 h-24 border rounded-full relative overflow-hidden flex items-center justify-center bg-gray-100 dark:bg-gray-700">
          <Building2 className="w-1/2 h-1/2" />
        </p>

        <div className="flex flex-col justify-center">
          <TypographyH3>Demo Company</TypographyH3>
          <TypographyH4>HR Name</TypographyH4>
          <TypographyMuted>Dummy Headline</TypographyMuted>

          <TypographyList className="list-none flex gap-7 m-0 mt-2 text-neutral-600">
            <li className="flex items-center justify-center gap-1">
              <Globe className="w-5 h-5" />
              <a
                href="https://democompany.com"
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline text-blue-600 hover:underline"
              >
                https://democompany.com
              </a>
            </li>

            <li className="flex items-center justify-center gap-1">
              <Users className="w-5 h-5" />
              450 Employees
            </li>

            <li className="flex items-center justify-center gap-1">
              <Mail className="w-5 h-5" />
              democompany@gamil.com
            </li>
          </TypographyList>
        </div>
      </div>

      <Button>
        <Pencil />
        Edit
      </Button>
    </section>
  );
}
