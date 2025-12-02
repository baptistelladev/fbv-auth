"use client";

import { cn } from "@/lib/utils";
import { ANFITRION_CFG } from "@/shared/mocks/anfitrion.mock";
import { getYear } from "date-fns";

// INTERFACE
type Props = {
  classNames?: string;
};

export function CopyrightComp({ classNames }: Props) {
  // DATA
  const currenteDate = new Date();
  const currentYear = getYear(currenteDate);

  // MOCK
  const foundationYear = ANFITRION_CFG.foundationYear;
  const projectName = ANFITRION_CFG.projectName;

  return (
    <p
      className={cn(
        "text-xs text-neutral-700 dark:text-white font-normal",
        classNames
      )}
    >
      &copy;{" "}
      {currentYear === foundationYear
        ? foundationYear
        : `${foundationYear} - ${currentYear}`}{" "}
      {projectName}
    </p>
  );
}
