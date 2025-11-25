import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { showSnackbar } from "../../actions/app.actions";
import { getAuthRepo } from "../../repos";
import { produceAppState, useAppStore } from "../../store";
import { Alert, AlertDescription } from "../ui/alert";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";

export const DeleteAccountDialog = () => {
  const open = useAppStore((state) => state.settings.deleteAccountDialog);
  const userEmail = useAppStore((state) => state.auth?.email);
  const [confirmationEmail, setConfirmationEmail] = useState("");

  const isDeleteEnabled = confirmationEmail === userEmail && userEmail;

  const handleClose = () => {
    produceAppState((state) => {
      state.settings.deleteAccountDialog = false;
    });
    setConfirmationEmail("");
  };

  const handleSubmit = async () => {
    if (!isDeleteEnabled) {
      return;
    }

    try {
      await getAuthRepo().deleteMyAccount();
      setConfirmationEmail("");
      showSnackbar("You account has been deleted", { duration: 15000 });
      produceAppState((state) => {
        state.settings.deleteAccountDialog = false;
      });
    } catch (error) {
      showSnackbar(
        "An error occurred while attempting to delete your account. Please try again later."
      );
    }
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmationEmail(event.target.value);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => !isOpen && handleClose()}
    >
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-destructive">
            <FormattedMessage defaultMessage="Delete account" />
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 mt-4">
          <Alert variant="warning">
            <AlertDescription>
              <FormattedMessage defaultMessage="This action cannot be undone. All your data will be permanently deleted." />
            </AlertDescription>
          </Alert>
          <div>
            <p className="text-base mb-2">
              <FormattedMessage defaultMessage="Are you sure you want to delete your account? This will:" />
            </p>
            <ul className="pl-6 space-y-1">
              <li className="text-sm">
                <FormattedMessage defaultMessage="Permanently delete all your data" />
              </li>
              <li className="text-sm">
                <FormattedMessage defaultMessage="Cancel any active subscriptions" />
              </li>
              <li className="text-sm">
                <FormattedMessage defaultMessage="Remove access to all premium features" />
              </li>
              <li className="text-sm">
                <FormattedMessage defaultMessage="Sign you out immediately" />
              </li>
            </ul>
          </div>
          {userEmail && (
            <p className="text-sm text-muted-foreground">
              <FormattedMessage
                defaultMessage="Account to be deleted: {email}"
                values={{ email: <strong>{userEmail}</strong> }}
              />
            </p>
          )}
          <div>
            <p className="text-sm mb-2">
              <FormattedMessage defaultMessage="To confirm, type your email address below:" />
            </p>
            <Input
              placeholder={userEmail || ""}
              value={confirmationEmail}
              onChange={handleEmailChange}
              inputSize="sm"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleClose} variant="ghost">
            <FormattedMessage defaultMessage="Cancel" />
          </Button>
          <Button
            onClick={handleSubmit}
            variant="destructive"
            disabled={!isDeleteEnabled}
          >
            <FormattedMessage defaultMessage="Delete account" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
