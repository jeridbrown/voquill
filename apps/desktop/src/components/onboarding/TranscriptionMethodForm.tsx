import { FormattedMessage } from "react-intl";
import {
  goBackOnboardingPage,
  goToOnboardingPage,
} from "../../actions/onboarding.actions";
import { useAppStore } from "../../store";
import { Button } from "../ui/button";
import { AITranscriptionConfiguration } from "../settings/AITranscriptionConfiguration";
import { FormContainer } from "./OnboardingShared";

export const TranscriptionMethodForm = () => {
  const { mode, selectedApiKeyId } = useAppStore(
    (state) => state.settings.aiTranscription
  );

  const canContinue = mode === "api" ? Boolean(selectedApiKeyId) : true;

  return (
    <FormContainer>
      <h1 className="text-2xl font-semibold mb-2">
        <FormattedMessage defaultMessage="Choose your transcription setup" />
      </h1>
      <p className="text-base text-muted-foreground mb-8">
        <FormattedMessage defaultMessage="Decide how Voquill should transcribe your recordings—locally or through an API-powered service." />
      </p>

      <AITranscriptionConfiguration hideCloudOption={true} />

      <div className="flex flex-row justify-between mt-8 pb-8">
        <Button variant="ghost" onClick={() => goBackOnboardingPage()}>
          <FormattedMessage defaultMessage="Back" />
        </Button>
        <Button
          variant="primary"
          onClick={() => goToOnboardingPage("postProcessing")}
          disabled={!canContinue}
        >
          <FormattedMessage defaultMessage="Continue" />
        </Button>
      </div>
    </FormContainer>
  );
};
