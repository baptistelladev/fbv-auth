"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { useForgotPassword } from "@/hooks/forms/use-forgot-password-form";
import { AtSign, Send } from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";
import { Controller } from "react-hook-form";
import * as z from "zod";

export function ForgotPasswordComp() {
  const { form, formSchema, formState } = useForgotPassword();

  // TRADUÇÃO
  const t = useTranslations("FORGOT_PASSWORD_PAGE");
  const tg = useTranslations("GENERAL");
  const tl = useTranslations("LOGIN_PAGE");

  // STATES
  const [isRecovering, setIsRecovering] = useState(false);

  // FUNÇÕES

  /**
   * @description Enviar email para redefinição de senha.
   * @author Felipe Baptistella
   */
  function onSubmit(data: z.infer<typeof formSchema>) {
    setIsRecovering(true);
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-sm">
      <div className="flex flex-col ">
        <div
          className={`rounded-md shadow border-[0.5px] border-neutral-200 dark:border-neutral-700 ${
            isRecovering && "cursor-not-allowed"
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
                  <InputGroup className="rounded-md border-transparent h-13  has-[[data-slot=input-group-control]:focus-visible]:bg-neutral-100/60 group dark:has-[[data-slot=input-group-control]:focus-visible]:bg-neutral-700/50  focus-anfitrion-effect has-[[data-slot][aria-invalid=true]]:border-transparent! ">
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

                    <div className="flex flex-col justify-start items-start w-full h-full">
                      <Label
                        htmlFor={field.name}
                        className="pl-3 text-[8px] uppercase font-normal text-neutral-700 dark:text-neutral-100 pt-2 -mb-3"
                      >
                        {tg("email")}
                      </Label>

                      <InputGroupInput
                        className="text-sm"
                        {...field}
                        aria-required={true}
                        id={field.name}
                        placeholder={`${tg("input_email_placeholder")}`}
                        type="email"
                        inputMode="email"
                        autoComplete="off"
                        autoFocus={false}
                        disabled={isRecovering}
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
          </FieldGroup>
        </div>

        <Button
          type="submit"
          asChild
          title={isRecovering ? tg("sending") : tg("send")}
          aria-label={`${tg("send")}`}
          disabled={isRecovering || !formState.isValid}
          className="mt-6 mb-3 w-full transition-none rounded-full cursor-pointer dark:text-white dark:shadow-none main-btn font-normal text-xs "
        >
          <motion.button whileTap={{ scale: 0.95 }}>
            {isRecovering ? (
              <>
                <Spinner /> {tg("sending")}
              </>
            ) : (
              <>
                {tg("send")} <Send />
              </>
            )}
          </motion.button>
        </Button>

        <Button
          asChild
          title={`${tg("go_to")} ${tl("screen_description")}`}
          className="text-xs m-0 p-0 font-normal group no-underline hover:no-underline hover:opacity-50 h-auto min-h-0 text-neutral-700 dark:text-neutral-100 transition-none"
          variant="link"
          type="button"
        >
          <Link
            href={"/login"}
            className={` transition-opacity transition-300`}
          >
            {tg("go_to")}
            <span className=" text-green-anfitrion group-hover:text-green-dark-anfitrion underline underline-offset-3 cursor-pointer -ml-1 lower-case">
              {tl("screen_description")}
            </span>
          </Link>
        </Button>
      </div>
    </form>
  );
}
