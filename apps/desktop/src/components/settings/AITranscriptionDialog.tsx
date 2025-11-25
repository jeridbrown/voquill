import { FormattedMessage } from "react-intl";
import { produceAppState, useAppStore } from "../../store";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { AITranscriptionConfiguration } from "./AITranscriptionConfiguration";

export const AITranscriptionDialog = () => {
  const open = useAppStore((state) => state.settings.aiTranscriptionDialogOpen);

  const closeDialog = () => {
    produceAppState((draft) => {
      draft.settings.aiTranscriptionDialogOpen = false;
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => !isOpen && closeDialog()}
    >
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>
            <FormattedMessage defaultMessage="AI transcription" />
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-6 items-start mt-4">
          <p className="text-base text-muted-foreground">
            <FormattedMessage defaultMessage="Decide how Voquill should transcribe your recordings—locally on your machine or through a connected provider." />
          </p>
          <AITranscriptionConfiguration />
        </div>
        <DialogFooter>
          <Button onClick={closeDialog}>
            <FormattedMessage defaultMessage="Done" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
