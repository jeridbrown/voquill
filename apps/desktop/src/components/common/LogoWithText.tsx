import { cn } from "../ui/utils/cn";
import { Logo } from "./Logo";

export type LogoWithTextProps = {
  className?: string;
};

export const LogoWithText = ({ className }: LogoWithTextProps) => {
  return (
    <div
      className={cn(
        "flex flex-row items-center select-none",
        className
      )}
    >
      <Logo className="mr-2" />
      <span className="text-xl font-bold select-none hidden sm:block">
        Voquill
      </span>
    </div>
  );
};
