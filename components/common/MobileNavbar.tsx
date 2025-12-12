import {
  Bell,
  BriefcaseBusiness,
  Building2,
  Home,
  LogIn,
  LogOut,
  Menu,
  User,
  UserPlus,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { LoggedInUser } from "@/types/loggedInUser";
import { ModeToggle } from "./Mode";
import { userLogout } from "@/app/actions/auth.actions";

interface MobileNavbarProps {
  user: LoggedInUser | null;
  profilePath: string;
}

export default function MobileNavbar({ user, profilePath }: MobileNavbarProps) {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden">
        <Menu className="min-w-6 min-h-6" />
      </SheetTrigger>

      <SheetContent>
        <SheetHeader className="-mb-6 pl-6 flex flex-row items-center gap-12">
          <SheetTitle>Menu</SheetTitle>
          <ModeToggle />
        </SheetHeader>

        <Separator />

        <ul className="pl-6 flex flex-col gap-4">
          <li>
            <Link href="/" className="flex items-center gap-2">
              <Home />
              <span className="text-xl">Home</span>
            </Link>
          </li>
          <Separator />
          <li>
            <Link href="/jobs" className="flex items-center gap-2">
              <BriefcaseBusiness />
              <span className="text-xl">Jobs</span>
            </Link>
          </li>
          <Separator />
          <li>
            <Link href="/companies" className="flex items-center gap-2">
              <Building2 />
              <span className="text-xl">Companies</span>
            </Link>
          </li>
          <Separator />
          {user ? (
            <>
              <li>
                <Link href="/notifications" className="flex items-center gap-2">
                  <Bell />
                  <span className="text-xl">Notifications</span>
                </Link>
              </li>
              <Separator />
              <li>
                <Link href={profilePath} className="flex items-center gap-2">
                  <User />
                  <span className="text-xl">Profile</span>
                </Link>
              </li>
              <Separator />
              <li>
                <form action={userLogout}>
                  <Button variant="link" className="flex items-center gap-2">
                    <LogOut />
                    <span className="text-xl">Logout</span>
                  </Button>
                </form>
              </li>
              <Separator />
            </>
          ) : (
            <>
              <li>
                <Link href="/auth/login" className="flex items-center gap-2">
                  <LogIn />
                  <span className="text-xl">Login</span>
                </Link>
              </li>
              <Separator />
              <li>
                <Link href="/auth/register" className="flex items-center gap-2">
                  <UserPlus />
                  <span className="text-xl">Register</span>
                </Link>
              </li>
              <Separator />
            </>
          )}
        </ul>
      </SheetContent>
    </Sheet>
  );
}
