import * as React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "./utils/cn";
import { type ButtonVariant, type ButtonSize } from "./types";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

const buttonVariants: Record<ButtonVariant, string> = {
  default: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  primary: "bg-primary text-primary-foreground hover:bg-primary/90",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  destructive:
    "bg-destructive text-destructive-foreground hover:bg-destructive/90",
  ghost: "hover:bg-accent hover:text-accent-foreground",
  outline:
    "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
};

const buttonSizes: Record<ButtonSize, string> = {
  sm: "h-9 rounded-md px-3 text-xs",
  md: "h-10 rounded-md px-4 py-2 text-sm",
  lg: "h-11 rounded-md px-8 text-base",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "md",
      loading = false,
      icon,
      iconPosition = "left",
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        className={cn(
          "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          buttonVariants[variant],
          buttonSizes[size],
          className
        )}
        ref={ref}
        disabled={isDisabled}
        {...props}
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {!loading && icon && iconPosition === "left" && icon}
        {children}
        {!loading && icon && iconPosition === "right" && icon}
      </button>
    );
  }
);

Button.displayName = "Button";
