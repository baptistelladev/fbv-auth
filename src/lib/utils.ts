import { FLAGS } from "@/shared/maps/language.map";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFlag(lang_value: string) {
  return FLAGS[lang_value];
}
