import { NextRequest, NextResponse } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { hasLocale } from "next-intl";

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

const DEFAULT_LOCALE = routing.defaultLocale;
const DEFAULT_URL_WHEN_NOT_AUTHENTICATED = `/${DEFAULT_LOCALE}/login`;

const intlMiddleware = createIntlMiddleware(routing);

export function proxy(request: NextRequest) {
  const intlResponse = intlMiddleware(request);

  const path = (
    intlResponse.headers.get("x-middleware-rewrite") || request.nextUrl.pathname
  ).toLowerCase();

  const localeMatch = hasLocale(routing.locales, path);
  const currentLocale = localeMatch ? path : DEFAULT_LOCALE;

  // LÓGICA DE AUTENTICAÇÃO
  const authToken = request.cookies.get("token");

  const publicRoute = publicRoutes.find((route) => path.endsWith(route.path));

  //USUÁRIO NÃO AUTENTICADO
  if (!authToken) {
    if (publicRoute) {
      return intlResponse;
    }

    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = `/${currentLocale}${publicRoutes[0].path}`;

    return NextResponse.redirect(redirectUrl);
  }

  // AUTENTICADO
  if (
    authToken &&
    publicRoute &&
    publicRoute.whenAuthenticated === "redirect"
  ) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/";

    return NextResponse.redirect(redirectUrl);
  }

  return intlResponse;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
