import { IconFrameComp } from "@/components/custom/icon-frame";
import SectionTitleNdeskComp from "@/components/custom/section-title-n-desc";
import { SignUpFormComp } from "@/components/forms/sign-up-form";
import { UserRoundPlus } from "lucide-react";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

// META
export async function generateMetadata() {
  const t = await getTranslations("SIGN_UP_PAGE");

  return {
    title: `${t("page_title")} | ${t("page_description")}`,
  };
}

// PÁGINA
export default function CriarContaPage() {
  // HOOKS
  const t = useTranslations("SIGN_UP_PAGE");

  return (
    <main
      aria-labelledby={"sign-up-form-title"}
      className="sign-up-page-wrapper w-full"
    >
      <section className="max-w-md m-auto flex items-center justify-center flex-col">
        <IconFrameComp>
          <UserRoundPlus
            strokeWidth={1.2}
            className="text-muted-foreground size-5 md:size-6 "
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
          <SignUpFormComp />
        </div>
      </section>
    </main>
  );
}
