import { TriangleAlert } from "lucide-react";
import { useTranslations } from "next-intl";
import { InputGroupAddon } from "../ui/input-group";
import { cn } from "@/lib/utils";

// INTERFACE
interface Props {
  showErrorWhen: boolean;
  classNames?: string;
}

export default function InputErrorComp({ showErrorWhen, classNames }: Props) {
  // HOOKS
  const tg = useTranslations("GENERAL");

  return (
    showErrorWhen && (
      <InputGroupAddon
        align={"inline-end"}
        className={cn("inline-end", classNames)}
      >
        <TriangleAlert
          role="img"
          aria-label={tg("invalid_information")}
          data-invalid={showErrorWhen}
          strokeWidth={1.5}
          className="text-destructive! size-4"
        />
      </InputGroupAddon>
    )
  );
}
