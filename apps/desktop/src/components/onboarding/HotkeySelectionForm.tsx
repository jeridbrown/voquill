import { Check } from "lucide-react";
import { FormattedMessage } from "react-intl";
import {
  goBackOnboardingPage,
  submitOnboarding,
} from "../../actions/onboarding.actions";
import { useAppStore } from "../../store";
import {
  DICTATE_HOTKEY,
  getDefaultHotkeyCombosForAction,
} from "../../utils/keyboard.utils";
import { getMyMember } from "../../utils/member.utils";
import { Button } from "../ui/button";
import { CircularProgress } from "../ui/progress";
import { HotkeySetting } from "../settings/HotkeySetting";
import { FormContainer } from "./OnboardingShared";

export const HotkeySelectionForm = () => {
  const submitting = useAppStore((state) => state.onboarding.submitting);
  const { status, savedHotkeyCount } = useAppStore((state) => ({
    status: state.settings.hotkeysStatus,
    savedHotkeyCount: Object.values(state.hotkeyById).filter(
      (hotkey) => hotkey.actionName === DICTATE_HOTKEY
    ).length,
  }));

  const hideBackButton = useAppStore((state) => {
    const myMember = getMyMember(state);
    return myMember?.plan === "pro" || !state.onboarding.history.length;
  });

  const defaultHotkeys = getDefaultHotkeyCombosForAction(DICTATE_HOTKEY);
  const canFinish =
    status !== "loading" && (savedHotkeyCount > 0 || defaultHotkeys.length > 0);

  const handleFinish = () => {
    void submitOnboarding();
  };

  return (
    <FormContainer>
      <h1 className="text-2xl font-semibold mb-2">
        <FormattedMessage defaultMessage="Choose your dictation shortcut" />
      </h1>
      <p className="text-base text-muted-foreground mb-8">
        <FormattedMessage defaultMessage="Pick the keys you'll press to start and stop dictation anywhere. You can change this anytime from settings." />
      </p>

      {status === "loading" ? (
        <div className="flex flex-row justify-center items-center py-8">
          <CircularProgress size="sm" />
        </div>
      ) : (
        <HotkeySetting
          title="Start/stop dictating"
          description="Customize the keyboard shortcut that toggles dictation."
          actionName={DICTATE_HOTKEY}
          buttonSize="medium"
        />
      )}

      <div className="flex flex-row justify-between mt-8 pb-8">
        {hideBackButton ? (
          <div />
        ) : (
          <Button
            variant="ghost"
            onClick={() => goBackOnboardingPage()}
            disabled={status === "loading"}
          >
            <FormattedMessage defaultMessage="Back" />
          </Button>
        )}
        <Button
          variant="primary"
          onClick={handleFinish}
          disabled={submitting || !canFinish}
          icon={<Check className="h-4 w-4" />}
          iconPosition="right"
        >
          <FormattedMessage defaultMessage="Finish" />
        </Button>
      </div>
    </FormContainer>
  );
};
