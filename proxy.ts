import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {

    const token = req.cookies.get("session_id")?.value;

    const publicPages = ["/", "/login", "/register"];

    // If logged-in user try to go "/login" or "/register" then redirect to "/jobs"
    if (token && (req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/register")) {
        return NextResponse.redirect(new URL("/jobs", req.url));
    }

    // If not logged-in and try to visit protected pages then redirect to "/login"
    if (!token && !publicPages.includes(req.nextUrl.pathname)) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    // Allow the request to continue normally for valid routes
    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
    * Match all request paths except for the ones starting with:
    * - api (API routes)
    * - _next/static (static files)
    * - _next/image (image optimization files)
    * - favicon.ico (favicon file)
    */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}
