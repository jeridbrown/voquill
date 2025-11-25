import { ReactNode } from "react";
import { cn } from "../ui/utils/cn";

type SettingSectionProps = {
  title: ReactNode;
  description: ReactNode;
  action?: ReactNode;
  className?: string;
};

export const SettingSection = ({
  title,
  description,
  action,
  className,
}: SettingSectionProps) => {
  return (
    <div
      className={cn(
        "flex flex-row items-center justify-between gap-4",
        className
      )}
    >
      <div className="flex flex-col gap-1 flex-1">
        <div className="text-sm font-semibold">{title}</div>
        <div className="text-sm text-muted-foreground">{description}</div>
      </div>
      {action && <div>{action}</div>}
    </div>
  );
};
