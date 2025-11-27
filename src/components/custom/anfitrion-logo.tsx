"use client";

import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useEffectEvent, useRef, useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";

// INTERFACE
type Props = {
  classNames?: string;
  href?: any;
};

export const AnfitrionLogoComp = ({ classNames, href }: Props) => {
  const tg = useTranslations("GENERAL");

  const pathname = usePathname().split("/")[2];

  const isLogado = false;

  const ariaLabel =
    isLogado && pathname
      ? "Ir para a tela principal"
      : !isLogado && pathname !== "login"
      ? "Ir para a tela de login"
      : "Logo anfitrion";

  return (
    <Button
      size={"sm"}
      asChild
      aria-label={ariaLabel}
      className={"opacity-100! min-h-0 rounded-full h-9 bg-neutral-800"}
      title={"anfitrion"}
    >
      <Link href={href}>
        <span
          className={cn(
            "text-neutral-100 font-baloo font-normal text-sm",
            classNames
          )}
        >
          anfitri<span className="text-green-anfitrion font-bold">on</span>
        </span>
      </Link>
    </Button>
  );
};
