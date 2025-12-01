"use client";

import ForgotPasswordButtonComp from "@/components/custom/forgot-password-button";
import SignUpButtonComp from "@/components/custom/sign-up-button";
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
import { useLoginForm } from "@/hooks/forms/use-login-form";
import { Separator } from "@radix-ui/react-separator";
import { AtSign, Eye, EyeClosed, LogIn, SquareAsterisk } from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Controller } from "react-hook-form";
import * as z from "zod";
import InputErrorComp from "../custom/input-error";

export function LoginFormComp() {
  // HOOKS
  const { form, formSchema, formState } = useLoginForm();

  // TRADUÇÃO
  const t = useTranslations("LOGIN_PAGE");
  const tg = useTranslations("GENERAL");

  // STATES
  const [showPasswordField, setShowPasswordField] = useState(false);
  const [isLogging, setIsLogging] = useState(false);

  // FUNÇÕES

  /**
   * @description Alterar a visualização da senha entre text/password.
   * @author Felipe Baptistella
   */
  function togglePassword() {
    let show = showPasswordField ? false : true;
    setShowPasswordField(show);
  }

  /**
   * @description Simular login.
   * @author Felipe Baptistella
   */
  function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLogging(true);
    setShowPasswordField(false);

    setTimeout(() => {
      console.log(data);
      setIsLogging(false);
    }, 2000);
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-4 max-w-sm  mb-6"
    >
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
                    <InputGroupAddon aria-hidden={true}>
                      <AtSign
                        strokeWidth={1.7}
                        className="size-4 text-neutral-400"
                      />
                    </InputGroupAddon>

                    <div className="flex flex-col justify-start items-start w-full h-full">
                      <Label
                        htmlFor={field.name}
                        className="pl-3 text-[8px] uppercase font-normal text-neutral-400 pt-2 -mb-3"
                      >
                        {tg("email")}
                      </Label>

                      <InputGroupInput
                        className="text-sm lowercase"
                        {...field}
                        aria-required={true}
                        id={field.name}
                        placeholder={`${tg("input_email_placeholder")}`}
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
                        aria-describedby={
                          fieldState.invalid ? `${field.name}-error` : undefined
                        }
                      />
                    </div>

                    <FieldError id={`${field.name}-error`} className="sr-only">
                      {fieldState.error?.message}
                    </FieldError>

                    <InputErrorComp
                      showErrorWhen={
                        fieldState.invalid &&
                        fieldState.isTouched &&
                        fieldState.isDirty
                      }
                    />
                  </InputGroup>
                </Field>
              )}
            />

            <Separator className="h-[0.5px] bg-neutral-200 dark:bg-neutral-700" />

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
                    <InputGroupAddon aria-hidden={true}>
                      <SquareAsterisk
                        strokeWidth={1.5}
                        className="size-4 text-neutral-400"
                      />
                    </InputGroupAddon>

                    <div className="flex flex-col justify-start items-start w-full h-full">
                      <Label
                        htmlFor={field.name}
                        className="pl-3 text-[8px] uppercase font-normal text-neutral-400 pt-2 -mb-3"
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
                        aria-describedby={
                          fieldState.invalid ? `${field.name}-error` : undefined
                        }
                      />
                    </div>

                    <InputGroupAddon align="inline-end" className="mr-0!">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <InputGroupButton
                            title={
                              showPasswordField
                                ? tg("hide_password")
                                : tg("show_password")
                            }
                            disabled={isLogging}
                            className="rounded-full text-neutral-400 cursor-pointer hover:opacity-50 transition-opacity duration-300 -mr-1 bg-neutral-100 dark:bg-neutral-700/20 dark:hover:bg-neutral-700/60"
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

                    <FieldError id={`${field.name}-error`} className="sr-only">
                      {fieldState.error?.message}
                    </FieldError>

                    <InputErrorComp
                      showErrorWhen={
                        fieldState.invalid &&
                        fieldState.isTouched &&
                        fieldState.isDirty
                      }
                    />
                  </InputGroup>
                </Field>
              )}
            />
          </FieldGroup>
        </div>

        <ForgotPasswordButtonComp isLogging={isLogging} />

        <Button
          type="submit"
          asChild
          title={isLogging ? t("logging_in") : t("login")}
          aria-label={`${t("login")}`}
          disabled={isLogging || !formState.isValid}
          className="mt-6 mb-3 w-auto transition-none rounded-full cursor-pointer dark:text-white dark:shadow-none main-btn font-normal text-xs "
        >
          <motion.button whileTap={{ scale: 0.95 }}>
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

        <SignUpButtonComp isLogging={isLogging} />
      </div>
    </form>
  );
}
