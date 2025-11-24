import * as React from "react";
import { forwardRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "../ui/utils/cn";

type HoverButtonProps = {
  idle?: React.ReactNode;
  hover?: React.ReactNode;
  hovered?: boolean;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  left?: boolean;
};

const HoverButton = ({ idle, hover, hovered, onClick, left }: HoverButtonProps) => {
  const hoverState = hovered && hover;

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    onClick?.(event);
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return (
    <div className={cn("flex-shrink-0 inline-flex", left ? "mr-2" : "ml-2")}>
      <span className="text-sm font-bold flex items-center">
        <div className={cn(hoverState ? "hidden" : "inline-flex")}>{idle}</div>
        <div
          onClick={handleClick}
          onMouseDown={handleMouseDown}
          className={cn(
            "inline-flex items-center justify-center rounded-full p-1 hover:bg-accent -my-2 cursor-pointer",
            left ? "-ml-3" : "-mr-3",
            hoverState ? "inline-flex" : "hidden"
          )}
        >
          {hover}
        </div>
      </span>
    </div>
  );
};

export type ListTileProps = {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  trailing?: React.ReactNode;
  trailingHover?: React.ReactNode;
  trailingOnClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  leading?: React.ReactNode;
  leadingHover?: React.ReactNode;
  leadingOnClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  selected?: boolean;
  className?: string;
  href?: string;
  disabled?: boolean;
};

export const ListTile = forwardRef<HTMLDivElement, ListTileProps>(
  (
    {
      title,
      subtitle,
      trailing,
      trailingHover,
      trailingOnClick,
      leading,
      leadingHover,
      leadingOnClick,
      onClick,
      selected = false,
      className,
      href,
      disabled,
    },
    ref
  ) => {
    const [hovered, setHovered] = useState(false);
    const nav = useNavigate();

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
      if (href) {
        if (event.metaKey || event.ctrlKey) {
          window.open(href, "_blank");
        } else {
          event.preventDefault();
          nav(href);
        }
      }
      onClick?.(event);
    };

    return (
      <div
        ref={ref}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={className}
      >
        <div
          onClick={disabled ? undefined : handleClick}
          className={cn(
            "flex items-center w-full px-4 py-2 cursor-pointer transition-colors rounded-md",
            selected
              ? "bg-gray-700 text-white hover:bg-gray-700"
              : "hover:bg-gray-200",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          <div className="flex flex-row items-center w-full">
            {Boolean(leading) && (
              <HoverButton
                idle={leading}
                hover={leadingHover}
                hovered={hovered}
                onClick={leadingOnClick}
                left={true}
              />
            )}
            <div className="flex-grow overflow-hidden">
              <div className="overflow-hidden text-ellipsis whitespace-nowrap">
                {title}
              </div>
              {subtitle && (
                <div className="text-sm text-muted-foreground">{subtitle}</div>
              )}
            </div>
            {Boolean(trailing) && (
              <HoverButton
                idle={trailing}
                hover={trailingHover}
                hovered={hovered}
                onClick={trailingOnClick}
                left={false}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
);
