import { FormattedMessage } from "react-intl";
import { showErrorSnackbar } from "../../actions/app.actions";
import { getAuthRepo } from "../../repos";
import { getAppState, produceAppState, useAppStore } from "../../store";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

export const ChangePasswordDialog = () => {
  const open = useAppStore((state) => state.settings.changePasswordDialogOpen);
  const userEmail = useAppStore((state) => state.auth?.email);

  const handleClose = () => {
    produceAppState((state) => {
      state.settings.changePasswordDialogOpen = false;
    });
  };

  const handleSubmit = async () => {
    const state = getAppState();
    const userEmail = state.auth?.email;
    if (!userEmail) {
      showErrorSnackbar("No user email found");
      return;
    }

    try {
      await getAuthRepo().sendPasswordResetRequest(userEmail);
      produceAppState((draft) => {
        draft.settings.changePasswordDialogOpen = false;
      });
    } catch (error) {
      showErrorSnackbar(`Error sending password reset email: ${error}`);
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
            <FormattedMessage defaultMessage="Change password" />
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 mt-4">
          <p className="text-base">
            <FormattedMessage defaultMessage="We'll send a password reset link to your email address. Click the link in the email to create a new password." />
          </p>
          {userEmail && (
            <p className="text-sm text-muted-foreground">
              <FormattedMessage
                defaultMessage="Reset link will be sent to: {email}"
                values={{ email: <strong>{userEmail}</strong> }}
              />
            </p>
          )}
        </div>
        <DialogFooter>
          <Button onClick={handleClose} variant="ghost">
            <FormattedMessage defaultMessage="Cancel" />
          </Button>
          <Button onClick={handleSubmit} variant="primary">
            <FormattedMessage defaultMessage="Send reset link" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
