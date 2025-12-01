import { routing } from "@/i18n/routing";
import * as z from "zod";
import { en, es, pt } from "zod/locales";
import { LanguageAsLocale } from "../types/language.type";

/**
 * @description Criamos um mapa com os idiomas do Zod para ser definido globalmente. Deve ser usado ao iniciar o app e ao trocar de idioma no seletor.
 * @author Felipe Baptistella
 */
const MAP_ZOD_LOCALES = {
  pt,
  en,
  es,
};

/**
 * @description Define o idioma do zod globalmente. Precisa atender os tipos de idiomas ("pt","en" ou "es").
 * @param lang {LanguageAsLocale} - Representa o tipo de idioma que o app atende.
 * @returns vazio.
 * @author Felipe Baptistella
 */
export function setZodGlobalLocale(lang: LanguageAsLocale): void {
  const langToZodLocaleFunc = lang;
  const zodLocale =
    MAP_ZOD_LOCALES[langToZodLocaleFunc] ??
    MAP_ZOD_LOCALES[routing.defaultLocale];
  z.config(zodLocale());
}
