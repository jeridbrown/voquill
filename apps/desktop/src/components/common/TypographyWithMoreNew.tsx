import { useCallback, useEffect, useRef, useState } from "react";
import { FormattedMessage } from "react-intl";
import { Button } from "../ui/button";
import { cn } from "../ui/utils/cn";

type TypographyWithMoreProps = {
  children: React.ReactNode;
  maxLines?: number;
  initiallyExpanded?: boolean;
  moreLabel?: React.ReactNode;
  lessLabel?: React.ReactNode;
  className?: string;
  variant?: "body1" | "body2" | "caption";
};

const variantClasses = {
  body1: "text-base",
  body2: "text-sm",
  caption: "text-xs",
};

export function TypographyWithMore({
  children,
  maxLines = 3,
  initiallyExpanded = false,
  moreLabel = <FormattedMessage defaultMessage="Show more" />,
  lessLabel = <FormattedMessage defaultMessage="Show less" />,
  className,
  variant = "body2",
}: TypographyWithMoreProps) {
  const [expanded, setExpanded] = useState(initiallyExpanded);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const hiddenRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const measureOverflow = useCallback(() => {
    if (typeof window === "undefined" || !hiddenRef.current) {
      setIsOverflowing(false);
      return;
    }

    const hiddenNode = hiddenRef.current;
    const computedStyles = window.getComputedStyle(hiddenNode);
    const lineHeight = parseFloat(computedStyles.lineHeight || "0");

    if (!Number.isFinite(lineHeight) || lineHeight <= 0) {
      setIsOverflowing(false);
      return;
    }

    const collapsedHeight = lineHeight * maxLines;
    const fullHeight = hiddenNode.scrollHeight;
    setIsOverflowing(fullHeight - collapsedHeight > 1);
  }, [maxLines]);

  useEffect(() => {
    if (typeof ResizeObserver === "undefined") {
      measureOverflow();
      return;
    }

    const hiddenNode = hiddenRef.current;
    const containerNode = containerRef.current;
    if (!hiddenNode && !containerNode) {
      measureOverflow();
      return;
    }

    const observer = new ResizeObserver(() => measureOverflow());

    if (hiddenNode) {
      observer.observe(hiddenNode);
    }

    if (containerNode) {
      observer.observe(containerNode);
    }

    measureOverflow();

    return () => {
      observer.disconnect();
    };
  }, [measureOverflow]);

  useEffect(() => {
    measureOverflow();
  }, [measureOverflow, children]);

  const toggleExpanded = () => setExpanded((prev) => !prev);
  const shouldClamp = isOverflowing && !expanded;

  const clampStyle = shouldClamp
    ? {
        display: "-webkit-box",
        WebkitLineClamp: maxLines,
        WebkitBoxOrient: "vertical" as const,
        overflow: "hidden",
      }
    : {};

  return (
    <div>
      <div ref={containerRef} className="relative">
        <div
          className={cn(variantClasses[variant], className, shouldClamp && "pr-24")}
          style={clampStyle}
        >
          {children}
        </div>

        {isOverflowing && shouldClamp && (
          <Button
            size="sm"
            variant="ghost"
            onClick={toggleExpanded}
            className={cn(
              "absolute right-0 bottom-0 px-0 min-w-0 h-auto py-0 rounded-full",
              "bg-background shadow-[(-12px_0_12px_hsl(var(--background)))]",
              variantClasses[variant]
            )}
          >
            {moreLabel}
          </Button>
        )}

        {/* Hidden element for measuring */}
        <div
          className="invisible absolute pointer-events-none -z-10 left-0 right-0 w-full"
          ref={hiddenRef}
          aria-hidden
        >
          <div className={cn(variantClasses[variant], className)}>{children}</div>
        </div>
      </div>
      {isOverflowing && !expanded && (
        <Button
          size="sm"
          variant="ghost"
          onClick={toggleExpanded}
          className={cn("mt-1 px-0 ml-auto block", variantClasses[variant])}
        >
          {lessLabel}
        </Button>
      )}
    </div>
  );
}
