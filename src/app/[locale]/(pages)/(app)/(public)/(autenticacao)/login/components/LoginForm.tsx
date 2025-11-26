"use client";

import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@radix-ui/react-separator";
import { AtSign, Eye, EyeClosed, LogIn, SquareAsterisk } from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";

export function LoginForm() {
  // TRADUÇÃO
  const t = useTranslations("LOGIN_PAGE");
  const tg = useTranslations("GENERAL");

  // STATES
  const [showPasswordField, setShowPasswordField] = useState(false);
  const [isLogging, setIsLogging] = useState(false);

  // FUNÇÕES
  /**
   * @description Alternar visualização da senha.
   * @author Felipe Baptistella
   */
  function togglePassword() {
    let show = showPasswordField ? false : true;
    setShowPasswordField(show);
  }

  /**
   * @description Logar na aplicação.
   * @author Felipe Baptistella
   */
  function login() {
    setIsLogging(true);
    setShowPasswordField(false);
  }

  return (
    <div className="flex flex-col ">
      <div className="rounded-md overflow-hidden shadow border-[0.5px] border-neutral-200 dark:border-neutral-700 focus-anfitrion-effect">
        <div>
          <InputGroup className="border-none shadow-none rounded-none h-13  has-[[data-slot=input-group-control]:focus-visible]:bg-neutral-100/60 group dark:has-[[data-slot=input-group-control]:focus-visible]:bg-neutral-700/50">
            <InputGroupAddon>
              <AtSign
                strokeWidth={1.7}
                className="size-4 text-neutral-400 group-has-[[data-slot=input-group-control]:focus-visible]:text-neutral-600 dark:group-has-[[data-slot=input-group-control]:focus-visible]:text-neutral-100"
              />
            </InputGroupAddon>

            <div className="flex flex-col justify-start items-start">
              <Label
                htmlFor="email"
                className="pl-3 text-[9px] font-normal text-neutral-700 dark:text-neutral-100"
              >
                {tg("email")}
              </Label>

              <InputGroupInput
                id="email"
                placeholder={`${t("input_email_placeholder")}`}
                type="email"
                inputMode="email"
                autoFocus={false}
                aria-label="email"
              />
            </div>
          </InputGroup>
        </div>

        <Separator className="h-px dark:h-[0.5px] bg-neutral-200 dark:bg-neutral-700" />

        <div className="">
          <InputGroup className="border-none shadow-none rounded-none h-13 has-[[data-slot=input-group-control]:focus-visible]:bg-neutral-100/60 group dark:has-[[data-slot=input-group-control]:focus-visible]:bg-neutral-700/50">
            <InputGroupAddon>
              <SquareAsterisk
                strokeWidth={1.5}
                className="size-4 text-neutral-400 group-has-[[data-slot=input-group-control]:focus-visible]:text-neutral-600 dark:group-has-[[data-slot=input-group-control]:focus-visible]:text-neutral-100"
              />
            </InputGroupAddon>

            <div className="flex flex-col justify-start items-start w-full">
              <Label
                htmlFor="password"
                className="pl-3 text-[9px] font-normal text-neutral-700 dark:text-neutral-100"
              >
                {tg("password")}
              </Label>

              <InputGroupInput
                id="password"
                type={showPasswordField ? "text" : "password"}
                placeholder="* * * * * *"
                inputMode="text"
                autoFocus={false}
                aria-label="password"
              />
            </div>

            <InputGroupAddon align="inline-end" className="mr-0! pr-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <InputGroupButton
                    title={
                      showPasswordField
                        ? tg("hide_password")
                        : tg("show_password")
                    }
                    disabled={isLogging}
                    className="h-auto min-h-0 rounded-full text-neutral-400 cursor-pointer hover:opacity-50 transition-opacity duration-300"
                    size="icon-sm"
                    onClick={() => togglePassword()}
                  >
                    {showPasswordField ? (
                      <Eye strokeWidth={1.6} />
                    ) : (
                      <EyeClosed strokeWidth={1.6} />
                    )}
                  </InputGroupButton>
                </TooltipTrigger>
                <TooltipContent sideOffset={-4}>
                  {showPasswordField
                    ? tg("hide_password")
                    : tg("show_password")}
                </TooltipContent>
              </Tooltip>
            </InputGroupAddon>
          </InputGroup>
        </div>
      </div>

      <Button
        asChild
        title={t("forgot_password")}
        disabled={isLogging}
        className="self-end text-[11px] m-0 p-0 text-green-anfitrion font-normal  hover:underline hover:text-green-dark-anfitrion cursor-pointer underline-offset-3 h-auto min-h-0 mt-3"
        variant="link"
      >
        <Link
          href="/esqueci-minha-senha"
          className={` transition-opacity transition-300 ${
            isLogging && "disable-link"
          }`}
        >
          {t("forgot_password")}
        </Link>
      </Button>

      <Button
        asChild
        title={isLogging ? t("logging_in") : t("login")}
        disabled={isLogging}
        className="mt-6 mb-3 w-full transition-none rounded-full cursor-pointer dark:text-white dark:shadow-none main-btn font-normal text-xs "
        onClick={() => login()}
      >
        <motion.button whileTap={{ scale: 0.95 }} className="">
          {isLogging ? (
            <>
              <Spinner /> {t("logging_in")}
            </>
          ) : (
            <>
              {t("login")} <LogIn />
            </>
          )}
        </motion.button>
      </Button>

      <Button
        asChild
        title={`${t("hasnt_account")} ${t("register")}`}
        disabled={isLogging}
        className="text-xs m-0 p-0 font-normal group no-underline hover:no-underline hover:opacity-50 h-auto min-h-0 text-neutral-700 dark:text-neutral-100 transition-none"
        variant="link"
      >
        <Link
          href="/criar-conta"
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
    </div>
  );
}
