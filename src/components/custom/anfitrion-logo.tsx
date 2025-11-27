"use client";

import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useEffectEvent, useState } from "react";

// INTERFACE
type Props = {
  classNames?: string;
  isLink?: boolean;
  href?: string;
};

export const AnfitrionLogoComp = ({
  classNames,
  isLink = false,
  href,
}: Props) => {
  const tg = useTranslations("GENERAL");

  const pathname = usePathname().split("/")[2];

  const isLogado = true;

  function Logo(): ReactNode {
    return (
      <p
        className={cn(
          "text-neutral-700 dark:text-white font-baloo font-thin text-sm",
          classNames
        )}
      >
        anfitri<span className="text-green-anfitrion font-bold">on</span>
      </p>
    );
  }

  return isLink &&
    href &&
    ((!isLogado && pathname !== "login") || (isLogado && pathname)) ? (
    <Link
      href={href}
      className="inline-block hover:opacity-50 transition-opacity duration-300"
    >
      <Logo />
    </Link>
  ) : (
    <Logo />
  );
};
