import { type ReactNode } from "react";

export type CenterMessageProps = {
  title: ReactNode;
  subtitle?: ReactNode;
  action?: ReactNode;
};

export function CenterMessage({ title, subtitle, action }: CenterMessageProps) {
  return (
    <div className="flex-1 min-h-full flex justify-center items-center px-4 py-32">
      <div className="max-w-sm w-full">
        <div className="flex flex-col items-center gap-4 pb-32">
          <h2 className="text-2xl font-semibold text-center">
            {title}
          </h2>
          {subtitle && (
            <div className="text-base text-muted-foreground text-center">
              {subtitle}
            </div>
          )}
          {action}
        </div>
      </div>
    </div>
  );
}
