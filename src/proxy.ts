import { NextRequest, NextResponse } from "next/server";
import { userService } from "./services/user.service";
import { Roles } from "./constants/roles";

export async function proxy(req: NextRequest) {
  // console.log("Proxy middleware called for URL:", req.url);
  const pathname = req.nextUrl.pathname;
  // console.log("Request pathname:", pathname);
  let isAuthenticated = false;
  let isAdmin = false;

  const { data: session, error } = await userService.getSession();

  if (session) {
    isAuthenticated = true;
    isAdmin = session.user.role === Roles.admin;
    // console.log("User session:", session);
  } else {
    console.error("Error fetching session:", error?.message);
  }

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isAdmin && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/admin-dashboard", req.url));
  }

  if (!isAdmin && pathname.startsWith("/admin-dashboard")) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/admin-dashboard",
    "/dashboard/:path*",
    "/admin-dashboard/:path*",
  ],
};
