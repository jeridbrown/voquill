import { MemberPlan } from "@repo/types";
import { FormattedMessage } from "react-intl";
import {
  goBackOnboardingPage,
  selectOnboardingPlan,
} from "../../actions/onboarding.actions";
import { Button } from "../ui/button";
import { PlanList } from "../pricing/PlanList";
import { FormContainer } from "./OnboardingShared";

export const PlanSelectionForm = () => {
  const handleSelectPlan = (plan: MemberPlan) => {
    selectOnboardingPlan(plan);
  };

  return (
    <FormContainer className="max-w-[750px]">
      <div className="flex flex-col gap-2 items-center self-center mb-4 w-[400px] text-center">
        <h1 className="text-2xl font-semibold mb-2">
          <FormattedMessage defaultMessage="Pick your plan" />
        </h1>
        <p className="text-base text-muted-foreground pb-4">
          <FormattedMessage defaultMessage="The community edition is free forever. Upgrade anytime for more features and support." />
        </p>
      </div>

      <PlanList
        onSelect={handleSelectPlan}
        text="Continue"
        ignoreCurrentPlan
        sx={{ width: "100%" }}
      />

      <div className="flex flex-row justify-start mt-8 pb-8">
        <Button variant="ghost" onClick={() => goBackOnboardingPage()}>
          <FormattedMessage defaultMessage="Back" />
        </Button>
      </div>
    </FormContainer>
  );
};
