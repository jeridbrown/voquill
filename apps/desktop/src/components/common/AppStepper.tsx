import { Check } from "lucide-react";
import { isDefined } from "@repo/utilities";
import { cn } from "../ui/utils/cn";

export type AppStepperStep = {
  label: string;
  icon: React.ReactNode;
};

export type AppStepperProps = {
  index?: number;
  steps?: AppStepperStep[];
  className?: string;
  readyIndex?: number;
  onStepClick?: (stepIndex: number) => void;
};

export const AppStepper = ({
  index = 0,
  steps = [],
  className,
  readyIndex,
  onStepClick,
}: AppStepperProps) => {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      {steps.map((step, idx) => {
        const completed = idx < index;
        const active = idx === index;
        const clickable =
          onStepClick && (isDefined(readyIndex) ? idx <= readyIndex : true);
        const icon = completed ? <Check className="h-5 w-5" /> : step.icon;

        return (
          <div
            key={step.label}
            onClick={clickable ? () => onStepClick(idx) : undefined}
            className={cn(
              "flex items-center gap-4 py-3 px-4 rounded-full transition-all duration-200",
              clickable && "cursor-pointer hover:scale-105",
              !clickable && "opacity-20",
              active && "bg-primary text-primary-foreground px-6 py-4"
            )}
          >
            <span
              className={cn(
                "flex items-center justify-center transition-all duration-200",
                active && "scale-110"
              )}
            >
              {icon}
            </span>
            <span
              className={cn(
                "text-base transition-all duration-200",
                active && "text-lg font-semibold -ml-1"
              )}
            >
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};
