"use client";

import { useTheme } from "@/context/ThemeContext";
import { ReactNode } from "react";

// INTERFACE
type Props = {
  children?: ReactNode;
};

export function IconFrameComp({ children }: Props) {
  // HOOKS
  const { theme } = useTheme();

  return (
    <div
      className={`border border-px border-neutral-200 dark:border-neutral-700 dark:border-[0.5px] p-2 md:p-3 rounded-full icon-frame-effect bg-linear-to-b from-neutral-100 to-transparent dark:from-transparent ${theme}`}
    >
      <div className="rounded-full p-2 md:p-3 relative z-10 shadow dark:shadow-md bg-white dark:bg-neutral-800 border border-px border-neutral-200 dark:border-neutral-700 dark:border-[0.5px]">
        {children}
      </div>
    </div>
  );
}
