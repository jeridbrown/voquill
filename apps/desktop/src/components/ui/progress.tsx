import * as React from "react";
import { cn } from "./utils/cn";

// Linear Progress Component
interface LinearProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  indeterminate?: boolean;
}

const LinearProgress = React.forwardRef<HTMLDivElement, LinearProgressProps>(
  ({ className, value, indeterminate = false, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-secondary",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "h-full bg-primary transition-all",
          indeterminate &&
            "absolute left-0 animate-[progress_1s_ease-in-out_infinite]"
        )}
        style={
          indeterminate
            ? undefined
            : { transform: `translateX(-${100 - (value || 0)}%)` }
        }
      />
    </div>
  )
);
LinearProgress.displayName = "LinearProgress";

// Circular Progress Component
interface CircularProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  size?: number;
  strokeWidth?: number;
  indeterminate?: boolean;
}

const CircularProgress = React.forwardRef<HTMLDivElement, CircularProgressProps>(
  (
    {
      className,
      value,
      size = 40,
      strokeWidth = 4,
      indeterminate = true,
      ...props
    },
    ref
  ) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = indeterminate
      ? 0
      : circumference - (value || 0) / 100 * circumference;

    return (
      <div
        ref={ref}
        className={cn("inline-block", className)}
        style={{ width: size, height: size }}
        {...props}
      >
        <svg
          className={cn(
            indeterminate && "animate-spin",
            "transform -rotate-90"
          )}
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
        >
          {/* Background circle */}
          <circle
            className="text-secondary"
            strokeWidth={strokeWidth}
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx={size / 2}
            cy={size / 2}
          />
          {/* Progress circle */}
          <circle
            className="text-primary transition-all duration-300 ease-in-out"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx={size / 2}
            cy={size / 2}
          />
        </svg>
      </div>
    );
  }
);
CircularProgress.displayName = "CircularProgress";

export { LinearProgress, CircularProgress };
