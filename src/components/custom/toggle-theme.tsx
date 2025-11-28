"use client";

import { Moon, Sun } from "lucide-react";

import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

// INTERFACE
type Props = {
  classNames?: string;
};

export function ToggleModeComp({ classNames }: Props) {
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
            "rounded-full cursor-pointer  transition-none text-muted-foreground  hover:text-neutral-700 bg-transparent dark:bg-transparent hover:bg-transparent  dark:hover:bg-transparent dark:hover:text-neutral-100  dark:data-[state=open]:bg-neutral-100! dark:data-[state=open]:text-neutral-700! data-[state=open]:bg-neutral-800! data-[state=open]:text-neutral-100! border-[0.5px]",
            classNames
          )}
        >
          <Sun
            className={`size-4.5 ${theme !== "dark" && "hidden"}`}
            strokeWidth={1.2}
          />
          <Moon
            className={`size-4.5 ${theme === "dark" && "hidden"}`}
            strokeWidth={1.2}
          />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom" sideOffset={5}>
        {tg("theme")}
      </TooltipContent>
    </Tooltip>
  );
}
