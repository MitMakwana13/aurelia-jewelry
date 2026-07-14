import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { token } = req.nextauth;
    const { pathname } = req.nextUrl;

    const isAdmin = token?.role === "ADMIN";

    // Handle API admin routes (Strict 401 Unauthorized for non-admins)
    if (pathname.startsWith("/api/admin")) {
      if (!isAdmin) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      return NextResponse.next();
    }

    // Handle UI admin routes (Redirect non-admins)
    if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
      if (!isAdmin) {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        const { pathname } = req.nextUrl;
        
        // For API admin routes, let the middleware() function handle it completely
        // so we can return a 401 JSON instead of a 302 Redirect.
        if (pathname.startsWith("/api/admin")) {
          return true;
        }
        
        // Let the middleware function handle the logic for /admin UI, 
        // but ensure we only proceed if we have a token for protected routes
        if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
          return !!token;
        }
        return true;
      },
    },
    pages: {
      signIn: "/admin/login",
    },
  }
);

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
