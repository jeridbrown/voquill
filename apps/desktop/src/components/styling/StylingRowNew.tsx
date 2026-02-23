import { PasteShortcut } from "@repo/types";
import { getRec } from "@repo/utilities";
import { useCallback } from "react";
import { setAppTargetPasteShortcut, setAppTargetTone } from "../../actions/app-target.actions";
import { useAppStore } from "../../store";
import { getPlatform } from "../../utils/platform.utils";
import { ListTile } from "../common/ListTileNew";
import { StorageImage } from "../common/StorageImage";
import { ToneSelect } from "../tones/ToneSelectNew";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const showPasteShortcut = getPlatform() !== "macos";

export type StylingRowProps = {
  id: string;
};

export const StylingRow = ({ id }: StylingRowProps) => {
  const target = useAppStore((state) => getRec(state.appTargetById, id));

  const handleToneChange = useCallback(
    (toneId: string | null) => {
      if (!target) {
        return;
      }
      void setAppTargetTone(target.id, toneId);
    },
    [target]
  );

  const handlePasteShortcutChange = useCallback(
    (value: string) => {
      if (!target) {
        return;
      }
      void setAppTargetPasteShortcut(target.id, value as PasteShortcut);
    },
    [target]
  );

  const toneValue = target?.toneId ?? null;
  const pasteShortcutValue: PasteShortcut = target?.pasteShortcut ?? "ctrl+v";

  const leading = (
    <div className="overflow-hidden rounded-md min-w-[36px] min-h-[36px] max-w-[36px] max-h-[36px] bg-gray-800 mr-2">
      {target?.iconPath && (
        <StorageImage
          path={target.iconPath}
          alt={target?.name ?? "App icon"}
          size={36}
        />
      )}
    </div>
  );

  const trailing = (
    <div className="flex items-center gap-2">
      {showPasteShortcut && (
        <Select
          value={pasteShortcutValue}
          onValueChange={handlePasteShortcutChange}
          disabled={!target}
        >
          <SelectTrigger className="min-w-[150px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ctrl+v">Ctrl+V</SelectItem>
            <SelectItem value="ctrl+shift+v">Ctrl+Shift+V</SelectItem>
          </SelectContent>
        </Select>
      )}
      <ToneSelect
        value={toneValue}
        onToneChange={handleToneChange}
        addToneTargetId={target?.id ?? null}
        disabled={!target}
        className="min-w-[160px]"
      />
    </div>
  );

  return (
    <div className="border border-border rounded-lg mb-2 bg-gray-900/30">
      <ListTile
        title={target?.name}
        trailing={trailing}
        leading={leading}
      />
    </div>
  );
};
