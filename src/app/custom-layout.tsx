import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { NextIntlClientProvider } from "next-intl";

type Props = {
  children: React.ReactNode;
};

export const CustomLayout = ({ children }: Props) => {
  return (
    <ThemeProvider>
      <NextIntlClientProvider>
        <AuthProvider>{children}</AuthProvider>
      </NextIntlClientProvider>
    </ThemeProvider>
  );
};
