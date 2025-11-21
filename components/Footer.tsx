import Image from "next/image";
import { TypographyMuted } from "./ui/typography";
export default function Footer() {
  return (
    <footer className="w-full border-t py-4">
      <div className="flex justify-around border-b py-4">
        <Image src="/logo7.png" alt="HiringApex" width={200} height={100} />

        <div className="flex gap-20">
          <ul>
            <li>Home</li>
            <li>Jobs</li>
            <li>Companies</li>
            <li>Services</li>
          </ul>

          <ul>
            <li>One</li>
            <li>Two</li>
            <li>Three</li>
            <li>Four</li>
          </ul>

          <ul>
            <li>One</li>
            <li>Two</li>
            <li>Three</li>
            <li>Four</li>
            <li>Five</li>
          </ul>
        </div>
      </div>

      <TypographyMuted className="text-center pt-4">
        All rights reserved &copy; 2025 HiringApex.
      </TypographyMuted>
    </footer>
  );
}
