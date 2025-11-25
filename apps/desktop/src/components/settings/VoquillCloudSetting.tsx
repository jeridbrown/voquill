import { ArrowUp } from "lucide-react";
import { FormattedMessage } from "react-intl";
import { openUpgradePlanDialog } from "../../actions/pricing.actions";
import { useAppStore } from "../../store";
import { getIsPaying } from "../../utils/member.utils";
import { Button } from "../ui/button";

export const VoquillCloudSetting = () => {
  const isPro = useAppStore(getIsPaying);

  return (
    <div className="flex flex-col gap-2 items-start">
      <p className="text-base">
        <FormattedMessage defaultMessage="Use Voquill Cloud" />
      </p>
      <p className="text-sm text-muted-foreground">
        <FormattedMessage defaultMessage="No downloads or manual setup. Record on any device and we'll keep your data secure, synced, and ready everywhere." />
      </p>
      {!isPro && (
        <Button
          variant="primary"
          onClick={openUpgradePlanDialog}
          icon={<ArrowUp className="h-4 w-4" />}
          iconPosition="right"
          className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
        >
          <FormattedMessage defaultMessage="Upgrade to Pro" />
        </Button>
      )}
    </div>
  );
};
