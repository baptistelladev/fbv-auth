import { ThemeProvider } from "@/context/ThemeContext";
import { NextIntlClientProvider } from "next-intl";
import { ReactNode } from "react";

type Props = { children: ReactNode };

export default async function LocaleLayout({ children }: Props) {
  return (
    <ThemeProvider>
      <NextIntlClientProvider>{children}</NextIntlClientProvider>
    </ThemeProvider>
  );
}
