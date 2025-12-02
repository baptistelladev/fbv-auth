import Link from "next/link";
import { Button } from "../ui/button";
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { IconFrameComp } from "../custom/icon-frame";
import { UserRoundPlus } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export default function AccountCreatedComp() {
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
            <UserRoundPlus
              strokeWidth={1.2}
              className="text-muted-foreground size-5 md:size-6 -mt-1 -mr-1"
            />
          </IconFrameComp>
        </div>
        <DialogTitle className="font-nunito font-bold text-2xl text-center dark:text-neutral-100">
          {tc("account_created.title")}
        </DialogTitle>
        <DialogDescription className="sr-only">
          {tc("account_created.description")}
        </DialogDescription>
      </DialogHeader>
      <div className="flex items-center gap-2 pt-4 pb-6 text-center">
        <p className="text-sm text-neutral-700 font-light dark:text-neutral-300">
          {tc("account_created.content")}
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
