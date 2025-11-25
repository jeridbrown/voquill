import AppLogo from "../../assets/app-logo.svg?react";
import { cn } from "../ui/utils/cn";

export type LogoProps = {
  className?: string;
  width?: string | number;
  height?: string | number;
};

export const Logo = ({
  className,
  width = "2.2rem",
  height = "2.2rem",
}: LogoProps) => {
  return (
    <AppLogo
      className={cn("text-primary", className)}
      width={width}
      height={height}
    />
  );
};
