import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  console.log("🔵 Incoming Request:", pathname);

  // Read cookies - try both possible cookie names
  const clientTokenUser = req.cookies.get("client_token_user")?.value;

  console.log("🔍 Cookies in middleware:", {
    clientTokenUserExists: !!clientTokenUser,
    tokenValue: clientTokenUser || "❌ No token",
    allCookies: req.cookies.getAll().map(c => c.name) // Debug: see all cookies
  });

  // Public routes - more specific matching
  const isPublicRoute =
    pathname === "/" ||
    pathname.startsWith("/auth/") ||
    pathname.startsWith("/auth") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") || // Any file with extension (images, fonts, etc.)
    pathname === "/favicon.ico";

  console.log("📌 Route check:", {
    pathname,
    isPublicRoute,
  });

  if (isPublicRoute) {
    console.log("🟢 Public route → allowed");
    return NextResponse.next();
  }

  // Protected route: needs client token
  if (!clientTokenUser) {
    console.log("❌ No client_token_partner → redirect to login");

    const loginUrl = new URL("/auth/login", req.url);
    loginUrl.searchParams.set("redirect", pathname);

    const response = NextResponse.redirect(loginUrl);
    
    // IMPORTANT: Add cache control headers to prevent caching
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');

    return response;
  }

  // Token exists - allow access
  console.log("🟩 Token found → access granted");
  
  const response = NextResponse.next();
  
  // Add cache control headers to prevent stale responses
  response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  response.headers.set('Pragma', 'no-cache');
  response.headers.set('Expires', '0');
  
  return response;
}

// Simpler matcher configuration that works on Vercel
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};