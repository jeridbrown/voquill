import { cn } from "../ui/utils/cn";
import { getPrettyKeyName } from "../../utils/keyboard.utils";

type HotkeyBadgeProps = {
  keys: string[];
  className?: string;
};

export const HotkeyBadge = ({ keys, className }: HotkeyBadgeProps) => {
  const label = keys.map(getPrettyKeyName).join(" + ");

  return (
    <span
      className={cn(
        "inline-flex items-center border border-border rounded-sm px-2 py-0.5 font-semibold bg-accent",
        className
      )}
    >
      {label}
    </span>
  );
};
