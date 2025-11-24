import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cn } from "./utils/cn";

export interface LabelProps
  extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> {
  required?: boolean;
  error?: boolean;
}

export const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  LabelProps
>(({ className, required, error, children, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(
      "text-sm font-medium leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      error && "text-destructive",
      className
    )}
    {...props}
  >
    {children}
    {required && <span className="ml-1 text-destructive">*</span>}
  </LabelPrimitive.Root>
));

Label.displayName = LabelPrimitive.Root.displayName;
