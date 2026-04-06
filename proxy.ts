import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const role = request.cookies.get("ledger-role")?.value;

  // Protect /dashboard - redirect to / if no role
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    if (!role) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Protect / - redirect to /dashboard if logged in
  if (request.nextUrl.pathname === "/") {
    if (role) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard/:path*"],
};
