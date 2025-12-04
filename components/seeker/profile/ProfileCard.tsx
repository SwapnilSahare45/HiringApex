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
    <Card className="w-4/5">
      <CardContent className="flex items-center justify-between">
        <div className="flex items-center gap-8">
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
              <TypographyP className="not-first:mt-0 mb-3">
                {user.headline}
              </TypographyP>
            )}

            <TypographyList className="list-none my-0 ml-0 flex gap-8">
              {user.email && (
                <li className="flex items-center justify-center gap-1">
                  <Mail className="w-4 h-4" />
                  <TypographyMuted>{user.email}</TypographyMuted>
                </li>
              )}
              {user.mobileNo && (
                <li className="flex items-center justify-center gap-1">
                  <Phone className="w-4 h-4" />
                  <TypographyMuted>{user.mobileNo}</TypographyMuted>
                </li>
              )}
              {user.city && (
                <li className="flex items-center justify-center gap-1">
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
