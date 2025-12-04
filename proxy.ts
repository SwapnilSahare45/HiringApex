import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const authRoutes = ["/login", "/register"];
const publicRoutes = ["/", "/jobs"];
export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("session_id")?.value;

  let user = null;

  if (token) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const { payload } = await jwtVerify(token, secret);

      user = payload as { role: string; email: string };
    } catch (error) {
      console.log("Middleware: Invalid Token", error);
    }
  }

  const isAuthRoute = authRoutes.includes(pathname);
  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith("/jobs/")
  );

  if (user) {
    const role = user.role.toUpperCase();
    if (isAuthRoute) {
      if (role === "RECRUITER") {
        return NextResponse.redirect(new URL("/recruiter/profile", req.url));
      } else {
        return NextResponse.redirect(new URL("/seeker/profile", req.url));
      }
    }

    if (pathname.startsWith("/seeker") && user.role !== "SEEKER") {
      return NextResponse.redirect(new URL("/recruiter/profile", req.url));
    }

    if (pathname.startsWith("/recruiter") && user.role !== "RECRUITER") {
      return NextResponse.redirect(new URL("/seeker/profile", req.url));
    }

    return NextResponse.next();
  }

  if (!user) {
    if (!isPublicRoute && !isAuthRoute) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.svg).*)",
  ],
};
