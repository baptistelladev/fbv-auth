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
          aria-label={tg("theme")}
          aria-pressed={theme === "dark"}
          title={tg("theme")}
          variant="outline"
          size="icon"
          onClick={() => defineTheme()}
          className={cn(
            "dark:text-neutral-white cursor-pointer hover:opacity-50 transition-opacity duration-300 rounded-full dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 dark:border-[0.5px]",
            classNames
          )}
        >
          <Sun
            className="size-5 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"
            strokeWidth={1.5}
          />
          <Moon
            className="absolute size-5 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"
            strokeWidth={1.5}
          />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom" sideOffset={5}>
        {tg("theme")}
      </TooltipContent>
    </Tooltip>
  );
}
