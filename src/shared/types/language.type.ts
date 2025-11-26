export type Locale = "pt" | "en" | "es";

export type LanguageType = {
  value: string;
  text: {
    ["en"]: string;
    ["pt"]: string;
    ["es"]: string;
  };
  image: string;
  title: string;
  messageChange: string;
  langAttr: string;
};
