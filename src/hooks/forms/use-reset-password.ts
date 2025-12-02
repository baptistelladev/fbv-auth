import { regexList } from "@/shared/maps/regex-list.map";
import { LanguageAsLocale } from "@/shared/types/language.type";
import { setZodGlobalLocale } from "@/shared/utils/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale } from "next-intl";
import { useForm } from "react-hook-form";
import * as z from "zod";

/**
 * @description Disponibiliza Schema e inicializa formulário de reset de senha.
 * @returns Retorna o FormSchema, o formulário e o state.
 * @author Felipe Baptistella
 */
export function useResetPasswordForm() {
  const locale = useLocale() as LanguageAsLocale;

  setZodGlobalLocale(locale);

  const formSchema = z
    .object({
      password: z
        .string()
        .refine((value) => regexList.hasSixDigits.test(value), {
          message: "Pelo menos 6 caracteres",
        })
        .refine((value) => regexList.hasUpper.test(value), {
          message: "Pelo menos 1 letra maiúscula",
        })
        .refine((value) => regexList.hasLower.test(value), {
          message: "Pelo menos 1 letra minúscula",
        })
        .refine((value) => regexList.hasNumber.test(value), {
          message: "Pelo menos 1 número",
        })
        .refine((value) => regexList.hasSpecial.test(value), {
          message: "Pelo menos 1 caractere especial",
        }),
      confirmPassword: z.string(),
    })
    .refine(
      (data) => {
        return data.password === data.confirmPassword;
      },
      {
        message: "Senhas não coincidem",
        path: ["confirmPassword"],
      }
    );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const { formState } = form;

  return { formSchema, form, formState };
}
