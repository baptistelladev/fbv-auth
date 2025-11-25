"use client";

import { Moon, Sun } from "lucide-react";

import { useTheme } from "@/context/ThemeContext";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { cn } from "@/lib/utils";

export function ModeToggle({ classNames }: { classNames?: string }) {
  const { setTheme, theme } = useTheme();

  const defineTheme = () => {
    theme === "dark" ? setTheme("light") : setTheme("dark");
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
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
        <p>Tema</p>
      </TooltipContent>
    </Tooltip>
  );
}
