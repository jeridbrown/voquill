import type { Hotkey } from "@repo/types";
import { Plus, X, RotateCcw } from "lucide-react";
import type { ReactNode } from "react";
import { FormattedMessage } from "react-intl";
import { showErrorSnackbar } from "../../actions/app.actions";
import { getHotkeyRepo } from "../../repos";
import { produceAppState, useAppStore } from "../../store";
import { registerHotkeys } from "../../utils/app.utils";
import { createId } from "../../utils/id.utils";
import { getDefaultHotkeyCombosForAction } from "../../utils/keyboard.utils";
import { HotKey } from "../common/HotKey";
import { Button } from "../ui/button";

export type HotkeySettingProps = {
  title: ReactNode;
  description: ReactNode;
  actionName: string;
  buttonSize?: "small" | "medium";
};

const areCombosEqual = (a: string[], b: string[]) =>
  a.length === b.length && a.every((key, index) => key === b[index]);

export const HotkeySetting = ({
  title,
  description,
  actionName,
  buttonSize = "small",
}: HotkeySettingProps) => {
  const hotkeys = useAppStore((state) =>
    state.settings.hotkeyIds
      .map((id) => state.hotkeyById[id])
      .filter(
        (hotkey): hotkey is Hotkey =>
          Boolean(hotkey) && hotkey.actionName === actionName
      )
  );
  const defaultCombos = getDefaultHotkeyCombosForAction(actionName);

  const saveKey = async (id?: string, keys?: string[]) => {
    const newValue: Hotkey = {
      id: id ?? createId(),
      actionName,
      keys: keys ?? [],
    };

    try {
      produceAppState((draft) => {
        registerHotkeys(draft, [newValue]);
        if (!draft.settings.hotkeyIds.includes(newValue.id)) {
          draft.settings.hotkeyIds.push(newValue.id);
        }
        draft.settings.hotkeysStatus = "success";
      });
      await getHotkeyRepo().saveHotkey(newValue);
    } catch (error) {
      console.error("Failed to save hotkey", error);
      showErrorSnackbar("Failed to save hotkey. Please try again.");
    }
  };

  const handleDeleteHotkey = async (id: string) => {
    try {
      produceAppState((draft) => {
        delete draft.hotkeyById[id];
        draft.settings.hotkeyIds = draft.settings.hotkeyIds.filter(
          (hid) => hid !== id
        );
      });
      await getHotkeyRepo().deleteHotkey(id);
    } catch (error) {
      console.error("Failed to delete hotkey", error);
      showErrorSnackbar("Failed to delete hotkey. Please try again.");
    }
  };

  const [primaryHotkey, ...additionalHotkeys] = hotkeys;
  const showDefaultAsPrimary = !primaryHotkey && defaultCombos.length > 0;
  const primaryValue =
    primaryHotkey?.keys ?? (showDefaultAsPrimary ? defaultCombos[0] : []);
  const isPrimaryUsingDefault =
    primaryHotkey != null &&
    defaultCombos.some((combo) => areCombosEqual(combo, primaryHotkey.keys));

  const handlePrimaryChange = (keys: string[]) => {
    if (primaryHotkey) {
      void saveKey(primaryHotkey.id, keys);
      return;
    }
    void saveKey(undefined, keys);
  };

  const handleRevertPrimary = () => {
    if (!primaryHotkey || defaultCombos.length === 0) {
      return;
    }
    void saveKey(primaryHotkey.id, defaultCombos[0]);
  };

  const buttonLabel =
    hotkeys.length === 0 && defaultCombos.length === 0 ? (
      <FormattedMessage defaultMessage="Set hotkey" />
    ) : (
      <FormattedMessage defaultMessage="Add another" />
    );

  return (
    <div className="flex flex-row gap-4 items-start">
      <div className="flex flex-col gap-1 flex-1">
        <p className="text-base font-bold">{title}</p>
        <p className="text-sm">{description}</p>
      </div>
      <div className="flex flex-col gap-2 items-end">
        <div className="flex flex-row gap-2 items-center">
          <HotKey value={primaryValue} onChange={handlePrimaryChange} />
          {primaryHotkey && defaultCombos.length === 0 && (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => handleDeleteHotkey(primaryHotkey.id)}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </Button>
          )}
          {primaryHotkey &&
            defaultCombos.length > 0 &&
            !isPrimaryUsingDefault && (
              <Button
                size="sm"
                variant="ghost"
                aria-label="Revert to default hotkey"
                onClick={handleRevertPrimary}
                className="h-8 w-8 p-0"
              >
                <RotateCcw className="h-4 w-4 text-muted-foreground" />
              </Button>
            )}
        </div>
        {additionalHotkeys.map((hotkey) => (
          <div key={hotkey.id} className="flex flex-row gap-2 items-center">
            <HotKey
              value={hotkey.keys}
              onChange={(keys) => saveKey(hotkey.id, keys)}
            />
            <Button
              size="sm"
              variant="ghost"
              onClick={() => handleDeleteHotkey(hotkey.id)}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </Button>
          </div>
        ))}
        <Button
          variant="ghost"
          size={buttonSize === "small" ? "sm" : "md"}
          onClick={() => saveKey()}
          icon={<Plus className="h-4 w-4" />}
          iconPosition="left"
          className="py-1"
        >
          <span className="text-sm font-medium">{buttonLabel}</span>
        </Button>
      </div>
    </div>
  );
};
