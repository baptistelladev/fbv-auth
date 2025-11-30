import { LanguageAsLocale } from "@/shared/types/language.type";
import { setZodGlobalLocale } from "@/shared/utils/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale } from "next-intl";
import { useForm } from "react-hook-form";
import * as z from "zod";

export function useForgotPassword() {
  const locale = useLocale() as LanguageAsLocale;

  setZodGlobalLocale(locale);

  const formSchema = z.object({
    email: z.email().nonempty(),
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
