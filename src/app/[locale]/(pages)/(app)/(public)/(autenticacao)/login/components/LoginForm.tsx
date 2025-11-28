"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
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
import { useState } from "react";
import { Controller } from "react-hook-form";
import * as z from "zod";
import { useLoginForm } from "../schemas/login-form.schema";
import ForgotPasswordComp from "./ForgotPasswordComp";
import SignUpComp from "./SignUpComp";

export function LoginForm() {
  const { form, formSchema, formState } = useLoginForm();

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
  function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLogging(true);
    setShowPasswordField(false);
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-sm">
      <div className="flex flex-col ">
        <div
          className={`rounded-md shadow border-[0.5px] border-neutral-200 dark:border-neutral-700 ${
            isLogging && "cursor-not-allowed"
          }`}
        >
          <FieldGroup className="gap-0 w-full">
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={
                    fieldState.invalid &&
                    fieldState.isTouched &&
                    fieldState.isDirty
                  }
                >
                  <InputGroup className="rounded-t-md rounded-b-none border-transparent h-13  has-[[data-slot=input-group-control]:focus-visible]:bg-neutral-100/60 group dark:has-[[data-slot=input-group-control]:focus-visible]:bg-neutral-700/50  focus-anfitrion-effect has-[[data-slot][aria-invalid=true]]:border-transparent! ">
                    <InputGroupAddon>
                      <AtSign
                        data-invalid={
                          fieldState.invalid &&
                          fieldState.isTouched &&
                          fieldState.isDirty
                        }
                        strokeWidth={1.7}
                        className="data-[invalid=true]:text-destructive size-4 text-neutral-400 group-has-[[data-slot=input-group-control]:focus-visible]:text-neutral-700 dark:group-has-[[data-slot=input-group-control]:focus-visible]:text-neutral-100 "
                      />
                    </InputGroupAddon>

                    <div className="flex flex-col justify-start items-start w-full">
                      <Label
                        htmlFor={field.name}
                        className="pl-3 text-[8px] uppercase font-normal text-neutral-700 dark:text-neutral-100 -mb-1"
                      >
                        {tg("email")}
                      </Label>

                      <InputGroupInput
                        className="text-sm"
                        {...field}
                        aria-required={true}
                        id={field.name}
                        placeholder={`${t("input_email_placeholder")}`}
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        autoFocus={false}
                        disabled={isLogging}
                        aria-invalid={
                          fieldState.invalid &&
                          fieldState.isTouched &&
                          fieldState.isDirty
                        }
                      />
                    </div>
                  </InputGroup>
                </Field>
              )}
            />

            <Separator className="h-px dark:h-[0.5px] bg-neutral-200 dark:bg-neutral-700" />

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={
                    fieldState.invalid &&
                    fieldState.isTouched &&
                    fieldState.isDirty
                  }
                >
                  <InputGroup className="rounded-b-md rounded-t-none border-transparent h-13  has-[[data-slot=input-group-control]:focus-visible]:bg-neutral-100/60 group dark:has-[[data-slot=input-group-control]:focus-visible]:bg-neutral-700/50  focus-anfitrion-effect has-[[data-slot][aria-invalid=true]]:border-transparent!">
                    <InputGroupAddon>
                      <SquareAsterisk
                        data-invalid={
                          fieldState.invalid &&
                          fieldState.isTouched &&
                          fieldState.isDirty
                        }
                        strokeWidth={1.5}
                        className="size-4 text-neutral-400 group-has-[[data-slot=input-group-control]:focus-visible]:text-neutral-700 dark:group-has-[[data-slot=input-group-control]:focus-visible]:text-neutral-100 data-[invalid=true]:text-destructive"
                      />
                    </InputGroupAddon>

                    <div className="flex flex-col justify-start items-start w-full">
                      <Label
                        htmlFor={field.name}
                        className="pl-3 text-[8px] uppercase font-normal text-neutral-700 dark:text-neutral-100 -mb-1"
                      >
                        {tg("password")}
                      </Label>

                      <InputGroupInput
                        {...field}
                        id={field.name}
                        aria-required={true}
                        aria-invalid={
                          fieldState.invalid &&
                          fieldState.isTouched &&
                          fieldState.isDirty
                        }
                        type={showPasswordField ? "text" : "password"}
                        className="text-sm"
                        autoComplete="off"
                        placeholder="* * * * * *"
                        inputMode="text"
                        autoFocus={false}
                        disabled={isLogging}
                      />
                    </div>

                    <InputGroupAddon align="inline-end" className="mr-0! ">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <InputGroupButton
                            title={
                              showPasswordField
                                ? tg("hide_password")
                                : tg("show_password")
                            }
                            disabled={isLogging}
                            className="rounded-full text-neutral-400 cursor-pointer hover:opacity-50 transition-opacity duration-300 -mr-1 "
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
                </Field>
              )}
            />
          </FieldGroup>
        </div>

        <ForgotPasswordComp isLogging={isLogging} />

        <Button
          type="submit"
          asChild
          title={isLogging ? t("logging_in") : t("login")}
          aria-label={`${t("login")}`}
          disabled={isLogging || !formState.isValid}
          className="mt-6 mb-3 w-full transition-none rounded-full cursor-pointer dark:text-white dark:shadow-none main-btn font-normal text-xs "
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

        <SignUpComp isLogging={isLogging} />
      </div>
    </form>
  );
}
