import { PasswordRuleType } from "@/shared/types/password-rules.type";
import { Check, X } from "lucide-react";
import React from "react";

type Props = {
  passwordRules: PasswordRuleType[];
};

export default function PasswordRulesListComp({ passwordRules }: Props) {
  return (
    <ul className="w-full py-4" aria-hidden={true}>
      {passwordRules.map((rule) => (
        <li
          className="text-xs text-neutral-700 dark:text-neutral-100 flex items-center justify-start font-light not-last:mb-1"
          key={rule.text}
        >
          <span
            className={`rounded-full size-3 text-white flex items-center justify-center mr-2 transition-all duration-300 ${
              rule.isValid
                ? "bg-green-main"
                : "bg-neutral-400 dark:bg-neutral-700 dark:text-neutral-400"
            }`}
          >
            {rule.isValid ? (
              <Check size={8} strokeWidth={2.5} />
            ) : (
              <X size={8} strokeWidth={2.5} />
            )}
          </span>
          {rule.text}
        </li>
      ))}
    </ul>
  );
}
