import { cn } from "@/lib/utils";
import { LANGUAGES } from "@/shared/mocks/languages";
import { Languages } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { Span } from "next/dist/trace";

export function CurrentLanguageComp({ classNames }: { classNames?: string }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "dark:text-white cursor-pointer bg-transparent hover:bg-transparent transition-none scale-120 hover:opacity-50 transition-opacity duration-300",
                  classNames
                )}
              >
                <Languages strokeWidth={1.5} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700 dark:border-[0.5px]">
              {LANGUAGES.map((lang) => (
                <DropdownMenuItem
                  key={lang.value}
                  className="flex items-center justify-start gap-2  dark:hover:bg-neutral-800"
                >
                  {lang.value === "pt" && (
                    <span className="size-1.5 bg-green-anfitrion rounded-full"></span>
                  )}

                  <p className="text-xs font-normal">{lang.text["pt"]}</p>
                  <DropdownMenuShortcut>
                    <Image
                      src={`/flags/${lang.image}`}
                      alt="@shadcn"
                      width={16}
                      height={0}
                    />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </TooltipTrigger>

      <TooltipContent side="bottom" sideOffset={-3}>
        <p>Idioma</p>
      </TooltipContent>
    </Tooltip>
  );
}
