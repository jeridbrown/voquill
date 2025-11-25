import { ExternalLink } from "lucide-react";
import { useCallback } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { setActiveTone } from "../../actions/tone.actions";
import { produceAppState, useAppStore } from "../../store";
import { getMyEffectiveUserId } from "../../utils/user.utils";
import { CenterMessage } from "../common/CenterMessageNew";
import { VirtualizedListPage } from "../common/VirtualizedListPageNew";
import { ToneSelect } from "../tones/ToneSelectNew";
import { StylingRow } from "./StylingRowNew";
import { Button } from "../ui/button";

export default function StylingPage() {
  const intl = useIntl();

  const sortedAppTargetIds = useAppStore((state) =>
    Object.values(state.appTargetById)
      .sort((left, right) => left.name.localeCompare(right.name))
      .map((target) => target.id)
  );

  const activeToneId = useAppStore((state) => {
    const myUserId = getMyEffectiveUserId(state);
    return state.userPreferencesById[myUserId]?.activeToneId ?? null;
  });

  const handleActiveToneChange = useCallback((toneId: string | null) => {
    void setActiveTone(toneId);
  }, []);

  const openPostProcessingSettings = useCallback(() => {
    produceAppState((draft) => {
      draft.settings.aiPostProcessingDialogOpen = true;
    });
  }, []);

  const postProcessingMode = useAppStore(
    (state) => state.settings.aiPostProcessing.mode
  );

  if (postProcessingMode === "none") {
    return (
      <CenterMessage
        title={<FormattedMessage defaultMessage="Writing styles unavailable" />}
        subtitle={
          <FormattedMessage defaultMessage="Post-processing must be enabled in order to use writing styles. Update your settings to enable it." />
        }
        action={
          <Button
            onClick={openPostProcessingSettings}
            variant="default"
            icon={<ExternalLink className="h-4 w-4" />}
            iconPosition="right"
          >
            <FormattedMessage defaultMessage="Open settings" />
          </Button>
        }
      />
    );
  }

  return (
    <VirtualizedListPage
      title={<FormattedMessage defaultMessage="Writing Styles" />}
      subtitle={
        <FormattedMessage defaultMessage="Choose how you want to sound based on what app you're using." />
      }
      action={
        <ToneSelect
          value={activeToneId}
          trueDefault={true}
          onToneChange={handleActiveToneChange}
          className="min-w-[200px]"
          label={intl.formatMessage({ defaultMessage: "Default style" })}
        />
      }
      items={sortedAppTargetIds}
      computeItemKey={(id) => id}
      renderItem={(id) => <StylingRow key={id} id={id} />}
      emptyState={
        <div className="flex flex-col gap-2 items-start w-[300px] self-center mx-auto">
          <h3 className="text-xl font-semibold">How it works</h3>
          <p className="text-sm">
            1. Open up the app you want to style (like Slack or Chrome).
          </p>
          <p className="text-sm">
            2. Click on the Voquill icon in the menu bar, and click "Register
            this app".
          </p>
          <p className="text-sm">
            3. Go back to Voquill, and select a writing style for that app.
          </p>
        </div>
      }
    />
  );
}
