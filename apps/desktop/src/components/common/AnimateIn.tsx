import { cn } from "../ui/utils/cn";

export type AnimateInProps = {
  children: React.ReactElement<unknown>;
  visible?: boolean;
};

export const AnimateIn = ({ children, visible = true }: AnimateInProps) => {
  if (!visible) {
    return null;
  }

  return (
    <div
      className={cn(
        "animate-in fade-in zoom-in-95 duration-300",
        !visible && "hidden"
      )}
    >
      {children}
    </div>
  );
};
