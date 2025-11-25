import * as Popover from "@radix-ui/react-popover";
import { useState } from "react";
import { ListTile } from "./ListTileNew";
import { cn } from "../ui/utils/cn";

export type MenuPopoverCallbackArgs = {
  close: () => void;
  event: React.MouseEvent<HTMLElement>;
};

export type MenuPopoverListItem = {
  kind: "listItem";
  title?: React.ReactNode;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  onClick?: (args: MenuPopoverCallbackArgs) => void;
};

export type MenuPopoverDivider = {
  kind: "divider";
};

export type MenuPopoverGenericItem = {
  kind: "genericItem";
  builder: (args: { close: () => void }) => React.ReactNode;
};

export type MenuPopoverItem =
  | MenuPopoverListItem
  | MenuPopoverDivider
  | MenuPopoverGenericItem;

type MenuPopoverItemRendProps = {
  item: MenuPopoverItem;
  close: () => void;
};

const MenuPopoverItemRend = ({
  item,
  close,
}: MenuPopoverItemRendProps): React.ReactNode => {
  if (item.kind === "listItem") {
    return (
      <ListTile
        leading={item.leading}
        title={item.title}
        trailing={item.trailing}
        onClick={(e) => item.onClick && item.onClick({ close, event: e })}
      />
    );
  }

  if (item.kind === "divider") {
    return <div className="h-px bg-border my-1" />;
  }

  if (item.kind === "genericItem") {
    return item.builder({ close });
  }

  return null;
};

export type MenuPopoverBuilderArgs = {
  ref: React.RefCallback<HTMLElement | null>;
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

export type MenuPopoverBuilderProps = {
  items: MenuPopoverItem[];
  children?: (args: MenuPopoverBuilderArgs) => React.ReactNode;
  className?: string;
};

export const MenuPopoverBuilder = ({
  children,
  items,
  className,
}: MenuPopoverBuilderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = (): void => {
    setIsOpen(true);
  };

  const handleClose = (): void => {
    setIsOpen(false);
  };

  return (
    <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
      <Popover.Anchor asChild>
        <div>
          {children?.({
            ref: () => {},
            isOpen,
            open: handleOpen,
            close: handleClose,
          })}
        </div>
      </Popover.Anchor>
      <Popover.Portal>
        <Popover.Content
          className={cn(
            "z-50 min-w-[200px] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            className
          )}
          sideOffset={5}
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col">
            {items.map((item, index) => (
              <div key={index} role="menuitem">
                <MenuPopoverItemRend item={item} close={handleClose} />
              </div>
            ))}
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};
