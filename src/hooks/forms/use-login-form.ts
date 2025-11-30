import { LanguageAsLocale } from "@/shared/types/language.type";
import { setZodGlobalLocale } from "@/shared/utils/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale } from "next-intl";
import { useForm } from "react-hook-form";
import * as z from "zod";

export function useLoginForm() {
  const locale = useLocale() as LanguageAsLocale;

  setZodGlobalLocale(locale);

  const formSchema = z.object({
    email: z.email().nonempty(),
    password: z.string().min(6).nonempty(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { formState } = form;

  return { formSchema, form, formState };
}
