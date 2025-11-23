import * as React from "react";

export type PageLayoutProps = {
  header: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

/**
 * Full-height page layout with fixed header and scrollable content.
 * Replaces MUI Stack-based PageLayout with Tailwind CSS.
 */
export const PageLayout = ({ header, footer, children }: PageLayoutProps) => (
  <div className="flex flex-col w-full h-full overflow-hidden overscroll-none">
    {/* Fixed Header */}
    <div className="flex-shrink-0 overscroll-contain">{header}</div>

    {/* Scrollable Content Area */}
    <div className="flex-grow overflow-y-auto">
      {children}
      {footer}
    </div>
  </div>
);
