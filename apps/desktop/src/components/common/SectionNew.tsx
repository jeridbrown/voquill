import * as React from "react";
import { Square, CheckSquare } from "lucide-react";
import { FormattedMessage } from "react-intl";
import { isDefined } from "@repo/utilities";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

type SectionProps = {
  title: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  enabled?: boolean;
  onToggleEnable?: () => void;
  blocked?: boolean;
  blockedReason?: React.ReactNode;
};

export const Section = ({
  title,
  description,
  children,
  enabled,
  onToggleEnable,
  blocked,
  blockedReason,
}: SectionProps) => {
  const fieldEnabled = !blocked && (enabled ?? true);
  const headerEnabled = !blocked;

  const content = (
    <div className="mb-16">
      {/* Header with title and optional enable/disable toggle */}
      <div
        className="flex flex-row items-center"
        style={{ opacity: headerEnabled ? 1 : 0.3 }}
      >
        <h6 className="text-lg font-bold">{title}</h6>
        {isDefined(enabled) && (
          <div className="ml-2 pt-1 cursor-pointer" onClick={onToggleEnable}>
            {enabled ? (
              <CheckSquare className="h-5 w-5" />
            ) : (
              <Square className="h-5 w-5" />
            )}
          </div>
        )}
      </div>

      {/* Description and children */}
      <div style={{ opacity: fieldEnabled ? 1 : 0.3 }}>
        {description && (
          <p className="text-sm text-muted-foreground mt-2">{description}</p>
        )}
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );

  if (blocked) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span
              className="inline-block cursor-not-allowed pointer-events-none relative"
            >
              {content}
              <div className="absolute inset-0 cursor-not-allowed pointer-events-auto" />
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <>
              {blockedReason ?? (
                <FormattedMessage defaultMessage="This setting is not available." />
              )}
            </>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return content;
};
