import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { ReactNode } from "react";

type Props = { children: ReactNode };

export default async function LocaleLayout({ children }: Props) {
  return (
    <ThemeProvider>
      <NextIntlClientProvider>
        <AuthProvider>{children}</AuthProvider>
      </NextIntlClientProvider>
    </ThemeProvider>
  );
}
