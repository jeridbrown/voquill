import { MemberPlan } from "@repo/types";
import { useEffect } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import {
  closeUpgradePlanDialog,
  completePendingUpgrade,
  selectUpgradePlan,
  showUpgradePlanList,
} from "../../actions/pricing.actions";
import { useAppStore } from "../../store";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { LoginForm } from "../login/LoginForm";
import { FormContainer } from "../onboarding/OnboardingShared";
import { PlanList } from "./PlanList";

export const UpgradePlanDialog = () => {
  const intl = useIntl();
  const open = useAppStore((state) => state.pricing.upgradePlanDialog);
  const view = useAppStore((state) => state.pricing.upgradePlanDialogView);
  const pendingPlan = useAppStore(
    (state) => state.pricing.upgradePlanPendingPlan
  );
  const auth = useAppStore((state) => state.auth);

  const handleClose = () => {
    closeUpgradePlanDialog();
  };

  const handleClickPlan = (plan: MemberPlan) => {
    selectUpgradePlan(plan);
  };

  useEffect(() => {
    if (!open) {
      return;
    }

    if (view !== "login") {
      return;
    }

    if (!auth || !pendingPlan) {
      return;
    }

    completePendingUpgrade();
  }, [open, view, auth, pendingPlan]);

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && handleClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        {view === "plans" && (
          <>
            <DialogHeader className="text-center">
              <DialogTitle className="text-xl font-bold">
                <FormattedMessage defaultMessage="Upgrade your plan" />
              </DialogTitle>
              <p className="text-muted-foreground mt-2">
                <FormattedMessage defaultMessage="Cross-device sync, Voquill Cloud, and more advanced features." />
              </p>
            </DialogHeader>
            <div className="py-4">
              <PlanList
                onSelect={handleClickPlan}
                text={intl.formatMessage({ defaultMessage: "Upgrade" })}
                className="mt-2 mb-2"
              />
            </div>
          </>
        )}
        {view === "login" && (
          <div className="flex flex-col gap-4 items-center mt-4">
            <FormContainer>
              <div className="text-center mb-4">
                <h2 className="text-xl font-bold mb-2">
                  <FormattedMessage defaultMessage="Sign in to continue" />
                </h2>
                <p className="text-muted-foreground">
                  <FormattedMessage defaultMessage="Log in and we'll launch checkout automatically." />
                </p>
              </div>
              <LoginForm />
            </FormContainer>
          </div>
        )}
        <DialogFooter>
          {view === "login" && (
            <Button variant="ghost" onClick={showUpgradePlanList}>
              <FormattedMessage defaultMessage="Back to plans" />
            </Button>
          )}
          <Button variant="ghost" onClick={handleClose}>
            <FormattedMessage defaultMessage="Close" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
