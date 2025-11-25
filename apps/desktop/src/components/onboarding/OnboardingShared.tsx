import { cn } from "../ui/utils/cn";

export type FormContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export const FormContainer = ({ children, className }: FormContainerProps) => {
  return (
    <div
      className={cn(
        "flex flex-col max-w-[500px] w-full p-2 max-h-full",
        className
      )}
    >
      {children}
    </div>
  );
};
