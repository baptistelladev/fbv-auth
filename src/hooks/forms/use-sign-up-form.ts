import { regexList } from "@/shared/maps/regex-list.map";
import { LanguageAsLocale } from "@/shared/types/language.type";
import { setZodGlobalLocale } from "@/shared/utils/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale } from "next-intl";
import { useForm } from "react-hook-form";
import * as z from "zod";

/**
 * @description Disponibiliza Schema e inicializa formulário de criação de conta
 * @returns Retorna o FormSchema, o formulário e o state.
 * @author Felipe Baptistella
 */
export function useSignUpForm() {
  const locale = useLocale() as LanguageAsLocale;

  setZodGlobalLocale(locale);

  const formSchema = z.object({
    first_name: z
      .string()
      .min(3)
      .transform((value) => {
        return value.split(" ")[0].trim();
      }),
    email: z.email().nonempty().toLowerCase(),
    accept_terms: z.refine((value) => value),
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
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      first_name: "",
      email: "",
      password: "",
      accept_terms: false,
    },
  });

  const { formState } = form;

  return { formSchema, form, formState };
}
