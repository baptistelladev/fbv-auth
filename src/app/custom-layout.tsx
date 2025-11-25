"use client";

import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider, useAuth } from "../context/AuthContext";

export const CustomLayout = ({ children }: { children: any }) => {
  return (
    <ThemeProvider>
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  );
};
