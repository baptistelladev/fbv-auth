"use client";

import { cn, getFlag } from "@/lib/utils";
import { LANGUAGES } from "@/shared/mocks/languages";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { Languages } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

import { Locale } from "@/shared/types/language.type";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

// INTERFACE
type Props = {
  classNames?: string;
};

export function CurrentLanguageComp({ classNames }: Props) {
  // HOOKS
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale() as Locale;

  // FUNÇÕES
  function handleLangChange(lang_value: string) {
    const pathChunks = pathname.split("/");
    pathChunks[1] = lang_value;
    const newPath = pathChunks.join("/");
    router.replace(newPath);
    router.refresh();
  }

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
                  onClick={() => handleLangChange(lang.value)}
                  key={lang.value}
                  className="flex items-center justify-start gap-2  dark:hover:bg-neutral-800"
                >
                  {lang.value === locale && (
                    <span className="size-1.5 bg-green-anfitrion rounded-full"></span>
                  )}

                  <p className="text-xs font-normal">{lang.text[locale]}</p>
                  <DropdownMenuShortcut>
                    {
                      <Image
                        title={lang.text[locale]}
                        src={getFlag(lang.value)}
                        alt="bandeira"
                        width={17}
                      />
                    }
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
