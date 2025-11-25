import { invoke } from "@tauri-apps/api/core";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { produceAppState, useAppStore } from "../../store";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const CONFIRMATION_PHRASE = "clear";

export const ClearLocalDataDialog = () => {
  const open = useAppStore((state) => state.settings.clearLocalDataDialogOpen);
  const [confirmationValue, setConfirmationValue] = useState("");
  const [isClearing, setIsClearing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleClose = () => {
    produceAppState((draft) => {
      draft.settings.clearLocalDataDialogOpen = false;
    });
    setConfirmationValue("");
    setIsClearing(false);
    setErrorMessage(null);
  };

  const confirmationMatches =
    confirmationValue.trim().toLowerCase() === CONFIRMATION_PHRASE;

  const handleClear = async () => {
    if (!confirmationMatches || isClearing) {
      return;
    }

    setIsClearing(true);
    setErrorMessage(null);

    try {
      await invoke("clear_local_data");
      handleClose();
      window.location.reload();
    } catch (error) {
      console.error("Failed to clear local data", error);
      const message =
        error instanceof Error ? error.message : "Failed to clear local data.";
      setErrorMessage(message);
      setIsClearing(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => !isOpen && handleClose()}
    >
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>
            <FormattedMessage defaultMessage="Clear local data" />
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 mt-4">
          <Alert variant="warning">
            <AlertTitle>
              <FormattedMessage defaultMessage="This action permanently removes local data" />
            </AlertTitle>
            <AlertDescription>
              <FormattedMessage defaultMessage="This will delete all preferences, dictionary entries, and saved transcriptions from this device. The action cannot be undone." />
            </AlertDescription>
          </Alert>
          <p className="text-sm">
            <FormattedMessage
              defaultMessage="To confirm, type {phrase} below and click Clear local data."
              values={{
                phrase: <span className="font-bold">{CONFIRMATION_PHRASE}</span>,
              }}
            />
          </p>
          <div className="flex flex-col gap-2">
            <Label htmlFor="confirmation">
              <FormattedMessage defaultMessage="Confirmation phrase" />
            </Label>
            <Input
              id="confirmation"
              autoFocus
              value={confirmationValue}
              onChange={(event) => setConfirmationValue(event.target.value)}
              disabled={isClearing}
              placeholder={CONFIRMATION_PHRASE}
              autoComplete="off"
            />
          </div>
          {errorMessage && (
            <Alert variant="error">
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}
        </div>
        <DialogFooter>
          <Button onClick={handleClose} disabled={isClearing} variant="outline">
            <FormattedMessage defaultMessage="Cancel" />
          </Button>
          <Button
            variant="destructive"
            onClick={handleClear}
            disabled={!confirmationMatches || isClearing}
            loading={isClearing}
          >
            {isClearing ? (
              <FormattedMessage defaultMessage="Clearing..." />
            ) : (
              <FormattedMessage defaultMessage="Clear local data" />
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
