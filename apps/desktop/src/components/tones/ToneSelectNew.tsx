import { Plus, Edit } from "lucide-react";
import type { Tone } from "@repo/types";
import { getRec } from "@repo/utilities";
import { useCallback, useMemo } from "react";
import { FormattedMessage } from "react-intl";
import { openToneEditorDialog } from "../../actions/tone.actions";
import { useAppStore } from "../../store";
import { getMyUserPreferences } from "../../utils/user.utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";

const ADD_TONE_MENU_VALUE = "__add_tone_option__";

type ToneSelectProps = {
  value: string | null | undefined;
  onToneChange: (toneId: string | null) => void;
  addToneTargetId?: string | null;
  includeDefaultOption?: boolean;
  disabled?: boolean;
  className?: string;
  label?: string;
  trueDefault?: boolean;
};

const sortTones = (tones: Tone[]) =>
  [...tones].sort((left, right) => left.sortOrder - right.sortOrder);

export const ToneSelect = ({
  value,
  onToneChange,
  addToneTargetId = null,
  includeDefaultOption = true,
  disabled = false,
  className,
  label,
  trueDefault,
}: ToneSelectProps) => {
  const toneById = useAppStore((state) => state.toneById);
  const defaultTone = useAppStore((state) => {
    const userPreferences = getMyUserPreferences(state);
    return getRec(state.toneById, userPreferences?.activeToneId);
  });

  const tones = useMemo(() => sortTones(Object.values(toneById)), [toneById]);

  const handleToneChange = useCallback(
    (newValue: string) => {
      if (newValue === ADD_TONE_MENU_VALUE) {
        openToneEditorDialog({ mode: "create", targetId: addToneTargetId });
        return;
      }

      const toneId = newValue === "" ? null : newValue;
      onToneChange(toneId);
    },
    [addToneTargetId, onToneChange]
  );

  const resolvedValue = getRec(toneById, value)?.id ?? "";

  const defaultLabel = defaultTone && !trueDefault ? (
    <FormattedMessage
      defaultMessage="Default ({toneName})"
      values={{ toneName: defaultTone.name }}
    />
  ) : (
    <FormattedMessage defaultMessage="Default" />
  );

  return (
    <div className={className}>
      {label && <Label className="mb-2">{label}</Label>}
      <Select
        value={resolvedValue}
        onValueChange={handleToneChange}
        disabled={disabled}
      >
        <SelectTrigger className="min-w-[160px]">
          <SelectValue>
            {resolvedValue ? toneById[resolvedValue]?.name ?? resolvedValue : defaultLabel}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={ADD_TONE_MENU_VALUE}>
            <div className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              <span><FormattedMessage defaultMessage="New style" /></span>
            </div>
          </SelectItem>
          {includeDefaultOption && (
            <SelectItem value="">
              {defaultLabel}
            </SelectItem>
          )}
          {tones.map((tone) => (
            <SelectItem key={tone.id} value={tone.id}>
              <div className="flex items-center justify-between w-full gap-2">
                <span>{tone.name}</span>
                {!tone.isSystem && (
                  <button
                    className="p-1 hover:bg-accent rounded"
                    onClick={(event) => {
                      event.stopPropagation();
                      event.preventDefault();
                      openToneEditorDialog({ mode: "edit", toneId: tone.id });
                    }}
                  >
                    <Edit className="h-3 w-3" />
                  </button>
                )}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
