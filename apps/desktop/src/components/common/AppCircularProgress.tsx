import { CircularProgress } from "../ui/progress";
import { cn } from "../ui/utils/cn";

export type AppCircularProgressProps = {
  size?: number;
  value?: number;
  className?: string;
};

export const AppCircularProgress = ({
  size,
  value,
  className,
}: AppCircularProgressProps) => {
  return (
    <CircularProgress
      size={size}
      value={value}
      className={cn(className)}
    />
  );
};
