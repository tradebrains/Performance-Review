import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("performance_access_token")?.value;

  const protectedRoutes = ["/dashboard", "/user-list", "/admin"];

  const isProtected = protectedRoutes.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/admin/:path*"], // routes to guard
};
