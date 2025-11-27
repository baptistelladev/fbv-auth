"use client";

import { cn, getFlag } from "@/lib/utils";
import { LANGUAGES } from "@/shared/mocks/languages";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { Globe, Languages } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

import { LanguageType, Locale } from "@/shared/types/language.type";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

// INTERFACE
type Props = {
  classNames?: string;
};

export function CurrentLanguageComp({ classNames }: Props) {
  // TRADUÇÃO
  const tg = useTranslations("GENERAL");
  const tc = useTranslations("COMPONENTS.sonner.lang");

  // HOOKS
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale() as Locale;

  // FUNÇÕES
  function handleLangChange(lang: LanguageType) {
    const pathChunks = pathname.split("/");
    pathChunks[1] = lang.value;
    const newPath = pathChunks.join("/");

    router.replace(newPath);
    router.refresh();

    showToast(lang);
  }

  function showToast(lang: LanguageType): void {
    toast.message(lang.title, {
      description: `${lang.messageChange} ${lang.text[lang.value as Locale]}`,
      icon: <Globe strokeWidth={1} className="size-5!" />,
      position: "top-center",
      closeButton: true,
      duration: 10000000,
    });
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                title={tg("language")}
                aria-label={tg("language")}
                variant="outline"
                size="icon"
                className={cn(
                  "dark:text-neutral-white cursor-pointer hover:opacity-50 transition-opacity duration-300 rounded-full dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700  dark:border-[0.5px]",
                  classNames
                )}
              >
                <Globe strokeWidth={1.5} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700 dark:border-[0.5px]"
              role="group"
              aria-label={`${tg("choose_language")}`}
            >
              {LANGUAGES.map((lang) => (
                <DropdownMenuItem
                  onClick={() => handleLangChange(lang)}
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
                        alt={lang.text[locale]}
                        width={17}
                        height={11.16}
                      />
                    }
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </TooltipTrigger>

      <TooltipContent side="bottom" sideOffset={5}>
        {tg("language")}
      </TooltipContent>
    </Tooltip>
  );
}
