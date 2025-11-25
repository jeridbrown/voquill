import * as React from "react";
import { TableVirtuoso, type TableComponents } from "react-virtuoso";
import { ChevronUp, ChevronDown } from "lucide-react";
import { cn } from "../ui/utils/cn";

export type DivRowProps = React.HTMLAttributes<HTMLDivElement> & {
  "data-index"?: number;
};

export interface ColumnDef<T> {
  header: React.ReactNode | (() => React.ReactNode);
  cell: (row: T) => React.ReactNode;
  getSortKey?: (row: T) => string | number;
  weight?: number;
  width?: number;
}

const DefaultRow = React.forwardRef<HTMLDivElement, DivRowProps>(
  (props, ref) => (
    <div
      ref={ref}
      {...props}
      className={cn("flex border-b border-border", props.className)}
    />
  )
);

export interface AppTableProps<T> {
  rows: T[];
  columns: ColumnDef<T>[];
  height?: number;
  className?: string;
  RowComponent?: React.ForwardRefExoticComponent<
    React.PropsWithoutRef<DivRowProps> & React.RefAttributes<HTMLDivElement>
  >;
  footer?: React.ReactNode;
  defaultSortColumnIndex?: number;
  defaultSortDirection?: SortDirection;
}

type SortDirection = "asc" | "desc";

export function AppTable<T>({
  rows,
  columns,
  className,
  RowComponent,
  footer,
  defaultSortColumnIndex,
  defaultSortDirection = "asc",
}: AppTableProps<T>) {
  const [sortIdx, setSortIdx] = React.useState<number | null>(
    defaultSortColumnIndex ?? null
  );
  const [direction, setDirection] =
    React.useState<SortDirection>(defaultSortDirection);

  const handleHeaderClick = (idx: number) => {
    if (!columns[idx].getSortKey) return;
    if (sortIdx === idx) {
      setDirection((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortIdx(idx);
      setDirection("asc");
    }
  };

  const sortedRows = React.useMemo(() => {
    if (sortIdx === null) return rows;
    const sorter = columns[sortIdx].getSortKey;
    if (!sorter) return rows;
    return [...rows].sort((a, b) => {
      const aKey = sorter(a);
      const bKey = sorter(b);
      if (aKey < bKey) return direction === "asc" ? -1 : 1;
      if (aKey > bKey) return direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [rows, sortIdx, direction, columns]);

  const fixedWidth = columns.reduce((sum, c) => sum + (c.width ?? 0), 0);
  const weightTotal = columns
    .filter((c) => c.width === undefined)
    .reduce((s, c) => s + (c.weight ?? 1), 0);

  const colWidths = columns.map((c) => {
    if (c.width !== undefined) return c.width;
    const ratio = (c.weight ?? 1) / weightTotal;
    return `calc((100% - ${fixedWidth}px) * ${ratio})`;
  });

  const VirtuosoComponents: TableComponents<T> = React.useMemo(
    () => ({
      Scroller: React.forwardRef<
        HTMLDivElement,
        React.HTMLAttributes<HTMLDivElement>
      >((props, ref) => (
        <div
          ref={ref}
          {...props}
          className={cn("border rounded-lg bg-card overflow-auto", className)}
        />
      )) as TableComponents<T>["Scroller"],

      Table: (props) => (
        <div
          {...props}
          className="w-full border-collapse table-fixed"
          style={{ display: "table" }}
        />
      ),

      TableHead: React.forwardRef<
        HTMLDivElement,
        React.HTMLAttributes<HTMLDivElement>
      >((props, ref) => (
        <div ref={ref} {...props} style={{ display: "table-header-group" }} />
      )) as TableComponents<T>["TableHead"],

      TableBody: React.forwardRef<
        HTMLDivElement,
        React.HTMLAttributes<HTMLDivElement>
      >((props, ref) => (
        <div ref={ref} {...props} style={{ display: "table-row-group" }} />
      )) as TableComponents<T>["TableBody"],

      TableRow: (RowComponent ?? DefaultRow) as TableComponents<T>["TableRow"],

    }),
    [RowComponent, className]
  );

  const FixedHeaderContent = () => (
    <div className="flex bg-muted" style={{ display: "table-row" }}>
      {columns.map((col, idx) => {
        const sortable = Boolean(col.getSortKey);
        const active = sortIdx === idx;
        const content =
          typeof col.header === "function" ? col.header() : col.header;
        return (
          <div
            key={idx}
            className={cn(
              "p-3 text-sm font-medium text-left select-none",
              sortable && "cursor-pointer hover:bg-muted/80"
            )}
            style={{
              width: colWidths[idx],
              display: "table-cell",
              verticalAlign: "middle",
            }}
            onClick={() => handleHeaderClick(idx)}
          >
            <div className="flex items-center gap-1">
              {content}
              {sortable && active && (
                direction === "asc" ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )
              )}
            </div>
          </div>
        );
      })}
    </div>
  );

  const RowContent = (_: number, row: T) => (
    <>
      {columns.map((col, idx) => (
        <div
          key={idx}
          className="p-3 text-sm"
          style={{
            width: colWidths[idx],
            display: "table-cell",
            verticalAlign: "middle",
          }}
        >
          {col.cell(row)}
        </div>
      ))}
    </>
  );

  return (
    <div className={cn("border rounded-lg bg-card", className)}>
      <TableVirtuoso
        data={sortedRows}
        components={VirtuosoComponents}
        fixedHeaderContent={FixedHeaderContent}
        itemContent={RowContent}
      />
      {footer}
    </div>
  );
}
