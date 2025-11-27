import { useTranslations } from "next-intl";
import React from "react";
import { Toaster } from "sonner";

export default function CustomToasterComp() {
  const tc = useTranslations("COMPONENTS");

  return (
    <Toaster
      containerAriaLabel={tc("sonner.notifications.aria-label")}
      toastOptions={{
        closeButtonAriaLabel: tc("sonner.notifications.close-aria-label"),
        className:
          "bg-white! dark:bg-neutral-800! text-neutral-700! dark:text-neutral-100! border-neutral-200! dark:border-neutral-600! dark:border-[0.5px]! shadow-sm! gap-2!",
        classNames: {
          title: "font-nunito text-green-anfitrion! font-bold!",
          description: "text-muted-foreground! text-xs mr-2!",
          icon: "text-neutral-700! dark:text-neutral-100!",
          closeButton:
            "bg-white! dark:bg-neutral-800! text-neutral-700! dark:text-neutral-100! border-neutral-200! dark:border-neutral-600! dark:border-[0.5px]! transition-none!",
        },
      }}
    />
  );
}
