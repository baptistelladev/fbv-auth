export type PasswordRuleType = {
  text: string;
  isValid: boolean;
  regex?: RegExp;
  key: string;
};
