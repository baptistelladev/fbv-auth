import { IconFrameComp } from "@/components/custom/icon-frame";
import { LogIn } from "lucide-react";
import { Metadata } from "next";
import { useTranslations } from "next-intl";
import { LoginForm } from "./components/LoginForm";
import SectionTitleNdeskComp from "@/components/custom/section-title-n-desc";

// META
export const metadata: Metadata = {
  title: "Login | Entre com a sua conta",
};

// PÁGINA
export default function LoginPage() {
  const t = useTranslations("LOGIN_PAGE");

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
          <SectionTitleNdeskComp
            title={t.rich("section_title", {
              b: (chunks) => <b className="font-bold">{chunks}</b>,
            })}
            desc={t("section_desc")}
          ></SectionTitleNdeskComp>
        </div>

        <div className="flex flex-col gap-3 pt-6 w-full max-w-xs">
          <LoginForm />
        </div>
      </div>
    </section>
  );
}
