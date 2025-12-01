import Link from "next/link";
import { Button } from "../ui/button";
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useTranslations } from "next-intl";

export default function TermsComp() {
  // HOOKS
  const tc = useTranslations("COMPONENTS.dialogs");
  const tg = useTranslations("GENERAL");

  return (
    <div>
      <DialogHeader>
        <DialogTitle className="font-nunito font-bold text-2xl">
          {tc("terms.title")}
        </DialogTitle>
        <DialogDescription className="sr-only">
          {tc("terms.description")}
        </DialogDescription>
      </DialogHeader>
      <div className="flex items-center gap-2 pt-4 pb-6">
        <p className="text-sm text-neutral-700 font-light">
          {tc.rich("terms.content", {
            name: "Felipe Baptistella",
            link: (chunks) => (
              <Link
                href="https://www.linkedin.com/in/felipebaptistellavieira/"
                title="Felipe Baptistella"
                className="font-semibold text-green-main underline underline-offset-2"
                target="_blank"
              >
                {chunks}
              </Link>
            ),
          })}
        </p>
      </div>
      <DialogFooter className="sm:justify-start">
        <DialogClose asChild>
          <Button type="button" className="text-xs bg-neutral-800">
            {tg("close")}
          </Button>
        </DialogClose>
      </DialogFooter>
    </div>
  );
}
