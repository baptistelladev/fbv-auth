"use client";

import { CopyrightComp } from "@/components/custom/copyright";
import { ToggleLanguageComp } from "@/components/custom/toggle-language";
import { ToggleModeComp } from "@/components/custom/toggle-theme";
import { ViewTransition } from "react";
import logo from "../../../../../../../public/fbv.png";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Linkedin, Presentation } from "lucide-react";
import { LogoComp } from "@/components/custom/logo";

// INTERFACE
type Props = {
  children: React.ReactNode;
};

// LAYOUT
export default function LocaleLayout({ children }: Props) {
  return (
    <section className="authentication-layout-wrapper w-full flex flex-row h-auto md:min-h-screen bg-linear-to-bt-effect">
      <div className="fixed-content-wrapper p-6 w-full md:w-[60%] bg-neutral-900 md:bg-transparent hidden md:block">
        <div className="w-full rounded-xl flex flex-col justify-between h-screen md:h-full bg-neutral-800  relative overflow-hidden">
          <header
            className="w-full hidden pt-2 pl-1 md:block"
            aria-live="polite"
          >
            <LogoComp classNames="text-2xl " href="/login" />
          </header>

          {/* COLOQUE UM VÍDEO, LOGO, COMPONENTE OU OUTRA COISA AQUI: USE SUA CRIATIVIDADE */}
          <div
            className="flex-1 flex items-center justify-center flex-col "
            aria-hidden={true}
          >
            <div className="-mt-34 flex items-center justify-center flex-col">
              <Image
                src={logo}
                alt="fbv"
                title="Felipe Baptistella Vieira"
                className="w-[20vw] max-w-[250px] min-w-[200px]"
                priority={true}
              ></Image>

              <div className="flex">
                <Button
                  className="main-btn shadow-none rounded-full text-xs font-normal"
                  asChild
                  title="Felipe Baptistella - Portfólio"
                >
                  <Link
                    href={"https://felipebaptistella.com.br/"}
                    target="_blank"
                    className="flex gap-1"
                  >
                    Portfólio <Presentation strokeWidth={1.5} />
                  </Link>
                </Button>

                <Button
                  className="bg-transparent hover:bg-transparent shadow-none rounded-full text-xs font-normal text-green-main hover:opacity-50 transition-opacity duration-300"
                  asChild
                  title="Felipe Baptistella - Linkedin"
                >
                  <Link
                    href={
                      "https://www.linkedin.com/in/felipebaptistellavieira/"
                    }
                    target="_blank"
                    className="flex gap-1"
                  >
                    Profile <Linkedin strokeWidth={1.5} />
                  </Link>
                </Button>
              </div>
            </div>

            <p className="text-neutral-200 text-sm mt-4 ">
              made by <b>fbv</b>.
            </p>
          </div>
        </div>
      </div>

      <div className="authentication-pages-wrapper flex flex-col px-6 pt-6 pb-6 md:pb-12 md:pl-0 min-h-screen w-full md:w-[40%] md:min-w-[400px] bg-linear-to-bt-effect">
        <header className="w-full flex items-center flex-end">
          <div className="flex-1 md:hidden" aria-live="polite">
            <LogoComp classNames="text-lg" href="/login" />
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
