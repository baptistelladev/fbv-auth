import { regexList } from "../maps/regex-list.map";
import { PasswordRuleType } from "../types/password-rules.type";

export const PASSWORD_RULES: PasswordRuleType[] = [
  {
    text: "Pelo menos 1 número",
    isValid: false,
    regex: regexList.hasNumber,
    key: "at_least_one_number",
  },
  {
    text: "Pelo menos 1 letra maiúscula",
    isValid: false,
    regex: regexList.hasUpper,
    key: "at_least_one_uppercase_letter",
  },
  {
    text: "Pelo menos 1 letra minúscula",
    isValid: false,
    regex: regexList.hasLower,
    key: "at_least_one_lowercase_letter",
  },
  {
    text: "Pelo menos 1 caractere especial (@#%*)",
    isValid: false,
    regex: regexList.hasSpecial,
    key: "at_least_one_special_character",
  },
  {
    text: "Pelo menos 6 dígitos",
    isValid: false,
    regex: regexList.hasSixDigits,
    key: "at_least_six_characters",
  },
];

export const PASSWORD_MATCH_CONFIRMATION: PasswordRuleType = {
  text: "Senhas coincidem",
  isValid: false,
  key: "passwords_match",
};

export const PASSWORD_RULES_W_CONFIRMATION_RULE: PasswordRuleType[] = [
  ...PASSWORD_RULES,
  PASSWORD_MATCH_CONFIRMATION,
];
