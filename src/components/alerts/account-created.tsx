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

export default function AccountCreatedComp() {
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
        <DialogTitle className="font-nunito font-bold text-2xl text-center">
          Conta criada com sucesso
        </DialogTitle>
        <DialogDescription className="sr-only">
          Enviamos um link para o seu e-mail
        </DialogDescription>
      </DialogHeader>
      <div className="flex items-center gap-2 pt-4 pb-6 text-center">
        <p className="text-sm text-neutral-700 font-light">
          Aqui você informará alguma coisa para o usuário que foi cadastrado.
        </p>
      </div>
      <DialogFooter className="sm:justify-start">
        <DialogClose asChild>
          <Button type="button" className="text-xs bg-neutral-800 md:m-auto">
            <Link href={"/login"}>Fechar</Link>
          </Button>
        </DialogClose>
      </DialogFooter>
    </div>
  );
}
