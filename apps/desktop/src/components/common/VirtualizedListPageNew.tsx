import { lerp } from "@repo/utilities";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import { Virtuoso, type VirtuosoProps } from "react-virtuoso";
import { cn } from "../ui/utils/cn";

const COLLAPSE_DISTANCE_PX = 96;
const TITLE_FONT_SIZE_EXPANDED = 34;
const TITLE_FONT_SIZE_COLLAPSED = 22;

export type VirtualizedListPageProps<Item> = {
  title: ReactNode;
  action?: ReactNode;
  subtitle?: ReactNode;
  items: readonly Item[];
  renderItem: (item: Item, index: number) => ReactNode;
  computeItemKey?: (item: Item, index: number) => string | number;
  headerMaxWidth?: "sm" | "md" | "lg";
  contentMaxWidth?: "sm" | "md" | "lg";
  heightMult?: number;
  emptyState?: ReactNode;
  virtuosoProps?: Omit<
    VirtuosoProps<Item, unknown>,
    | "data"
    | "itemContent"
    | "components"
    | "scrollerRef"
    | "style"
    | "computeItemKey"
  >;
};

const maxWidthClasses = {
  sm: "max-w-2xl",
  md: "max-w-4xl",
  lg: "max-w-6xl",
};

export function VirtualizedListPage<Item>({
  title,
  action,
  subtitle,
  items,
  renderItem,
  computeItemKey,
  headerMaxWidth = "sm",
  contentMaxWidth = "sm",
  virtuosoProps,
  heightMult = 3,
  emptyState,
}: VirtualizedListPageProps<Item>) {
  const [scrollerNode, setScrollerNode] = useState<HTMLElement | Window | null>(
    null
  );
  const [collapseProgress, setCollapseProgress] = useState(0);

  useEffect(() => {
    if (!scrollerNode || scrollerNode instanceof Window) {
      return;
    }

    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId !== null) {
        return;
      }

      rafId = requestAnimationFrame(() => {
        const progress = Math.min(
          scrollerNode.scrollTop / COLLAPSE_DISTANCE_PX,
          1
        );
        setCollapseProgress(progress);
        rafId = null;
      });
    };

    handleScroll();
    scrollerNode.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      scrollerNode.removeEventListener("scroll", handleScroll);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [scrollerNode]);

  const handleScrollerRef = useCallback((node: HTMLElement | Window | null) => {
    setScrollerNode(node);
  }, []);

  const headerPaddingTop = 1 - collapseProgress;
  const headerPaddingBottom = 1 + (1 - collapseProgress) * 1;
  const headerGap = 1 + (1 - collapseProgress);
  const titleFontSizePx =
    TITLE_FONT_SIZE_EXPANDED -
    (TITLE_FONT_SIZE_EXPANDED - TITLE_FONT_SIZE_COLLAPSED) * collapseProgress;
  const subtitleOpacity = Math.min(lerp(0, 1, 1 - collapseProgress * 2), 1);
  const headerShrinkAmount = COLLAPSE_DISTANCE_PX * (1 - collapseProgress);

  return (
    <div className="flex-grow flex flex-col h-full overflow-hidden">
      <div
        className="pr-8 backdrop-blur-sm sticky top-0 z-10"
        style={{
          paddingTop: `${headerPaddingTop * 16}px`,
          paddingBottom: `${headerPaddingBottom * 16}px`,
        }}
      >
        <div
          className={cn("mx-auto flex flex-col", maxWidthClasses[headerMaxWidth])}
          style={{ gap: `${headerGap * 8}px` }}
        >
          <div className="flex flex-row gap-4 items-start justify-between">
            <h1
              className="font-bold"
              style={{
                fontSize: `${titleFontSizePx}px`,
                lineHeight: `${titleFontSizePx * 1.15}px`,
              }}
            >
              {title}
            </h1>
            {action}
          </div>
          {subtitle ? (
            <div
              className="text-base text-muted-foreground"
              style={{
                opacity: subtitleOpacity,
              }}
            >
              {subtitle}
            </div>
          ) : null}
        </div>
      </div>
      {items.length === 0 ? (
        <div className="flex-1 flex items-center justify-center overflow-auto">
          <div className={cn("pb-32 mx-auto", maxWidthClasses[contentMaxWidth])}>
            {emptyState || (
              <div className="flex flex-col gap-2 items-center">
                <h2 className="text-xl font-semibold text-muted-foreground">
                  It's quiet in here
                </h2>
                <p className="text-sm text-muted-foreground">
                  There are no items to display.
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <Virtuoso
          data={items}
          style={{ flex: 1 }}
          scrollerRef={handleScrollerRef}
          computeItemKey={
            computeItemKey
              ? (index, item) => computeItemKey(item, index)
              : undefined
          }
          components={{
            Header: () => <div style={{ height: 0 }} />,
          }}
          itemContent={(index, item) => (
            <div className={cn("mx-auto", maxWidthClasses[contentMaxWidth])}>
              <div>{renderItem(item, index)}</div>
            </div>
          )}
          {...(virtuosoProps ?? {})}
        />
      )}
    </div>
  );
}
