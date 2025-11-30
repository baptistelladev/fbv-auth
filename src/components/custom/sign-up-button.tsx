"use client";

import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import Link from "next/link";

type Props = {
  isLogging: boolean;
};

export default function SignUpButtonComp({ isLogging }: Props) {
  const t = useTranslations("LOGIN_PAGE");

  return isLogging ? (
    <p className="text-xs cursor-not-allowed font-normal  text-neutral-700 dark:text-neutral-100 text-center opacity-50">
      {t("hasnt_account")}
      <span className=" text-green-anfitrion underline underline-offset-3 ml-1">
        {t("register")}
      </span>
    </p>
  ) : (
    <Button
      asChild
      title={`${t("hasnt_account")} ${t("register")}`}
      disabled={isLogging}
      className="text-xs m-0 p-0 font-normal group no-underline hover:no-underline hover:opacity-50 h-auto min-h-0 text-neutral-700 dark:text-neutral-100 transition-none"
      variant="link"
      type="button"
    >
      <Link
        aria-disabled={isLogging}
        href={"/criar-conta"}
        className={` transition-opacity transition-300 ${
          isLogging && "disable-link"
        }`}
      >
        {t("hasnt_account")}
        <span className=" text-green-anfitrion group-hover:text-green-dark-anfitrion underline underline-offset-3 cursor-pointer -ml-1">
          {t("register")}
        </span>
      </Link>
    </Button>
  );
}
