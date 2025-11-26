"use client";

import { Moon, Sun } from "lucide-react";

import { useTheme } from "@/context/ThemeContext";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

// INTERFACE
type Props = {
  classNames?: string;
};

export function ModeToggle({ classNames }: Props) {
  // STATES
  const { setTheme, theme } = useTheme();

  // HOOKS
  const tg = useTranslations("GENERAL");

  // FUNÇÕES
  const defineTheme = () => {
    theme === "dark" ? setTheme("light") : setTheme("dark");
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          title={tg("theme")}
          variant="ghost"
          size="icon"
          onClick={() => defineTheme()}
          className={cn(
            "dark:text-white cursor-pointer bg-transparent hover:bg-transparent hover:opacity-50 transition-opacity duration-300",
            classNames
          )}
        >
          <Sun
            className="h-[1.2rem] w-[1.2rem] scale-120 rotate-0 transition-all dark:scale-0 dark:-rotate-90"
            strokeWidth={1.5}
          />
          <Moon
            className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-120 dark:rotate-0"
            strokeWidth={1.5}
          />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom" sideOffset={-3}>
        <p>{tg("theme")}</p>
      </TooltipContent>
    </Tooltip>
  );
}
