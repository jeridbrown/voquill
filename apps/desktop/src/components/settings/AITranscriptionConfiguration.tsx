import { useCallback, useEffect, useMemo } from "react";
import { FormattedMessage } from "react-intl";
import {
  setPreferredTranscriptionApiKeyId,
  setPreferredTranscriptionMode,
} from "../../actions/user.actions";
import { useSupportedDiscreteGpus } from "../../hooks/gpu.hooks";
import { produceAppState, useAppStore } from "../../store";
import { CPU_DEVICE_VALUE, type TranscriptionMode } from "../../types/ai.types";
import { buildDeviceLabel } from "../../types/gpu.types";
import {
  SegmentedControl,
  SegmentedControlOption,
} from "../common/SegmentedControl";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { maybeArrayElements } from "./AIPostProcessingConfiguration";
import { ApiKeyList } from "./ApiKeyList";
import { VoquillCloudSetting } from "./VoquillCloudSetting";

type ModelOption = {
  value: string;
  label: string;
  helper: string;
};

const MODEL_OPTIONS: ModelOption[] = [
  { value: "tiny", label: "Tiny (77 MB)", helper: "Fastest, lowest accuracy" },
  {
    value: "base",
    label: "Base (148 MB)",
    helper: "Great balance of speed and accuracy",
  },
  {
    value: "small",
    label: "Small (488 MB)",
    helper: "Recommended with GPU acceleration",
  },
  {
    value: "medium",
    label: "Medium (1.53 GB)",
    helper: "Highest accuracy, slower on CPU",
  },
];

export type AITranscriptionConfigurationProps = {
  hideCloudOption?: boolean;
};

export const AITranscriptionConfiguration = ({
  hideCloudOption,
}: AITranscriptionConfigurationProps) => {
  const transcription = useAppStore((state) => state.settings.aiTranscription);
  const { gpus, loading: gpusLoading } = useSupportedDiscreteGpus(true);

  useEffect(() => {
    if (gpusLoading) {
      return;
    }

    if (gpus.length === 0) {
      if (transcription.device !== CPU_DEVICE_VALUE) {
        produceAppState((draft) => {
          draft.settings.aiTranscription.device = CPU_DEVICE_VALUE;
        });
      }
      return;
    }

    if (transcription.device.startsWith("gpu-")) {
      const index = Number.parseInt(
        transcription.device.split("-")[1] ?? "",
        10
      );
      if (Number.isNaN(index) || index >= gpus.length) {
        produceAppState((draft) => {
          draft.settings.aiTranscription.device = CPU_DEVICE_VALUE;
        });
      }
    }
  }, [gpus, gpusLoading, transcription.device]);

  const deviceOptions = useMemo(
    () => [
      { value: CPU_DEVICE_VALUE, label: "CPU processing" },
      ...gpus.map((gpu, index) => ({
        value: `gpu-${index}`,
        label: buildDeviceLabel(gpu),
      })),
    ],
    [gpus]
  );

  const handleModeChange = useCallback((mode: TranscriptionMode) => {
    void setPreferredTranscriptionMode(mode);
  }, []);

  const handleDeviceChange = useCallback((device: string) => {
    produceAppState((draft) => {
      draft.settings.aiTranscription.device = device;
    });
  }, []);

  const handleModelSizeChange = useCallback((modelSize: string) => {
    produceAppState((draft) => {
      draft.settings.aiTranscription.modelSize = modelSize;
    });
  }, []);

  const handleApiKeyChange = useCallback((id: string | null) => {
    void setPreferredTranscriptionApiKeyId(id);
  }, []);

  return (
    <div className="flex flex-col gap-6 items-start w-full">
      <SegmentedControl<TranscriptionMode>
        value={transcription.mode}
        onChange={handleModeChange}
        options={[
          ...maybeArrayElements<SegmentedControlOption<TranscriptionMode>>(
            !hideCloudOption,
            [
              {
                value: "cloud",
                label: "Voquill Cloud",
              },
            ]
          ),
          { value: "local", label: "Local processing" },
          { value: "api", label: "API key" },
        ]}
        ariaLabel="Processing mode"
      />

      {transcription.mode === "local" && (
        <div className="flex flex-col gap-6 w-full">
          <div className="flex flex-col gap-2">
            <Label htmlFor="processing-device">
              <FormattedMessage defaultMessage="Processing device" />
            </Label>
            <Select
              value={transcription.device}
              onValueChange={handleDeviceChange}
            >
              <SelectTrigger id="processing-device">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {deviceOptions.map(({ value, label }) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="model-size">
              <FormattedMessage defaultMessage="Model size" />
            </Label>
            <Select
              value={transcription.modelSize}
              onValueChange={handleModelSizeChange}
            >
              <SelectTrigger id="model-size">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {MODEL_OPTIONS.map(({ value, label, helper }) => (
                  <SelectItem key={value} value={value}>
                    <div>
                      <div className="text-sm font-semibold">{label}</div>
                      <div className="text-xs text-muted-foreground">
                        {helper}
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {transcription.mode === "api" && (
        <ApiKeyList
          selectedApiKeyId={transcription.selectedApiKeyId}
          onChange={handleApiKeyChange}
        />
      )}

      {transcription.mode === "cloud" && <VoquillCloudSetting />}
    </div>
  );
};
