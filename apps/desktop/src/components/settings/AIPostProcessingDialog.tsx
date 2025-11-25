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
import { AIPostProcessingConfiguration } from "./AIPostProcessingConfiguration";

export const AIPostProcessingDialog = () => {
  const open = useAppStore(
    (state) => state.settings.aiPostProcessingDialogOpen
  );

  const handleClose = () => {
    produceAppState((draft) => {
      draft.settings.aiPostProcessingDialogOpen = false;
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => !isOpen && handleClose()}
    >
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>
            <FormattedMessage defaultMessage="AI post processing" />
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-6 items-start mt-4">
          <p className="text-base text-muted-foreground">
            <FormattedMessage defaultMessage="Tell Voquill how to enhance your transcripts after they are created." />
          </p>
          <AIPostProcessingConfiguration />
        </div>
        <DialogFooter>
          <Button onClick={handleClose}>
            <FormattedMessage defaultMessage="Done" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
