import { FormattedMessage } from "react-intl";
import {
  goBackOnboardingPage,
  goToOnboardingPage,
} from "../../actions/onboarding.actions";
import { useAppStore } from "../../store";
import { Button } from "../ui/button";
import { AIPostProcessingConfiguration } from "../settings/AIPostProcessingConfiguration";
import { FormContainer } from "./OnboardingShared";

export const PostProcessingMethodForm = () => {
  const { mode, selectedApiKeyId } = useAppStore(
    (state) => state.settings.aiPostProcessing
  );

  const canContinue = mode === "api" ? Boolean(selectedApiKeyId) : true;

  return (
    <FormContainer>
      <h1 className="text-2xl font-semibold mb-2">
        <FormattedMessage defaultMessage="Pick your post-processing" />
      </h1>
      <p className="text-base text-muted-foreground mb-8">
        <FormattedMessage defaultMessage="Choose if Voquill should enhance transcripts automatically after they are transcribed." />
      </p>

      <AIPostProcessingConfiguration hideCloudOption={true} />

      <div className="flex flex-row justify-between mt-8 pb-8">
        <Button variant="ghost" onClick={() => goBackOnboardingPage()}>
          <FormattedMessage defaultMessage="Back" />
        </Button>
        <Button
          variant="primary"
          onClick={() => goToOnboardingPage("hotkeys")}
          disabled={!canContinue}
        >
          <FormattedMessage defaultMessage="Continue" />
        </Button>
      </div>
    </FormContainer>
  );
};
