import React, { useEffect, useState } from "react";

export type SplitLayoutProps = {
  weights: number[];
  children: React.ReactNode;
};

export const SplitLayout = ({ weights, children }: SplitLayoutProps) => {
  const childArr = React.Children.toArray(children);
  const total = weights.reduce((sum, w) => (w > 0 ? sum + w : sum), 0);

  const [mounted, setMounted] = useState<boolean[]>(weights.map((w) => w > 0));

  useEffect(() => {
    setMounted((prev) => weights.map((w, i) => (w > 0 ? true : prev[i])));
  }, [weights]);

  const handleCollapseDone = (i: number) =>
    setMounted((prev) => prev.map((v, idx) => (idx === i ? false : v)));

  if (total === 0) return null;

  return (
    <div className="flex w-full h-full flex-grow flex-row items-stretch">
      {childArr.map((child, i) => {
        const w = weights[i] ?? 0;
        const pct = w > 0 ? (w / total) * 100 : 0;

        return (
          <div
            key={i}
            className="min-w-0 overflow-hidden flex flex-col transition-[width] duration-300 ease-in-out"
            style={{ width: `${pct}%` }}
            onTransitionEnd={(e) => {
              if (
                e.propertyName === "width" &&
                w === 0 &&
                (e.target as HTMLElement).getBoundingClientRect().width === 0
              ) {
                handleCollapseDone(i);
              }
            }}
          >
            {mounted[i] && child}
          </div>
        );
      })}
    </div>
  );
};
