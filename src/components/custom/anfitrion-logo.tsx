import { cn } from "@/lib/utils";

export const AnfitrionLogoComp = ({ classNames }: { classNames?: string }) => {
  return (
    <div>
      <p
        className={cn(
          "text-neutral-700 dark:text-white font-baloo font-thin text-sm",
          classNames
        )}
      >
        anfitri<span className="text-green-anfitrion font-bold">on</span>
      </p>
    </div>
  );
};
