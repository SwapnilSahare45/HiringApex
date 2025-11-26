import { Mail, MapPin, Pencil, Phone, User } from "lucide-react";
import { Button } from "../ui/button";
import { TypographyH3, TypographyList, TypographyMuted } from "../ui/typography";

export default function ProfileCard() {
  return (
    <section className="w-4/5 border flex justify-between items-center px-12 py-6 rounded-xl shadow">
      <div className="flex gap-6">
        <p className="w-32 h-32 border rounded-full">
          <User className="w-full h-full rounded-full p-6" />
        </p>

        <div className="flex flex-col justify-center">
          <TypographyH3>Swapnil Sahare</TypographyH3>
          <TypographyMuted className="mb-2">Full Stack Developer</TypographyMuted>

          <TypographyList className="list-none flex gap-7 m-0 text-neutral-600">
            <li className="flex items-center justify-center gap-1">
              <Mail className="w-5 h-5" />
              swapnilsahare45@gmail.com
            </li>
            <li className="flex items-center justify-center gap-1">
              <Phone className="w-5 h-5" />
              +91 9370595448
            </li>
            <li className="flex items-center justify-center gap-1">
              <MapPin className="w-5 h-5" />
              Yavatmal, India
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
