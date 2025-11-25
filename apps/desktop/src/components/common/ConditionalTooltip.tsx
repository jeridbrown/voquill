import * as React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface ConditionalTooltipProps {
  enabled?: boolean;
  title: React.ReactNode;
  children: React.ReactNode;
}

export const ConditionalTooltip = ({
  enabled = true,
  title,
  children,
}: ConditionalTooltipProps) => {
  if (!enabled) {
    return <>{children}</>;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span>{children}</span>
        </TooltipTrigger>
        <TooltipContent>
          <span>{title}</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
