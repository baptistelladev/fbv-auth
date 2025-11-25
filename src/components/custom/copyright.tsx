import { cn } from "@/lib/utils";
import { ANFITRION_CFG } from "@/shared/mocks/anfitrion.cfg";
import { getYear } from "date-fns";

export function CopyrightComp({ classNames }: { classNames?: string }) {
  const currenteDate = new Date();
  const currentYear = getYear(currenteDate);

  const foundationYear = ANFITRION_CFG.foundationYear;
  const projectName = ANFITRION_CFG.projectName;

  /** COMPONENTE */
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
