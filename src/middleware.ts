import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/middleware";

const publicRoutes = ["/", "/auth"];

const rolePrefixes: Record<string, string> = {
  admin: "/admin",
  coach: "/coach",
  sportsman: "/sportsman",
};

function getDashboardPath(role: string): string {
  return `${rolePrefixes[role] ?? "/sportsman"}/dashboard`;
}

export async function middleware(request: NextRequest) {
  const { supabase, response } = createClient(request);
  const { pathname } = request.nextUrl;

  // Skip static assets and API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return response;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const role: string = user?.user_metadata?.role ?? "sportsman";

  // If authenticated user visits /auth → redirect to their dashboard
  if (pathname === "/auth" && user) {
    return NextResponse.redirect(new URL(getDashboardPath(role), request.url));
  }

  // Public routes: allow without auth
  if (publicRoutes.includes(pathname)) {
    return response;
  }

  // Protected routes: redirect to /auth if not logged in
  const isProtected =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/coach") ||
    pathname.startsWith("/sportsman");

  if (isProtected && !user) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  // Role enforcement: ensure user accesses only their own role prefix
  if (isProtected && user) {
    const allowedPrefix = rolePrefixes[role] ?? "/sportsman";
    if (!pathname.startsWith(allowedPrefix)) {
      return NextResponse.redirect(
        new URL(getDashboardPath(role), request.url),
      );
    }
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
