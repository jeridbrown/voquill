import { useEffect, useMemo, useRef, useState } from "react";
import { useIntl } from "react-intl";
import { produceAppState, useAppStore } from "../../store";
import { getPrettyKeyName } from "../../utils/keyboard.utils";
import { cn } from "../ui/utils/cn";

type HotKeyProps = {
  value?: string[];
  onChange?: (value: string[]) => void;
};

export const HotKey = ({ value, onChange }: HotKeyProps) => {
  const intl = useIntl();
  const boxRef = useRef<HTMLDivElement | null>(null);
  const [focused, setFocused] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const keysHeld = useAppStore((s) => s.keysHeld);

  const lastEmittedRef = useRef<string[]>(value);
  useEffect(() => {
    lastEmittedRef.current = value;
  }, [value]);

  useEffect(() => {
    produceAppState((draft) => {
      draft.isRecordingHotkey = focused;
    });
  }, [focused]);

  const previousKeysHeldRef = useRef<string[]>([]);

  useEffect(() => {
    if (!focused) {
      previousKeysHeldRef.current = [];
      return;
    }

    if (!hasInteracted) {
      lastEmittedRef.current = [];
    }

    const seen = new Set<string>();
    const held = keysHeld.filter((k: string) => {
      if (seen.has(k)) {
        return false;
      }
      seen.add(k);
      return true;
    });

    const last = lastEmittedRef.current ?? [];

    const previousHeld = previousKeysHeldRef.current;
    if (
      hasInteracted &&
      previousHeld.length > 0 &&
      held.length < previousHeld.length
    ) {
      boxRef.current?.blur();
      previousKeysHeldRef.current = [];
      return;
    }

    previousKeysHeldRef.current = held;

    if (held.length === 0) {
      return;
    }

    if (held.length === 1 && held[0] === "Escape") {
      boxRef.current?.blur();
      return;
    }

    setHasInteracted(true);

    const lastSet = new Set(last);
    const anyNewKey = held.some((k) => !lastSet.has(k));
    if (held.length > last.length || anyNewKey) {
      lastEmittedRef.current = held;
      onChange?.(held);
    }
  }, [keysHeld, focused, onChange, hasInteracted]);

  const [empty, label] = useMemo(() => {
    if (focused && !hasInteracted) {
      return [true, intl.formatMessage({ defaultMessage: "Listening..." })];
    }
    const v = value ?? [];
    return v.length > 0
      ? [false, v.map((k) => getPrettyKeyName(k)).join(" + ")]
      : [true, intl.formatMessage({ defaultMessage: "Change hotkey" })];
  }, [value, focused, hasInteracted, intl]);

  return (
    <div
      ref={boxRef}
      tabIndex={0}
      onClick={() => boxRef.current?.focus()}
      onFocus={() => setFocused(true)}
      onBlur={() => {
        setFocused(false);
        setHasInteracted(false);
      }}
      className={cn(
        "w-[200px] h-10 flex items-center justify-center rounded cursor-pointer outline-none transition-all",
        focused
          ? "bg-muted border-2 border-primary animate-pulse"
          : "bg-muted/50 border-2 border-transparent hover:border-border"
      )}
    >
      <span
        className={cn(
          "text-sm",
          empty ? "text-muted-foreground" : "text-foreground"
        )}
      >
        {label}
      </span>
    </div>
  );
};
