import { LogIn } from "lucide-react";
import { Metadata } from "next";
import { LoginForm } from "./components/LoginForm";
import { IconFrameComp } from "@/components/custom/icon-frame";
import { useFormatter, useTranslations } from "next-intl";

// META TAGS
export const metadata: Metadata = {
  title: "Login | Entre com a sua conta",
};

// PÁGINA
export default function LoginPage() {
  const t = useTranslations("LOGIN_PAGE");

  const sectionTitle = t.rich("section_title", {
    b: (chunks) => <b className="font-bold">{chunks}</b>,
  });

  return (
    <section className="login-page-wrapper w-full">
      <div className="max-w-md m-auto flex items-center justify-center flex-col">
        <IconFrameComp>
          <LogIn
            strokeWidth={1.2}
            className="text-muted-foreground size-5 md:size-6"
          />
        </IconFrameComp>

        <div className="text-center mt-3">
          <h1 className="text-2xl md:text-3xl font-nunito text-neutral-700 dark:text-neutral-100 font-light">
            {sectionTitle}
          </h1>
          <p className="text-sm font-light text-muted-foreground">
            Insira suas informações de login.
          </p>
        </div>

        <div className="flex flex-col gap-3 pt-6 w-full max-w-xs">
          <LoginForm />
        </div>
      </div>
    </section>
  );
}
