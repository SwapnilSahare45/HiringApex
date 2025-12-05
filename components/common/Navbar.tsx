import { ModeToggle } from "@/components/common/Mode";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Bell, Menu, User } from "lucide-react";
import { LoggedInUser } from "@/types/loggedInUser";
import { getLoggedInUser } from "@/app/actions/auth.actions";

export default async function Navbar() {
  const userResponse = await getLoggedInUser();

  const user = userResponse.success
    ? (userResponse.data as LoggedInUser)
    : null;

  const profilePath =
    user?.role === "RECRUITER" ? "/recruiter/profile" : "/seeker/profile";
  return (
    <nav className="w-full border-b py-3 px-4 flex items-center justify-between md:justify-evenly md:p-4">
      <Image src="/logo7.png" alt="HiringApex" width={60} height={30} />

      <ul className="hidden gap-4 md:flex">
        <li>
          <Button asChild variant="ghost">
            <Link href="/">Home</Link>
          </Button>
        </li>
        <li>
          <Button asChild variant="ghost">
            <Link href="/jobs">Jobs</Link>
          </Button>
        </li>
        <li>
          <Button asChild variant="ghost">
            <Link href="/companies">Companies</Link>
          </Button>
        </li>
      </ul>

      <div className="hidden w-1/4 md:block">
        <Input type="text" placeholder="Search jobs..." />
      </div>

      {user && <Bell className="hidden md:flex" />}

      <div className="hidden justify-center items-center gap-2 md:flex">
        {user ? (
          <Button asChild size="icon" variant="outline">
            <Link href={profilePath}>
              {user.avatar ? (
                <Image
                  src={user.avatar}
                  alt={`${user.name}'s avatar`}
                  width={36}
                  height={36}
                  className="object-cover rounded-md"
                />
              ) : (
                <User />
              )}
            </Link>
          </Button>
        ) : (
          <>
            <Button asChild variant="outline">
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild variant="outline" className="mr-4">
              <Link href="/register">Register</Link>
            </Button>
          </>
        )}

        <ModeToggle />
      </div>

      <Button variant="ghost" size="icon" className="md:hidden">
        <Menu className="min-w-6 min-h-6" />
      </Button>
    </nav>
  );
}
