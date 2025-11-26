import { FLAGS } from "@/shared/maps/language.map";
import { LANGUAGES } from "@/shared/mocks/languages";
import { LanguageType } from "@/shared/types/language.type";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFlag(lang_value: string) {
  return FLAGS[lang_value];
}

export function getLangAttr(languages: LanguageType[], locale: string) {
  return languages.find((lang) => lang.value === locale)!.langAttr ?? "pt-BR";
}
