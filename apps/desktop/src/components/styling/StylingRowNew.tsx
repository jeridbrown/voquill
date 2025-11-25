import { getRec } from "@repo/utilities";
import { useCallback } from "react";
import { setAppTargetTone } from "../../actions/app-target.actions";
import { useAppStore } from "../../store";
import { ListTile } from "../common/ListTileNew";
import { StorageImage } from "../common/StorageImage";
import { ToneSelect } from "../tones/ToneSelectNew";

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
  const toneValue = target?.toneId ?? null;
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

  const select = (
    <ToneSelect
      value={toneValue}
      onToneChange={handleToneChange}
      addToneTargetId={target?.id ?? null}
      disabled={!target}
      className="min-w-[160px]"
    />
  );

  return (
    <div className="border border-border rounded-lg mb-2 bg-gray-900/30">
      <ListTile
        title={target?.name}
        trailing={select}
        leading={leading}
      />
    </div>
  );
};
