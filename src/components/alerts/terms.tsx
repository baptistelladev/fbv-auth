import React from "react";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { DialogContent } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";
import Link from "next/link";

export default function TermsComp() {
  return (
    <div>
      <DialogHeader>
        <DialogTitle className="font-nunito font-bold text-2xl">
          A partir daqui é com você.
        </DialogTitle>
        <DialogDescription className="sr-only">
          Foi um prazer poder te ajudar.
        </DialogDescription>
      </DialogHeader>
      <div className="flex items-center gap-2 pt-4 pb-6">
        <p className="text-sm text-neutral-700 font-light">
          Alô @dev. Eu sou o{" "}
          <Link
            href="https://www.linkedin.com/in/felipebaptistellavieira/"
            title="Felipe Baptistella"
            className="font-semibold text-green-anfitrion underline underline-offset-2"
            target="_blank"
          >
            Felipe Baptistella
          </Link>
          , desenvolvedor de Front-end há mais de 7 anos e criei este template
          de autenticação como uma forma de retribuição para a comunidade dev.
        </p>
      </div>
      <DialogFooter className="sm:justify-start">
        <DialogClose asChild>
          <Button type="button" className="text-xs bg-neutral-800">
            Fechar
          </Button>
        </DialogClose>
      </DialogFooter>
    </div>
  );
}
