import { useCallback } from "react";
import { FormattedMessage } from "react-intl";
import {
  setPreferredPostProcessingApiKeyId,
  setPreferredPostProcessingMode,
} from "../../actions/user.actions";
import { useAppStore } from "../../store";
import { type PostProcessingMode } from "../../types/ai.types";
import {
  SegmentedControl,
  SegmentedControlOption,
} from "../common/SegmentedControl";
import { ApiKeyList } from "./ApiKeyList";
import { VoquillCloudSetting } from "./VoquillCloudSetting";

type AIPostProcessingConfigurationProps = {
  hideCloudOption?: boolean;
};

export function maybeArrayElements<T>(visible: boolean, values: T[]): T[] {
  return visible ? values : [];
}

export const AIPostProcessingConfiguration = ({
  hideCloudOption,
}: AIPostProcessingConfigurationProps) => {
  const postProcessing = useAppStore(
    (state) => state.settings.aiPostProcessing
  );

  const handleModeChange = useCallback((mode: PostProcessingMode) => {
    void setPreferredPostProcessingMode(mode);
  }, []);

  const handleApiKeyChange = useCallback((id: string | null) => {
    void setPreferredPostProcessingApiKeyId(id);
  }, []);

  return (
    <div className="flex flex-col gap-6 items-start w-full">
      <SegmentedControl<PostProcessingMode>
        value={postProcessing.mode}
        onChange={handleModeChange}
        options={[
          ...maybeArrayElements<SegmentedControlOption<PostProcessingMode>>(
            !hideCloudOption,
            [
              {
                value: "cloud",
                label: "Voquill Cloud",
              },
            ]
          ),
          { value: "none", label: "Disabled" },
          { value: "api", label: "API key" },
        ]}
        ariaLabel="Post-processing mode"
      />

      {postProcessing.mode === "none" && (
        <p className="text-sm text-muted-foreground">
          <FormattedMessage defaultMessage="No AI post-processing will run on new transcripts." />
        </p>
      )}

      {postProcessing.mode === "api" && (
        <ApiKeyList
          selectedApiKeyId={postProcessing.selectedApiKeyId}
          onChange={handleApiKeyChange}
        />
      )}

      {postProcessing.mode === "cloud" && <VoquillCloudSetting />}
    </div>
  );
};
