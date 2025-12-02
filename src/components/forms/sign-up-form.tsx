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
import { useSignUpForm } from "@/hooks/forms/use-sign-up-form";
import {
  blockSpace,
  clearFirstName,
  resetPasswordRulesState,
  validatePassword,
} from "@/lib/utils";
import { PASSWORD_RULES } from "@/shared/mocks/password-rules.mock";
import { Separator } from "@radix-ui/react-separator";
import {
  AtSign,
  Check,
  Eye,
  EyeClosed,
  Fingerprint,
  Send,
  SquareAsterisk,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";
import { Controller } from "react-hook-form";
import * as z from "zod";
import AccountCreatedComp from "../alerts/account-created";
import TermsComp from "../alerts/terms";
import InputErrorComp from "../custom/input-error";
import { Checkbox } from "../ui/checkbox";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import PasswordRulesListComp from "../custom/password-rules-list";

export function SignUpFormComp() {
  // HOOKS
  const { form, formSchema, formState } = useSignUpForm();

  // TRADUÇÃO
  const t = useTranslations("SIGN_UP_PAGE");
  const tg = useTranslations("GENERAL");

  // MOCKS
  const MOCK_PASSWORD_RULES = [...PASSWORD_RULES];

  // STATES
  const [showPasswordField, setShowPasswordField] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [passwordRules, setPasswordRules] = useState(MOCK_PASSWORD_RULES);
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
   * @description Envia as informações para criação de usuário.
   * @author Felipe Baptistella
   */
  function onSubmit(data: z.infer<typeof formSchema>): void {
    setIsSending(true);
    setShowPasswordField(false);

    setTimeout(() => {
      console.log("dados do usuário", data);

      setIsSending(false);
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
   * @description Essa função é disparada sempre que o usuário insere um caractere no campo.
   * Nós enviamos as regras e a senha atual para ser comparada e o retorno nós atualizamos a UI.
   * @param password senha inputada no form.
   * @author Felipe Baptistella
   */
  function checkPassword(password: string): void {
    const passwordRulesUpdated = validatePassword(
      MOCK_PASSWORD_RULES,
      password
    );

    setPasswordRules(passwordRulesUpdated);
  }

  /**
   * @description Formata o nome da pessoa.
   * Recebe o nome inputado e torna a primeira letra uppercase e as demais lowercase.
   * @param first_name Nome.
   * @author Felipe Baptistella
   */
  function handleFirstName(first_name: string) {
    let firstNameNormalized = clearFirstName(first_name);

    if (!firstNameNormalized.length) return "";

    firstNameNormalized =
      firstNameNormalized.charAt(0).toUpperCase() +
      firstNameNormalized.slice(1).toLocaleLowerCase();

    return firstNameNormalized;
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-4 max-w-sm mb-6"
    >
      <div className="flex flex-col ">
        <div
          className={`rounded-md shadow border-[0.5px] border-neutral-200 dark:border-neutral-700 ${
            isSending && "cursor-not-allowed"
          }`}
        >
          <FieldGroup className="gap-0 w-full">
            <Controller
              name="first_name"
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
                      <Fingerprint
                        strokeWidth={1.7}
                        className="size-4 text-neutral-400"
                      />
                    </InputGroupAddon>

                    <div className="flex flex-col justify-start items-start w-full h-full">
                      <Label
                        htmlFor={field.name}
                        className="pl-3 text-[8px] uppercase font-normal text-neutral-400 pt-2 -mb-3"
                      >
                        {tg("first_name")}
                      </Label>

                      <InputGroupInput
                        className="text-sm"
                        {...field}
                        onKeyDown={blockSpace}
                        onChange={(e) => {
                          const firstName = handleFirstName(e.target.value);
                          field.onChange(firstName);
                        }}
                        aria-required={true}
                        id={field.name}
                        placeholder={`Ex: ${tg(
                          "input_first_name_placeholder"
                        )}`}
                        type="text"
                        inputMode="text"
                        autoComplete="off"
                        autoFocus={false}
                        disabled={isSending}
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
                  <InputGroup className="rounded-none border-transparent h-13  has-[[data-slot=input-group-control]:focus-visible]:bg-neutral-100/60 group dark:has-[[data-slot=input-group-control]:focus-visible]:bg-neutral-700/50  focus-anfitrion-effect has-[[data-slot][aria-invalid=true]]:border-transparent">
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
                        onKeyDown={blockSpace}
                        aria-required={true}
                        id={field.name}
                        placeholder={`${tg("input_email_placeholder")}`}
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        autoFocus={false}
                        disabled={isSending}
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
                        {tg("password")}
                      </Label>

                      <InputGroupInput
                        {...field}
                        onKeyDown={blockSpace}
                        onChange={(e) => {
                          field.onChange(e);
                          checkPassword(e.target.value);
                        }}
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
                        disabled={isSending}
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
                            disabled={isSending}
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
          </FieldGroup>
        </div>

        <PasswordRulesListComp passwordRules={passwordRules} />

        <FieldGroup className="gap-0 w-full bg-neutral-100 dark:bg-neutral-800 p-4 rounded-md">
          <Controller
            name="accept_terms"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field
                data-invalid={
                  fieldState.invalid &&
                  fieldState.isTouched &&
                  fieldState.isDirty
                }
              >
                <div className="flex items-start gap-3">
                  <Checkbox
                    autoFocus={false}
                    checked={field.value === true}
                    onCheckedChange={(checked) =>
                      field.onChange(checked === true)
                    }
                    id={field.name}
                    aria-required={true}
                    disabled={isSending}
                    aria-invalid={
                      fieldState.invalid &&
                      fieldState.isTouched &&
                      fieldState.isDirty
                    }
                    className="bg-white aria-checked:bg-green-main! aria-checked:border-green-main! data-[state=checked]:text-white!"
                  />

                  <div className="grid">
                    <Label
                      htmlFor={field.name}
                      className="text-xs text-neutral-700 dark:text-neutral-200"
                    >
                      {t("terms_label")}
                    </Label>

                    <p className="text-muted-foreground text-xs dark:text-neutral-400 mt-3 text-balance font-light">
                      {t("terms_text")}
                    </p>

                    <Dialog>
                      <DialogTrigger
                        className="text-green-main group-hover:text-green-dark-main underline underline-offset-3 cursor-pointer lower-case hover:opacity-50 transition-opacity duration-300 text-left text-xs min-h-0 h-auto"
                        title={t("terms_label")}
                      >
                        {t("terms_label")}
                      </DialogTrigger>
                      <DialogContent
                        forceMount={true}
                        className="dark:bg-neutral-900 border-[0.5px] border-neutral-200 dark:border-neutral-700"
                      >
                        <TermsComp />
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </Field>
            )}
          />
        </FieldGroup>

        <Button
          type="submit"
          asChild
          title={isSending ? tg("registering") : tg("register")}
          aria-label={`${tg("register")}`}
          disabled={isSending || !formState.isValid}
          className="mt-6 mb-3 w-full transition-none rounded-full cursor-pointer dark:text-white dark:shadow-none main-btn font-normal text-xs"
        >
          <motion.button whileTap={{ scale: 0.95 }}>
            {isSending ? (
              <>
                <Spinner /> {tg("registering")}
              </>
            ) : (
              <>
                {tg("register")} <Send />
              </>
            )}
          </motion.button>
        </Button>

        <Button
          asChild
          title={`${t("already_has_account")} ${t("access")}`}
          className="text-xs m-0 p-0 font-normal group no-underline hover:no-underline hover:opacity-50 h-auto min-h-0 text-neutral-700 dark:text-neutral-100 transition-none"
          variant="link"
          type="button"
        >
          <Link
            href={"/login"}
            className={` transition-opacity transition-300`}
          >
            {t("already_has_account")}
            <span className=" text-green-main group-hover:text-green-dark-main underline underline-offset-3 cursor-pointer -ml-1 lower-case">
              {t("access")}
            </span>
          </Link>
        </Button>
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
          <AccountCreatedComp />
        </DialogContent>
      </Dialog>
    </form>
  );
}
