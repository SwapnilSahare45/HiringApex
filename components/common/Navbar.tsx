import { ModeToggle } from "@/components/common/Mode";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Bell, User } from "lucide-react";
import { getLoggedInUser } from "@/lib/auth";
import { LoggedInUser } from "@/types/loggedInUser";

export default async function Navbar() {
  const userResponse = await getLoggedInUser();

  if (!userResponse.success) {
    return <p>User profile not load.</p>;
  }

  const user = JSON.parse(userResponse.data as string) as LoggedInUser;

  return (
    <nav className="w-full border-b p-4 flex items-center justify-evenly">
      <Image src="/logo7.png" alt="HiringApex" width={60} height={30} />

      <ul className="flex gap-4">
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
            <Link href="companies">Companies</Link>
          </Button>
        </li>
      </ul>

      <div className="w-1/4">
        <Input type="text" placeholder="Search jobs..." />
      </div>

      {user && <Bell />}

      <div className="flex justify-center items-center gap-2">
        {user ? (
          <Button asChild size="icon" variant="outline">
            <Link href="profile">
              {user.avatar ? (
                <Image
                  src={user.avatar}
                  alt={`${user.username}'s avatar`}
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
    </nav>
  );
}
