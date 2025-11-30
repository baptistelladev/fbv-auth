import { IconFrameComp } from "@/components/custom/icon-frame";
import { LoginFormComp } from "@/components/forms/login-form";
import SectionTitleNdeskComp from "@/components/custom/section-title-n-desc";
import { AtSign, LogIn } from "lucide-react";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { ForgotPasswordComp } from "@/components/forms/forgot-password-form";

// META
export async function generateMetadata() {
  const t = await getTranslations("FORGOT_PASSWORD_PAGE");

  return {
    title: `${t("page_title")} | ${t("page_description")}`,
  };
}

// PÁGINA
export default function EsqueciMinhaSenhaPage() {
  // HOOKS
  const t = useTranslations("FORGOT_PASSWORD_PAGE");

  return (
    <main
      aria-labelledby={"login-form-title"}
      className="login-page-wrapper w-full"
    >
      <section className="max-w-md m-auto flex items-center justify-center flex-col">
        <IconFrameComp>
          <AtSign
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
          <ForgotPasswordComp />
        </div>
      </section>
    </main>
  );
}
