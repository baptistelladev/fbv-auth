import { LanguageType } from "../types/language.type";

export const LANGUAGES: LanguageType[] = [
  {
    value: "pt",
    text: {
      pt: "Português",
      en: "Portuguese",
      es: "Portugués",
    },
    image: "pt.svg",
    title: "Idioma",
    messageChange: "Você alterou o idioma para",
    langAttr: "pt-BR",
  },
  {
    value: "en",
    text: {
      pt: "Inglês",
      en: "English",
      es: "Inglés",
    },
    image: "en.svg",
    title: "Language",
    messageChange: "You changed the language to",
    langAttr: "en-US",
  },
  {
    value: "es",
    text: {
      pt: "Espanhol",
      en: "Spanish",
      es: "Español",
    },
    image: "es.svg",
    title: "Idioma",
    messageChange: "Has cambiado el idioma a",
    langAttr: "es-ES",
  },
];
