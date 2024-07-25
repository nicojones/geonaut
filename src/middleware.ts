import { cookies } from "next/headers";
import type { MiddlewareConfig, NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { ANONYMOUS_ROUTES, PROTECTED_ROUTES, REDIRECT_IF_AUTHENTICATED, REDIRECT_IF_UNAUTHORIZED } from "./config";
import { IStorageKey } from "./types";

export const middleware = (request: NextRequest): NextResponse => {
  const { pathname } = request.nextUrl;
  const url = request.nextUrl.clone();
  const token = cookies().get("token" satisfies IStorageKey)?.value;

  const isAnonymousRoute = !!ANONYMOUS_ROUTES.find(r => pathname.match(r));
  const isProtectedRoute = !!PROTECTED_ROUTES.find(r => pathname.match(r));

  if (token && isAnonymousRoute) {
    url.pathname = REDIRECT_IF_AUTHENTICATED;
    return NextResponse.redirect(url);
  } else if (!token && isProtectedRoute) {
    url.pathname = REDIRECT_IF_UNAUTHORIZED;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
};

export const config: MiddlewareConfig = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    "/_not-found",
  ],
};
