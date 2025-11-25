import React, { useLayoutEffect, useRef, useState } from "react";
import { cn } from "../ui/utils/cn";

export type AppFabProps = {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  children?: React.ReactNode;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  variant?: "contained" | "outline";
  className?: string;
};

export const AppFab = ({
  onClick,
  disabled = false,
  children,
  leading,
  trailing,
  variant = "contained",
  className,
}: AppFabProps) => {
  const isOutline = variant === "outline";

  const labelRef = useRef<HTMLDivElement>(null);
  const [labelWidth, setLabelWidth] = useState<number>();

  useLayoutEffect(() => {
    if (!labelRef.current) {
      return;
    }

    const update = () => setLabelWidth(labelRef.current!.offsetWidth);

    update();
    const ro = new ResizeObserver(update);
    ro.observe(labelRef.current);
    return () => ro.disconnect();
  }, [children, leading, trailing]);

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "rounded-full px-4 py-3 font-medium shadow-lg transition-all duration-150 overflow-hidden inline-flex items-center justify-center",
        isOutline
          ? "border border-current bg-background text-primary hover:bg-muted"
          : "bg-primary text-primary-foreground hover:bg-primary/90",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      style={{ width: labelWidth }}
    >
      <div
        ref={labelRef}
        className="flex flex-row items-center gap-2 px-2 whitespace-nowrap"
      >
        {leading && <span className="flex">{leading}</span>}
        <span className="shrink-0">{children}</span>
        {trailing && <span className="flex">{trailing}</span>}
      </div>
    </button>
  );
};

export type AppFabPositionProps = {
  children?: React.ReactNode;
};

export const AppFabPosition = ({ children }: AppFabPositionProps) => {
  return (
    <div className="absolute bottom-8 right-8 flex flex-row justify-end items-center gap-4">
      {children}
    </div>
  );
};
