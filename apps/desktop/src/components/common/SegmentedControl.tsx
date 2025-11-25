import { cn } from "../ui/utils/cn";

export type SegmentedControlOption<Value extends string> = {
  value: Value;
  label: string;
  disabled?: boolean;
};

export type SegmentedControlProps<Value extends string> = {
  value: Value;
  options: SegmentedControlOption<Value>[];
  onChange: (value: Value) => void;
  ariaLabel?: string;
};

export const SegmentedControl = <Value extends string>({
  value,
  options,
  onChange,
  ariaLabel,
}: SegmentedControlProps<Value>) => {
  const handleClick = (option: SegmentedControlOption<Value>) => {
    if (option.disabled) {
      return;
    }

    if (option.value !== value) {
      onChange(option.value);
    }
  };

  return (
    <div
      className="inline-flex bg-muted/50 rounded-lg p-0.5 border border-border max-w-full"
      role="tablist"
      aria-label={ariaLabel}
    >
      {options.map((option) => {
        const isSelected = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={isSelected}
            disabled={option.disabled}
            onClick={() => handleClick(option)}
            className={cn(
              "px-4 py-2 text-sm font-semibold rounded-md transition-all duration-200",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              isSelected
                ? "bg-background text-foreground shadow-[inset_0_1px_3px_rgba(0,0,0,0.2),0_1px_2px_rgba(0,0,0,0.05)]"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
};
