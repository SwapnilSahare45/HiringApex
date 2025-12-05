import { Mail, MapPin, Phone, User } from "lucide-react";
import Image from "next/image";
import { LoggedInUser } from "@/types/loggedInUser";
import {
  TypographyH2,
  TypographyList,
  TypographyMuted,
  TypographyP,
} from "@/components/ui/typography";
import EditSeekerProfile from "@/components/forms/EditSeekerProfile";
import { Card, CardContent } from "@/components/ui/card";

interface ProfileCardProps {
  user: LoggedInUser;
}

export default async function ProfileCard({ user }: ProfileCardProps) {
  return (
    <Card className="w-full lg:w-4/5">
      <CardContent className="flex flex-col md:flex-row md:items-center justify-between">
        <div className="flex flex-col md:flex-row items-center gap-4 mb-4 md:mb-0 md:gap-8">
          <p className="w-32 h-32 border rounded-full">
            {user.avatar ? (
              <Image
                src={user.avatar}
                alt={`${user.name}'s avatar`}
                width={128}
                height={128}
                className="rounded-full"
              />
            ) : (
              <User className="w-full h-full p-2" />
            )}
          </p>

          <div>
            {user.name && (
              <TypographyH2 className="capitalize pb-0">
                {user.name}
              </TypographyH2>
            )}
            {user.headline && (
              <TypographyP className="not-first:mt-0 leading-6 mb-3">
                {user.headline}
              </TypographyP>
            )}

            <TypographyList className="list-none my-0 ml-0 flex flex-col md:flex-row flex-wrap gap-2 lg:gap-7">
              {user.email && (
                <li className="flex items-center md:justify-center gap-1">
                  <Mail className="w-4 h-4" />
                  <TypographyMuted>{user.email}</TypographyMuted>
                </li>
              )}
              {user.mobileNo && (
                <li className="flex items-center md:justify-center gap-1">
                  <Phone className="w-4 h-4" />
                  <TypographyMuted>{user.mobileNo}</TypographyMuted>
                </li>
              )}
              {user.city && (
                <li className="flex items-center md:justify-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <TypographyMuted>{user.city}</TypographyMuted>
                </li>
              )}
            </TypographyList>
          </div>
        </div>

        <EditSeekerProfile user={user} />
      </CardContent>
    </Card>
  );
}
