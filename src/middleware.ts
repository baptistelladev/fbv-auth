import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";

const publicRoutes = [
  {
    path: "/login",
    whenAuthenticated: "redirect",
  },
  {
    path: "/redefinir-senha",
    whenAuthenticated: "redirect",
  },
  {
    path: "/esqueci-minha-senha",
    whenAuthenticated: "redirect",
  },
  {
    path: "/sobre",
    whenAuthenticated: "next",
  },
  {
    path: "/criar-conta",
    whenAuthenticated: "next",
  },
] as const;

const DEFAULT_URL_WHEN_NOT_AUTHENTICATED = "/login";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const publicRoute = publicRoutes.find((route) => route.path === path);
  const authToken = request.cookies.get("token");

  if (!authToken && publicRoute) {
    return NextResponse.next();
  }

  if (!authToken && !publicRoute) {
    const redirectUrl = request.nextUrl.clone();

    redirectUrl.pathname = DEFAULT_URL_WHEN_NOT_AUTHENTICATED;

    return NextResponse.redirect(redirectUrl);
  }

  if (
    authToken &&
    publicRoute &&
    publicRoute.whenAuthenticated === "redirect"
  ) {
    const redirectUrl = request.nextUrl.clone();

    redirectUrl.pathname = "/";

    return NextResponse.redirect(redirectUrl);
  }

  if (authToken && !publicRoute) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

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
  ],
};
