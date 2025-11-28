import { Mail, MapPin, Phone, User } from "lucide-react";
import {
  TypographyH3,
  TypographyList,
  TypographyMuted,
} from "../ui/typography";
import Image from "next/image";
import EditProfile from "./EditProfile";
import { LoggedInUser } from "@/types/loggedInUser";

interface LoggedInUserProps {
  user: LoggedInUser;
}

export default async function ProfileCard({ user }: LoggedInUserProps) {
  return (
    <section className="w-4/5 border flex justify-between items-center px-12 py-6 rounded-xl shadow">
      <div className="flex items-center gap-6">
        <p className="w-24 h-24 border rounded-full relative overflow-hidden">
          {user.avatar ? (
            <Image
              src={user.avatar}
              alt={`${user.username}'s avatar`}
              fill={true}
              quality={100}
              sizes="64px"
              className="object-cover"
            />
          ) : (
            <User className="w-full h-full rounded-full p-2" />
          )}
        </p>

        <div className="flex flex-col justify-center">
          <TypographyH3 className="capitalize">{user.username}</TypographyH3>
          {user.headline && <TypographyMuted>{user.headline}</TypographyMuted>}

          <TypographyList className="list-none flex gap-7 m-0 mt-2 text-neutral-600">
            {user.email && (
              <li className="flex items-center justify-center gap-1">
                <Mail className="w-5 h-5" />
                {user.email}
              </li>
            )}
            {user.mobileNo && (
              <li className="flex items-center justify-center gap-1">
                <Phone className="w-5 h-5" />
                {user.mobileNo}
              </li>
            )}
            {user.city && (
              <li className="flex items-center justify-center gap-1">
                <MapPin className="w-5 h-5" />
                {user.city}
              </li>
            )}
          </TypographyList>
        </div>
      </div>

      <EditProfile user={user} />
    </section>
  );
}
