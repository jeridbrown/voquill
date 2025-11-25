import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

export type BreadcrumbItem = {
  label: string;
  href?: string;
  onClick?: () => void;
};

export type BreadcrumbProps = {
  items: BreadcrumbItem[];
  separator?: string;
};

export const Breadcrumb = ({ items, separator = "/" }: BreadcrumbProps) => {
  const navigate = useNavigate();

  const handleClick = (item: BreadcrumbItem) => {
    if (item.onClick) {
      item.onClick();
    } else if (item.href) {
      navigate(item.href);
    }
  };

  return (
    <div className="flex items-center gap-1 px-4 min-w-0">
      {items.map((item, index) => (
        <Fragment key={index}>
          {index > 0 && (
            <span className="text-sm text-muted-foreground shrink-0">
              {separator}
            </span>
          )}
          {index === items.length - 1 ? (
            <span className="text-sm text-foreground font-medium whitespace-nowrap overflow-hidden text-ellipsis min-w-0">
              {item.label}
            </span>
          ) : (
            <button
              type="button"
              onClick={() => handleClick(item)}
              className="text-sm text-muted-foreground cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis min-w-0 hover:underline"
            >
              {item.label}
            </button>
          )}
        </Fragment>
      ))}
    </div>
  );
};
