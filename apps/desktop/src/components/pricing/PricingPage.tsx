import { MemberPlan } from "@repo/types";
import { useEffect } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import { tryOpenPaymentDialogForPlan } from "../../actions/payment.actions";
import { usePrevious } from "../../hooks/helper.hooks";
import { useConsumeQueryParams } from "../../hooks/navigation.hooks";
import { getAppState, useAppStore } from "../../store";
import { getIsPaying, getMyMember } from "../../utils/member.utils";
import { getIsSignedIn, getMyUser } from "../../utils/user.utils";
import { Faq } from "./Faq";
import Liquid from "./Liquid";
import { PlanList } from "./PlanList";

export default function PricingPage() {
  const nav = useNavigate();
  const intl = useIntl();
  const onboarded = useAppStore(
    (state) => getMyUser(state)?.onboarded ?? false
  );
  const isPaying = useAppStore(getIsPaying);
  const currPlan = useAppStore((state) => getMyMember(state)?.plan);
  const prevPlan = usePrevious(currPlan);

  useEffect(() => {
    if (isPaying && currPlan !== prevPlan && prevPlan) {
      nav("/dashboard", { replace: true });
    }
  }, [isPaying, currPlan, prevPlan]);

  useConsumeQueryParams(["plan"], ([plan]) => {
    tryOpenPaymentDialogForPlan(plan);
  });

  const handleClickPlan = (plan: MemberPlan) => {
    const isSignedIn = getIsSignedIn(getAppState());
    if (isSignedIn) {
      tryOpenPaymentDialogForPlan(plan);
    } else {
      nav(`/login?plan=${plan}`, { replace: true });
    }
  };

  let title: React.ReactNode;
  let subtitle: React.ReactNode;
  if (onboarded) {
    title = <FormattedMessage defaultMessage="Upgrade your plan" />;
    subtitle = (
      <FormattedMessage defaultMessage="Get access to the full feature set by upgrading your plan." />
    );
  } else {
    title = <FormattedMessage defaultMessage="Try it free. Upgrade anytime." />;
    subtitle = (
      <FormattedMessage defaultMessage="No credit card required. Get started today and upgrade when you're ready." />
    );
  }

  const plans = (
    <div className="flex flex-col justify-center items-center p-8 pb-32 gap-2 min-h-[80vh]">
      <h1 className="text-2xl font-bold text-center">{title}</h1>
      <p className="text-base text-muted-foreground text-center">{subtitle}</p>
      <PlanList
        onSelect={handleClickPlan}
        text={
          onboarded
            ? intl.formatMessage({ defaultMessage: "Subscribe" })
            : intl.formatMessage({ defaultMessage: "Continue" })
        }
        className="mt-8 mb-4"
      />
    </div>
  );

  return (
    <div className="flex flex-col pb-32">
      <Liquid duration={80}>
        <div
          className="bg-gradient-radial from-background via-background/80 to-transparent"
          style={{
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
          }}
        >
          {plans}
        </div>
      </Liquid>
      <Faq className="mt-4 mb-4" />
    </div>
  );
}
