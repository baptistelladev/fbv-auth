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
import { useResetPasswordForm } from "@/hooks/forms/use-reset-password";
import {
  blockSpace,
  resetPasswordRulesState,
  validatePassword,
} from "@/lib/utils";
import { PASSWORD_RULES_W_CONFIRMATION_RULE } from "@/shared/mocks/password-rules.mock";
import { Separator } from "@radix-ui/react-separator";
import { Eye, EyeClosed, Send, SquareAsterisk } from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import * as z from "zod";
import ResetPasswordAlertComp from "../alerts/reset-password";
import InputErrorComp from "../custom/input-error";
import PasswordRulesListComp from "../custom/password-rules-list";
import { Dialog, DialogContent } from "../ui/dialog";

export function ResetPasswordFormComp() {
  // HOOKS
  const { form, formSchema, formState } = useResetPasswordForm();

  // TRADUÇÃO
  const t = useTranslations("RESET_PASSWORD_PAGE");
  const tg = useTranslations("GENERAL");

  // MOCKS
  const MOCK_PASSWORD_RULES_W_CONFIRMATION_RULE = [
    ...PASSWORD_RULES_W_CONFIRMATION_RULE,
  ];

  // STATES
  const [showPasswordField, setShowPasswordField] = useState(false);
  const [showConfirmationPasswordField, setShowConfirmationPasswordField] =
    useState(false);

  const [isDefining, setIsDefining] = useState(false);
  const [passwordRules, setPasswordRules] = useState(
    MOCK_PASSWORD_RULES_W_CONFIRMATION_RULE
  );
  const [showModalAccountCreated, setShowModalAccountCreated] = useState(false);

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
   * @description Alterar a visualização da confirmação de senha entre text/password.
   * @author Felipe Baptistella
   */
  function toggleConfirmationPassword() {
    let show = showConfirmationPasswordField ? false : true;
    setShowConfirmationPasswordField(show);
  }

  /**
   * @description Envia as informações para criação de usuário.
   * @author Felipe Baptistella
   */
  function onSubmit(data: z.infer<typeof formSchema>): void {
    setIsDefining(true);
    setShowPasswordField(false);

    setTimeout(() => {
      console.log("dados do usuário", data);

      setIsDefining(false);
      resetForm();
      setShowModalAccountCreated(true);
    }, 2000);
  }

  /**
   * @description Resetar formulário e as regras da senha.
   * @author Felipe Baptistella
   */
  function resetForm(): void {
    form.reset();
    resetPasswordRulesState(setPasswordRules);
  }

  /**
   * @description Essa função é disparada sempre que o usuário inputa algo na senha ou na confirmação.
   * Primeiro nós validamos (passando nos regex) e depois só uma conferida se as senhas batem, só mudaremos o estado dessa regra (repare que ela não tem validação de regex, só criamos um novo objeto e atualizamos a UI)
   * @param password senha inputada no form.
   * @param passwordsMatch comparação entre password e passwordConfirm.
   * @author Felipe Baptistella
   */
  function checkPassword(password: string, passwordsMatch: boolean): void {
    const passwordRulesValidated = validatePassword(
      MOCK_PASSWORD_RULES_W_CONFIRMATION_RULE,
      password
    );

    const passwordsRulesMactched = passwordRulesValidated.map((rule) =>
      rule.key === "passwords_match"
        ? { ...rule, isValid: passwordsMatch }
        : rule
    );

    setPasswordRules(passwordsRulesMactched);
  }

  // DEIXAR AS PRÓPRIAS MUDANÇAS DO FORMULÁRIO VALIDAR NOSSA LISTA DE REGRAS.
  useEffect(() => {
    const subscription = form.watch((controls, { name }) => {
      const { password, confirmPassword } = controls;
      let passwordsMatch = password === confirmPassword;

      if (!password && !confirmPassword) {
        passwordsMatch = false;
      }

      checkPassword(password!, passwordsMatch);

      // IMPORTANTE: Força a revalidação.
      if (name === "password") {
        form.trigger("confirmPassword");
      }
    });
    return () => subscription.unsubscribe();
  });

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-4 max-w-sm mb-6"
    >
      <div className="flex flex-col ">
        <div
          className={`rounded-md shadow border-[0.5px] border-neutral-200 dark:border-neutral-700 ${
            isDefining && "cursor-not-allowed"
          }`}
        >
          <FieldGroup className="gap-0 w-full">
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
                  <InputGroup className="rounded-t-md rounded-b-none border-transparent h-13  has-[[data-slot=input-group-control]:focus-visible]:bg-neutral-100/60 group dark:has-[[data-slot=input-group-control]:focus-visible]:bg-neutral-700/50  focus-anfitrion-effect has-[[data-slot][aria-invalid=true]]:border-transparent">
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
                        onKeyDown={blockSpace}
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
                        disabled={isDefining}
                        aria-describedby={
                          fieldState.invalid ? `${field.name}-error` : undefined
                        }
                      />
                    </div>

                    <FieldError id={`${field.name}-error`} className="sr-only">
                      {fieldState.error?.message}
                    </FieldError>

                    <InputErrorComp
                      classNames="pr-1"
                      showErrorWhen={
                        fieldState.invalid &&
                        fieldState.isTouched &&
                        fieldState.isDirty
                      }
                    />

                    <InputGroupAddon align="inline-end" className="mr-0!">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <InputGroupButton
                            title={
                              showPasswordField
                                ? tg("hide_password")
                                : tg("show_password")
                            }
                            disabled={isDefining}
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
                  </InputGroup>
                </Field>
              )}
            />

            <Separator className="h-[0.5px] bg-neutral-200 dark:bg-neutral-700" />

            <Controller
              name="confirmPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={
                    fieldState.invalid &&
                    fieldState.isTouched &&
                    fieldState.isDirty
                  }
                >
                  <InputGroup className="rounded-b-md rounded-t-none border-transparent h-13  has-[[data-slot=input-group-control]:focus-visible]:bg-neutral-100/60 group dark:has-[[data-slot=input-group-control]:focus-visible]:bg-neutral-700/50  focus-anfitrion-effect has-[[data-slot][aria-invalid=true]]:border-transparent">
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
                        {tg("confirmation_password")}
                      </Label>

                      <InputGroupInput
                        {...field}
                        onKeyDown={blockSpace}
                        id={field.name}
                        aria-required={true}
                        aria-invalid={
                          fieldState.invalid &&
                          fieldState.isTouched &&
                          fieldState.isDirty
                        }
                        type={
                          showConfirmationPasswordField ? "text" : "password"
                        }
                        className="text-sm"
                        autoComplete="off"
                        placeholder="* * * * * *"
                        inputMode="text"
                        autoFocus={false}
                        disabled={isDefining}
                        aria-describedby={
                          fieldState.invalid ? `${field.name}-error` : undefined
                        }
                      />
                    </div>

                    <FieldError id={`${field.name}-error`} className="sr-only">
                      {fieldState.error?.message}
                    </FieldError>

                    <InputErrorComp
                      classNames="pr-1"
                      showErrorWhen={
                        fieldState.invalid &&
                        fieldState.isTouched &&
                        fieldState.isDirty
                      }
                    />

                    <InputGroupAddon align="inline-end" className="mr-0!">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <InputGroupButton
                            title={
                              showConfirmationPasswordField
                                ? tg("hide_password")
                                : tg("show_password")
                            }
                            disabled={isDefining}
                            className="rounded-full text-neutral-400 cursor-pointer hover:opacity-50 transition-opacity duration-300 -mr-1 bg-neutral-100 dark:bg-neutral-700/20 dark:hover:bg-neutral-700/60"
                            size="icon-sm"
                            onClick={() => toggleConfirmationPassword()}
                          >
                            {showConfirmationPasswordField ? (
                              <Eye strokeWidth={1.6} />
                            ) : (
                              <EyeClosed strokeWidth={1.6} />
                            )}
                          </InputGroupButton>
                        </TooltipTrigger>
                        <TooltipContent sideOffset={-4}>
                          {showConfirmationPasswordField
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

        <PasswordRulesListComp passwordRules={passwordRules} />

        <div className="flex items-center gap-3 mt-3 mb-3">
          <Button
            type="button"
            asChild
            variant="outline"
            title={isDefining ? tg("redefining") : tg("redefine")}
            aria-label={`${tg("redefine")}`}
            className="rounded-full cursor-pointer dark:text-white dark:shadow-none font-normal text-xs transition-none dark:border-[0.5px]"
          >
            <Link href={"/login"}>{tg("cancel")}</Link>
          </Button>

          <Button
            type="submit"
            asChild
            title={isDefining ? tg("redefining") : tg("redefine")}
            aria-label={`${tg("redefine")}`}
            disabled={isDefining || !formState.isValid}
            className="transition-none rounded-full cursor-pointer dark:text-white dark:shadow-none main-btn font-normal text-xs flex-1"
          >
            <motion.button whileTap={{ scale: 0.95 }}>
              {isDefining ? (
                <>
                  <Spinner /> {tg("redefining")}
                </>
              ) : (
                <>
                  {tg("redefine")} <Send />
                </>
              )}
            </motion.button>
          </Button>
        </div>
      </div>

      {/** DIALOG */}
      <Dialog
        open={showModalAccountCreated}
        onOpenChange={(val) => setShowModalAccountCreated(val)}
      >
        <DialogContent
          className="dark:bg-neutral-900 border-[0.5px] border-neutral-200 dark:border-neutral-700"
          forceMount={true}
        >
          <ResetPasswordAlertComp />
        </DialogContent>
      </Dialog>
    </form>
  );
}
