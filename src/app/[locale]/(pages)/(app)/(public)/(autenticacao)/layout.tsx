"use client";

import { AnfitrionLogoComp } from "@/components/custom/anfitrion-logo";
import { CopyrightComp } from "@/components/custom/copyright";
import { ToggleLanguageComp } from "@/components/custom/toggle-language";
import { ToggleModeComp } from "@/components/custom/toggle-theme";
import { useIsMobile } from "@/hooks/use-mobile";

import { ViewTransition } from "react";

type Props = {
  children: React.ReactNode;
};

export default function LocaleLayout({ children }: Props) {
  const isMobile = useIsMobile();

  return (
    <section className="authentication-layout-wrapper w-full flex flex-col-reverse md:flex-row h-auto md:h-screen md:overflow-hidden bg-linear-to-bt-effect">
      <div className="fixed-content-wrapper p-6 w-full md:w-[60%] bg-neutral-900 md:bg-transparent hidden md:block">
        <div className="w-full rounded-xl flex flex-col justify-between h-screen md:h-full bg-neutral-800  relative overflow-hidden">
          <header className="w-full hidden md:block" aria-live="polite">
            <AnfitrionLogoComp classNames="text-2xl mt-4 ml-1" href="/login" />
          </header>
        </div>
      </div>

      <div className="authentication-pages-wrapper flex flex-col px-6 pt-6 pb-6 md:pb-12 md:pl-0 h-svh md:h-full w-full md:w-[40%] md:min-w-[400px] bg-linear-to-bt-effect">
        <header className="w-full flex items-center flex-end">
          <div className="flex-1 md:hidden" aria-live="polite">
            <AnfitrionLogoComp classNames="text-lg" href="/login" />
          </div>

          <div className="flex md:flex-1 items-center justify-end gap-2">
            <ToggleLanguageComp />
            <ToggleModeComp />
          </div>
        </header>

        <ViewTransition>
          <div className="flex-1 flex items-center">{children}</div>
        </ViewTransition>

        <footer className="w-full text-center relative z-20">
          <CopyrightComp />
        </footer>
      </div>
    </section>
  );
}
