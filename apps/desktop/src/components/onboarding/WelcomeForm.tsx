import { ArrowRight } from "lucide-react";
import { FormattedMessage } from "react-intl";
import { goToOnboardingPage } from "../../actions/onboarding.actions";
import { Button } from "../ui/button";
import { FormContainer } from "./OnboardingShared";

export const WelcomeForm = () => {
  return (
    <FormContainer>
      <h1 className="text-2xl font-semibold mb-2">
        <FormattedMessage defaultMessage="🚢 Welcome aboard!" />
      </h1>
      <p className="text-base text-muted-foreground mb-8">
        <FormattedMessage defaultMessage="Excited to have you here! We need to run through a quick setup to get you started." />
      </p>
      <Button
        variant="primary"
        onClick={() => goToOnboardingPage("name")}
        icon={<ArrowRight className="h-4 w-4" />}
        iconPosition="right"
      >
        <FormattedMessage defaultMessage="Let's do this" />
      </Button>
    </FormContainer>
  );
};
