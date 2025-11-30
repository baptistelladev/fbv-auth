import React from "react";
import { InputGroupAddon } from "../ui/input-group";
import { TriangleAlert } from "lucide-react";

interface Props {
  showErrorWhen: boolean;
}

export default function InputErrorComp({ showErrorWhen }: Props) {
  return (
    showErrorWhen && (
      <InputGroupAddon align={"inline-end"} aria-hidden={true}>
        <TriangleAlert
          data-invalid={showErrorWhen}
          strokeWidth={1.7}
          className="text-destructive! size-4"
        />
      </InputGroupAddon>
    )
  );
}
