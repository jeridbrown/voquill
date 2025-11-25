import { ArrowRight } from "lucide-react";
import { FormattedMessage, useIntl } from "react-intl";
import {
  goBackOnboardingPage,
  goToOnboardingPage,
} from "../../actions/onboarding.actions";
import { produceAppState, useAppStore } from "../../store";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { FormContainer } from "./OnboardingShared";

export const NameForm = () => {
  const intl = useIntl();
  const name = useAppStore((state) => state.onboarding.name);
  const submitting = useAppStore((state) => state.onboarding.submitting);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    produceAppState((draft) => {
      draft.onboarding.name = e.target.value;
    });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    produceAppState((draft) => {
      draft.onboarding.name = e.target.value.trim();
    });
  };

  const handleContinue = () => {
    goToOnboardingPage("plan");
  };

  return (
    <FormContainer>
      <h1 className="text-2xl font-semibold mb-2">
        <FormattedMessage defaultMessage="What's your name?" />
      </h1>
      <p className="text-base text-muted-foreground mb-8">
        <FormattedMessage defaultMessage="This will be used in things like email signatures and stuff." />
      </p>
      <Input
        placeholder={intl.formatMessage({ defaultMessage: "Full name" })}
        value={name}
        onChange={handleChange}
        onBlur={handleBlur}
        autoFocus
        autoComplete="name"
        data-voquill-ignore="true"
      />
      <div className="flex flex-row justify-between mt-8">
        <Button variant="ghost" onClick={() => goBackOnboardingPage()}>
          <FormattedMessage defaultMessage="Back" />
        </Button>
        <Button
          variant="primary"
          disabled={!name || submitting}
          onClick={handleContinue}
          icon={<ArrowRight className="h-4 w-4" />}
          iconPosition="right"
        >
          <FormattedMessage defaultMessage="Continue" />
        </Button>
      </div>
    </FormContainer>
  );
};
