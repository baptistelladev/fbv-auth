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
export function useForgotPassword() {
  const locale = useLocale() as LanguageAsLocale;

  setZodGlobalLocale(locale);

  const formSchema = z.object({
    email: z.email().nonempty().toLowerCase(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
    },
  });

  const { formState } = form;

  return { formSchema, form, formState };
}
