import { cn } from "@/lib/utils";

// INTERFACE
type Props = {
  classNames?: string;
};

export const AnfitrionLogoComp = ({ classNames }: Props) => {
  return (
    <div>
      <p
        className={cn(
          "text-neutral-700 dark:text-white font-baloo font-thin text-sm ",
          classNames
        )}
      >
        anfitri<span className="text-green-anfitrion font-bold">on</span>
      </p>
    </div>
  );
};
