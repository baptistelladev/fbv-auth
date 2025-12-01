import { FLAGS } from "@/shared/maps/language.map";
import { LanguageType } from "@/shared/types/language.type";
import { PasswordRuleType } from "@/shared/types/password-rules.type";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * @description Obtém a bandeira de acordo com o locale/lang
 * @param lang_value locale/lang selecionado.
 * @returns Um valor dentro do mapa FLAGS.
 * @author Felipe Baptistella
 */
export function getFlag(lang_value: string) {
  return FLAGS[lang_value];
}

/**
 * @description Define o atributo do documento HTML.
 * Apesar de trabalharmos com (pt,en e es) o documento deixamos com (pt-br, en-us e es).
 * @param languages Lista de idiomas.
 * @returns Uma string representando "pt-BR", "en-US" ou "es-ES".
 * @author Felipe Baptistella
 */
export function getLangAttr(languages: LanguageType[], locale: string) {
  return languages.find((lang) => lang.value === locale)!.langAttr ?? "pt-BR";
}

/**
 * @description Função usada para validar as regras da senha.
 * Analise a senha, testa no regex e seta isValid dependendo do resultado.
 * @param rules regras da senha.
 * @param password senha inputada.
 * @returns Lista com as regras da senha validada.
 * @author Felipe Baptistella
 */
export const validatePassword = (
  rules: PasswordRuleType[],
  password: string
) => {
  return rules.map((rule) => ({
    ...rule,
    isValid: rule.regex.test(password),
  }));
};

/**
 * @description Recebe a função que atualiza a state da UI e já limpa todas as regras alterando isValid para false.
 * @param setPasswordRulesState Função que altera o state da UI.
 * @author Felipe Baptistella
 */
export function resetPasswordRulesState(
  setPasswordRulesState: React.Dispatch<
    React.SetStateAction<PasswordRuleType[]>
  >
): void {
  setPasswordRulesState((prev) =>
    prev.map((rule) => ({ ...rule, isValid: false }))
  );
}
