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

  const ariaLabelOrTitle =
    isLogado && pathname
      ? tg("redirect_authenticated")
      : !isLogado && pathname !== "login"
      ? tg("redirect_not_authenticated")
      : "Logo anfitrion";

  return (
    <Button
      size={"sm"}
      asChild
      aria-label={ariaLabelOrTitle}
      className={
        "opacity-100! min-h-0 rounded-full h-9 bg-neutral-800 hover:bg-neutral-800"
      }
      title={ariaLabelOrTitle}
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
