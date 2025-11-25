import { FormattedMessage } from "react-intl";
import { produceAppState, useAppStore } from "../../store";
import { DICTATE_HOTKEY } from "../../utils/keyboard.utils";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { CircularProgress } from "../ui/progress";
import { HotkeySetting } from "./HotkeySetting";

export const ShortcutsDialog = () => {
  const { open, hotkeysStatus } = useAppStore((state) => ({
    open: state.settings.shortcutsDialogOpen,
    hotkeysStatus: state.settings.hotkeysStatus,
  }));

  const handleClose = () => {
    produceAppState((draft) => {
      draft.settings.shortcutsDialogOpen = false;
    });
  };

  const renderContent = () => {
    if (hotkeysStatus === "loading") {
      return (
        <div className="flex flex-row justify-center items-center py-8">
          <CircularProgress size={24} />
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-6">
        <HotkeySetting
          title={<FormattedMessage defaultMessage="Start/stop dictating" />}
          description={
            <FormattedMessage defaultMessage="Start recording audio and transcribe your speech into text with AI." />
          }
          actionName={DICTATE_HOTKEY}
        />
      </div>
    );
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => !isOpen && handleClose()}
    >
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>
            <FormattedMessage defaultMessage="Keyboard shortcuts" />
          </DialogTitle>
          <DialogDescription>
            <FormattedMessage defaultMessage="Customize your keyboard shortcuts. Keyboard shortcuts can be triggered from within any app." />
          </DialogDescription>
        </DialogHeader>
        <div className="border-t border-b py-4">{renderContent()}</div>
        <DialogFooter>
          <Button onClick={handleClose}>
            <FormattedMessage defaultMessage="Close" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
