import * as React from "react";
import { cn } from "./utils/cn";
import { type InputSize } from "./types";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  inputSize?: InputSize;
}

const inputSizes: Record<InputSize, string> = {
  sm: "h-8 px-2 py-1 text-xs",
  md: "h-10 px-3 py-2 text-sm",
  lg: "h-12 px-4 py-3 text-base",
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, inputSize = "md", disabled, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex w-full rounded-md border bg-background ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          error
            ? "border-destructive focus-visible:ring-destructive"
            : "border-input",
          inputSizes[inputSize],
          className
        )}
        ref={ref}
        disabled={disabled}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
