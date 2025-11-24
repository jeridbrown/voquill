import * as React from "react";
import { cn } from "../ui/utils/cn";

export type DashboardEntryLayoutProps = {
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  className?: string;
};

const maxWidthClasses = {
  sm: "max-w-screen-sm",
  md: "max-w-screen-md",
  lg: "max-w-screen-lg",
  xl: "max-w-screen-xl",
  "2xl": "max-w-screen-2xl",
  full: "max-w-full",
};

export const DashboardEntryLayout = ({
  children,
  maxWidth = "sm",
  className,
}: DashboardEntryLayoutProps) => {
  return (
    <div
      className={cn(
        "flex-grow flex-shrink overflow-x-hidden",
        className
      )}
      style={{ overflowY: 'auto' }}
    >
      <div
        className={cn(
          "flex flex-col w-full pt-2 pb-16 pr-4",
          maxWidthClasses[maxWidth]
        )}
      >
        {children}
      </div>
    </div>
  );
};
