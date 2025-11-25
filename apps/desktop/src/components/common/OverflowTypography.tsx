import { forwardRef, useEffect, useRef, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { cn } from "../ui/utils/cn";

type OverflowTypographyProps = {
  children?: React.ReactNode;
  maxRows?: number;
  className?: string;
};

export const OverflowTypography = forwardRef<
  HTMLDivElement,
  OverflowTypographyProps
>(({ maxRows = 1, className, children }, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [isOverflow, setIsOverflow] = useState(false);

  const getOverflow = () => {
    if (!containerRef.current || !textRef.current) return false;

    const containerHeight = containerRef.current.offsetHeight;
    const textHeight = textRef.current.offsetHeight;

    const containerWidth = containerRef.current.offsetWidth;
    const textWidth = textRef.current.offsetWidth;
    return textHeight > containerHeight || textWidth > containerWidth;
  };

  useEffect(() => {
    const containerResizeObserver = new ResizeObserver(() =>
      setIsOverflow(getOverflow())
    );
    const textResizeObserver = new ResizeObserver(() =>
      setIsOverflow(getOverflow())
    );

    if (containerRef.current)
      containerResizeObserver.observe(containerRef.current);
    if (textRef.current) textResizeObserver.observe(textRef.current);

    return () => {
      containerResizeObserver.disconnect();
      textResizeObserver.disconnect();
    };
  }, []);

  const textClasses =
    maxRows > 1
      ? cn("line-clamp-[var(--max-rows)]", className)
      : cn("overflow-hidden text-ellipsis whitespace-nowrap", className);

  const content = (
    <div className={className}>
      <div className="overflow-hidden relative" ref={containerRef}>
        <div className="invisible absolute top-0 left-0">
          <div ref={textRef}>{children}</div>
        </div>
        <div
          className={textClasses}
          ref={ref}
          style={{ "--max-rows": maxRows } as React.CSSProperties}
        >
          {children}
        </div>
      </div>
    </div>
  );

  if (!isOverflow) {
    return content;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{content}</TooltipTrigger>
        <TooltipContent>
          <span>{children}</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
});
