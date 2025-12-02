import { Asterisk, AsteriskSquare, MailSearch } from "lucide-react";
import Link from "next/link";
import { IconFrameComp } from "../custom/icon-frame";
import { Button } from "../ui/button";
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export default function ResetPasswordAlertComp() {
  // HOOKS
  const tc = useTranslations("COMPONENTS.dialogs");
  const tg = useTranslations("GENERAL");
  const router = useRouter();

  /**
   * @description Função para retornar a página principal (login).
   * @author Felipe Baptistella
   */
  function goToLoginPage() {
    router.push("/login");
  }

  return (
    <div>
      <DialogHeader>
        <div className="flex justify-center items-center">
          <IconFrameComp>
            <AsteriskSquare
              strokeWidth={1.2}
              className="text-muted-foreground size-5 md:size-6 "
            />
          </IconFrameComp>
        </div>
        <DialogTitle className="font-nunito font-bold text-2xl text-center">
          {tc("password_reseted.title")}
        </DialogTitle>
        <DialogDescription className="sr-only">
          {tc("password_reseted.description")}
        </DialogDescription>
      </DialogHeader>
      <div className="flex items-center gap-2 pt-4 pb-6 text-center">
        <p className="text-sm text-neutral-700 font-light">
          {tc("password_reseted.content")}
        </p>
      </div>
      <DialogFooter className="sm:justify-start">
        <DialogClose asChild>
          <Button
            type="button"
            className="text-xs bg-neutral-800 md:m-auto dark:bg-neutral-200"
            onClick={() => goToLoginPage()}
          >
            {tg("close")}
          </Button>
        </DialogClose>
      </DialogFooter>
    </div>
  );
}
