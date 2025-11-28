import { ReactNode } from "react";

// INTERFACE
type Props = {
  title?: string | ReactNode;
  desc?: string;
};

export default function SectionTitleNdeskComp({ title, desc }: Props) {
  return (
    <div>
      {title && (
        <h1 className="text-2xl md:text-3xl font-nunito text-neutral-700 dark:text-neutral-100 font-light">
          {title}
        </h1>
      )}
      {desc && (
        <p className="text-sm font-light text-muted-foreground">{desc}</p>
      )}
    </div>
  );
}
