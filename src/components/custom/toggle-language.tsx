"use client";

import { cn, getFlag } from "@/lib/utils";
import { LANGUAGES } from "@/shared/mocks/languages.mock";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { Globe } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

import { LanguageAsLocale, LanguageType } from "@/shared/types/language.type";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

// INTERFACE
type Props = {
  classNames?: string;
};

export function ToggleLanguageComp({ classNames }: Props) {
  // TRADUÇÃO
  const tg = useTranslations("GENERAL");

  // HOOKS
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale() as LanguageAsLocale;

  // FUNÇÕES

  /**
   * @description Atualiza a rota com o locale selecionado.
   * @param lang locale/lang selecionado.
   * @author Felipe Baptistella
   */
  async function handleLangChange(lang: LanguageType) {
    const pathChunks = pathname.split("/");
    pathChunks[1] = lang.value;
    const newPath = pathChunks.join("/");

    router.replace(newPath);
    router.refresh();

    showToast(lang);
  }

  /**
   * @description Mostra o toast com o idioma selecionado.
   * @param lang locale/lang selecionado.
   * @author Felipe Baptistella
   */
  function showToast(lang: LanguageType): void {
    toast.message(false, {
      description: `${lang.messageChange} ${
        lang.text[lang.value as LanguageAsLocale]
      }`,
      icon: <Globe strokeWidth={1} className="size-5!" />,
      position: "bottom-right",
      closeButton: true,
    });
  }

  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button
              id={tg("language")}
              size={"icon"}
              title={tg("language")}
              aria-label={tg("language")}
              variant="outline"
              className={cn(
                "rounded-full cursor-pointer  transition-none text-muted-foreground  hover:text-neutral-700 bg-transparent dark:bg-transparent hover:bg-transparent  dark:hover:bg-transparent dark:hover:text-neutral-100  dark:aria-expanded:bg-neutral-100! dark:aria-expanded:text-neutral-700! aria-expanded:bg-neutral-800! aria-expanded:text-neutral-100! border-[0.5px]",
                classNames
              )}
            >
              <Globe strokeWidth={1} className="size-4.5" />
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>

        <TooltipContent side="bottom" sideOffset={5}>
          {tg("language")}
        </TooltipContent>
      </Tooltip>

      <DropdownMenuContent
        className="dark:bg-neutral-800  border-neutral-200 dark:border-neutral-700 dark:border-[0.5px]"
        role="group"
        aria-label={`${tg("choose_language")}`}
      >
        {LANGUAGES.map((lang) => (
          <DropdownMenuItem
            onClick={() => handleLangChange(lang)}
            key={lang.value}
            className="flex items-center justify-start gap-2  dark:hover:bg-neutral-700 text-xs font-normal"
            aria-label={lang.text[locale]}
          >
            {lang.value === locale && (
              <span
                className="size-1.5 bg-green-main rounded-full"
                aria-hidden="true"
              ></span>
            )}

            {lang.text[locale]}

            <DropdownMenuShortcut>
              {
                <Image
                  title={lang.text[locale]}
                  src={getFlag(lang.value)}
                  alt={""}
                  width={17}
                  height={undefined}
                  style={{ width: "17px", height: "auto" }}
                />
              }
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
