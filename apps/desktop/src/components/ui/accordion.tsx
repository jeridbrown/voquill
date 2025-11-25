import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "./utils/cn";

interface AccordionItemProps {
  title: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

export const AccordionItem = ({
  title,
  children,
  defaultOpen = false,
  className,
}: AccordionItemProps) => {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  return (
    <div className={cn("border rounded-lg", className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between p-4 text-left font-medium hover:bg-muted/50 transition-colors"
      >
        <span>{title}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>
      <div
        className={cn(
          "grid transition-all duration-200",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <div className="p-4 pt-0 text-sm text-muted-foreground">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
