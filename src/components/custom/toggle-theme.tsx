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
          size="icon"
          onClick={() => defineTheme()}
          className={cn(
            "rounded-full cursor-pointer  transition-none text-neutral-400  hover:text-neutral-700 bg-transparent dark:bg-transparent hover:bg-transparent  dark:hover:bg-transparent dark:hover:text-neutral-100  dark:data-[state=open]:bg-neutral-100! dark:data-[state=open]:text-neutral-700! data-[state=open]:bg-neutral-800! data-[state=open]:text-neutral-100! border-[0.5px]",
            classNames
          )}
        >
          <Sun
            className="size-5 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"
            strokeWidth={1.3}
          />
          <Moon
            className="absolute size-5 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"
            strokeWidth={1.3}
          />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom" sideOffset={5}>
        {tg("theme")}
      </TooltipContent>
    </Tooltip>
  );
}
