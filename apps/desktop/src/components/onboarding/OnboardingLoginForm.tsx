import { ArrowRight } from "lucide-react";
import { FormattedMessage } from "react-intl";
import { invokeHandler } from "@repo/functions";
import {
  goBackOnboardingPage,
  goToOnboardingPage,
} from "../../actions/onboarding.actions";
import { openPaymentDialog } from "../../actions/payment.actions";
import {
  setPreferredPostProcessingMode,
  setPreferredTranscriptionMode,
} from "../../actions/user.actions";
import { useAsyncEffect } from "../../hooks/async.hooks";
import { useAppStore } from "../../store";
import { getMyMember } from "../../utils/member.utils";
import { getPriceIdFromKey } from "../../utils/price.utils";
import { Button } from "../ui/button";
import { LoginForm } from "../login/LoginForm";
import { FormContainer } from "./OnboardingShared";

export const OnboardingLoginForm = () => {
  const loggingIn = useAppStore((state) => state.onboarding.loggingIn);
  const currentUserId = useAppStore((state) => state.auth?.uid);
  const memberPlan = useAppStore((state) => getMyMember(state)?.plan);

  const goToNextPage = () => {
    goToOnboardingPage("hotkeys");
    setPreferredPostProcessingMode("cloud");
    setPreferredTranscriptionMode("cloud");
  };

  const handleOpenPaymentDialog = async () => {
    const member = await invokeHandler("member/getMyMember", {})
      .then((res) => res.member)
      .catch(() => null);
    if (member?.plan !== "pro") {
      openPaymentDialog(getPriceIdFromKey("pro_monthly"));
    } else {
      goToNextPage();
    }
  };

  useAsyncEffect(async () => {
    console.log("currentUserId changed:", currentUserId);
    if (currentUserId) {
      handleOpenPaymentDialog();
    }
  }, [currentUserId]);

  useAsyncEffect(async () => {
    if (memberPlan === "pro") {
      goToNextPage();
    }
  }, [memberPlan]);

  if (currentUserId) {
    return (
      <FormContainer>
        <h2 className="text-lg font-semibold mb-2">
          <FormattedMessage defaultMessage="You are logged in" />
        </h2>
        <p className="text-sm text-muted-foreground">
          <FormattedMessage defaultMessage="You haven't completed checkout yet. Click the 'Next' button below to proceed to checkout." />
          <br />
          <br />
          <FormattedMessage defaultMessage="You can always go back if you changed your mind!" />
        </p>

        <div className="flex flex-row justify-between mt-8 pb-8">
          <Button
            variant="ghost"
            onClick={() => goBackOnboardingPage()}
            disabled={loggingIn}
          >
            <FormattedMessage defaultMessage="Back" />
          </Button>
          <Button
            variant="primary"
            onClick={handleOpenPaymentDialog}
            icon={<ArrowRight className="h-4 w-4" />}
            iconPosition="right"
          >
            <FormattedMessage defaultMessage="Next" />
          </Button>
        </div>
      </FormContainer>
    );
  }

  return (
    <FormContainer>
      <h1 className="text-2xl font-semibold mb-2">
        <FormattedMessage defaultMessage="Sign in to continue" />
      </h1>
      <p className="text-base text-muted-foreground mb-6">
        <FormattedMessage defaultMessage="We'll connect your account and launch checkout right after you sign in." />
      </p>

      <div className="p-4 px-6 flex-shrink-0 border rounded-lg bg-card">
        <LoginForm />
      </div>

      <div className="flex flex-row justify-between mt-8 pb-8">
        <Button
          variant="ghost"
          onClick={() => goBackOnboardingPage()}
          disabled={loggingIn}
        >
          <FormattedMessage defaultMessage="Back" />
        </Button>
      </div>
    </FormContainer>
  );
};
