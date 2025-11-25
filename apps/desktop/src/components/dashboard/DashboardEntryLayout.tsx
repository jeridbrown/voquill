import { cn } from "../ui/utils/cn";

export type DashboardEntryLayoutProps = {
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl";
};

const maxWidthMap = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
};

export const DashboardEntryLayout = ({
  children,
  maxWidth = "sm",
}: DashboardEntryLayoutProps) => {
  return (
    <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden pr-4">
      <div
        className={cn(
          "flex flex-col pt-2 pb-16 w-full mx-auto",
          maxWidthMap[maxWidth]
        )}
      >
        {children}
      </div>
    </div>
  );
};
