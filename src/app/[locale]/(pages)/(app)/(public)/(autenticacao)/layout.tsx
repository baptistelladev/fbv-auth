import { AnfitrionLogoComp } from "@/components/custom/anfitrion-logo";
import { CopyrightComp } from "@/components/custom/copyright";
import { CurrentLanguageComp } from "@/components/custom/current-language";
import { ModeToggle } from "@/components/custom/toggle-theme";
import Link from "next/link";
import { ViewTransition } from "react";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  return (
    <section className="authentication-layout-wrapper w-full flex flex-col-reverse md:flex-row h-auto md:h-screen md:overflow-hidden bg-linear-to-bt-effect">
      <div className="authentication-pages-wrapper flex flex-col px-6 pt-6 pb-6 md:pb-12 md:pr-0 h-svh md:h-full w-full md:w-[40%] md:min-w-[400px] bg-linear-to-bt-effect">
        <header className="w-full flex  items-center">
          <div className="flex-1" aria-live="polite">
            <AnfitrionLogoComp classNames="text-lg" href="/login" />
          </div>

          <div className="flex items-center justify-end gap-2">
            <CurrentLanguageComp />
            <ModeToggle />
          </div>
        </header>

        <ViewTransition>
          <div className="flex-1 flex items-center">{children}</div>
        </ViewTransition>

        <footer className="w-full text-center relative z-20">
          <CopyrightComp />
        </footer>
      </div>

      <div className="fixed-content-wrapper p-6 w-full md:w-[60%] bg-neutral-900 md:bg-transparent hidden md:block">
        <div className="w-full rounded-xl p-6 flex flex-col justify-between h-screen md:h-full bg-neutral-800  relative overflow-hidden"></div>
      </div>
    </section>
  );
}
