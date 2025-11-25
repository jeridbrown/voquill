import { Check } from "lucide-react";
import { MemberPlan } from "@repo/types";
import { FormattedMessage, useIntl } from "react-intl";
import { loadPrices } from "../../actions/pricing.actions";
import { useOnEnter } from "../../hooks/helper.hooks";
import { useAppStore } from "../../store";
import { getEffectivePlan } from "../../utils/member.utils";
import { getDollarPriceFromKey } from "../../utils/price.utils";
import { Button } from "../ui/button";
import { cn } from "../ui/utils/cn";

type CheckmarkRowProps = {
  children?: React.ReactNode;
  disabled?: boolean;
};

const CheckmarkRow = ({ children, disabled }: CheckmarkRowProps) => {
  return (
    <div
      className={cn(
        "flex flex-row gap-2 items-center",
        disabled && "opacity-30"
      )}
    >
      <Check className="h-4 w-4" />
      <span className="text-sm">{children}</span>
    </div>
  );
};

type PlanCardProps = {
  title?: React.ReactNode;
  price?: React.ReactNode;
  children?: React.ReactNode;
  highlighted?: boolean;
  button?: React.ReactNode;
};

const PlanCard = ({
  title,
  price,
  children,
  highlighted,
  button,
}: PlanCardProps) => {
  return (
    <div
      className={cn(
        "w-full sm:w-[350px] border-[3px] rounded-lg bg-card",
        highlighted ? "border-primary" : "border-border"
      )}
    >
      <div className="flex flex-col items-stretch gap-2 p-5">
        <span className="text-sm font-medium">{title}</span>
        <span className="text-2xl font-bold">{price}</span>
        <div className="mt-2 mb-4">{button}</div>
        {children}
      </div>
    </div>
  );
};

export type PlanListProps = {
  onSelect: (plan: MemberPlan) => void;
  disabled?: boolean;
  text?: string;
  className?: string;
  ignoreCurrentPlan?: boolean;
};

export const PlanList = ({
  onSelect,
  className,
  text,
  disabled,
  ignoreCurrentPlan,
}: PlanListProps) => {
  const intl = useIntl();
  const effectivePlan = useAppStore(getEffectivePlan);

  const proPrice = useAppStore((state) =>
    getDollarPriceFromKey(state, "pro_monthly")
  );

  useOnEnter(() => {
    loadPrices();
  });

  const getText = (plan: MemberPlan) => {
    if (effectivePlan === plan && !ignoreCurrentPlan) {
      return {
        text: intl.formatMessage({ defaultMessage: "Current plan" }),
        disabled: true,
      };
    }

    return {
      text: text ?? intl.formatMessage({ defaultMessage: "Continue" }),
      disabled,
    };
  };

  const communityCard = (
    <PlanCard
      title={<FormattedMessage defaultMessage="Community" />}
      price={<FormattedMessage defaultMessage="Free" />}
      button={
        <Button
          variant="outline"
          onClick={() => onSelect("free")}
          disabled={getText("free").disabled}
          className="w-full"
        >
          {getText("free").text}
        </Button>
      }
    >
      <CheckmarkRow>
        <FormattedMessage defaultMessage="On-device processing" />
      </CheckmarkRow>
      <CheckmarkRow>
        <FormattedMessage defaultMessage="Unlimited words" />
      </CheckmarkRow>
      <CheckmarkRow>
        <FormattedMessage defaultMessage="Custom API keys" />
      </CheckmarkRow>
      <CheckmarkRow disabled>
        <FormattedMessage defaultMessage="Manual setup" />
      </CheckmarkRow>
    </PlanCard>
  );

  const proCard = (
    <PlanCard
      title={<FormattedMessage defaultMessage="Pro" />}
      price={
        proPrice
          ? intl.formatMessage(
              { defaultMessage: "${proPrice}/month" },
              { proPrice }
            )
          : "--"
      }
      highlighted
      button={
        <Button
          variant="primary"
          onClick={() => onSelect("pro")}
          disabled={getText("pro").disabled}
          className="w-full"
        >
          {getText("pro").text}
        </Button>
      }
    >
      <CheckmarkRow>
        <FormattedMessage defaultMessage="Everything community has" />
      </CheckmarkRow>
      <CheckmarkRow>
        <FormattedMessage defaultMessage="Cross-device data storage" />
      </CheckmarkRow>
      <CheckmarkRow>
        <FormattedMessage defaultMessage="No setup needed" />
      </CheckmarkRow>
      <CheckmarkRow>
        <FormattedMessage defaultMessage="Priority support" />
      </CheckmarkRow>
    </PlanCard>
  );

  return (
    <div
      className={cn(
        "flex flex-row gap-4 items-stretch justify-center flex-wrap",
        className
      )}
    >
      {communityCard}
      {proCard}
    </div>
  );
};
