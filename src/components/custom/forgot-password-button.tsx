"use client";

import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import Link from "next/link";

// INTERFACE
type Props = {
  isLogging: boolean;
};

export default function ForgotPasswordButtonComp({ isLogging }: Props) {
  // TRADUÇÃO
  const t = useTranslations("LOGIN_PAGE");

  return isLogging ? (
    <p className="self-end text-[11px] cursor-not-allowed  text-green-main font-normal  hover:text-green-dark-main underline-offset-3 mt-3 opacity-50">
      {t("forgot_password")}
    </p>
  ) : (
    <Button
      asChild
      title={t("forgot_password")}
      disabled={isLogging}
      className="self-end text-[11px] m-0 p-0 text-green-main font-normal  hover:underline hover:opacity-50 cursor-pointer underline-offset-3 h-auto min-h-0 mt-3"
      variant="link"
      type="button"
    >
      <Link
        aria-disabled={isLogging}
        href="/esqueci-minha-senha"
        className={` transition-opacity transition-300 ${
          isLogging && "opacity-50 pointer-events-none"
        }`}
      >
        {t("forgot_password")}
      </Link>
    </Button>
  );
}
