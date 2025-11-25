import { useCallback, useEffect, useMemo, useState } from "react";
import { FormattedMessage } from "react-intl";
import { setUserName } from "../../actions/user.actions";
import { useMyUser } from "../../hooks/user.hooks";
import { produceAppState, useAppStore } from "../../store";
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

export const ProfileDialog = () => {
  const open = useAppStore((state) => state.settings.profileDialogOpen);
  const user = useMyUser();
  const initialName = user?.name ?? "";

  const [value, setValue] = useState(initialName);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) {
      return;
    }
    setValue(initialName);
    setSaving(false);
  }, [open, initialName]);

  const closeDialog = useCallback(() => {
    produceAppState((draft) => {
      draft.settings.profileDialogOpen = false;
    });
  }, []);

  const trimmed = useMemo(() => value.trim(), [value]);
  const initialTrimmed = useMemo(() => initialName.trim(), [initialName]);

  const canSave = useMemo(() => {
    if (!user || saving) {
      return false;
    }

    if (trimmed.length === 0) {
      return false;
    }

    return trimmed !== initialTrimmed;
  }, [user, saving, trimmed, initialTrimmed]);

  const handleSave = useCallback(async () => {
    if (!canSave) {
      return;
    }

    setSaving(true);
    try {
      await setUserName(trimmed);
      closeDialog();
    } catch (error) {
      console.error("Failed to save username", error);
      setSaving(false);
    }
  }, [canSave, trimmed, closeDialog]);

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => !isOpen && closeDialog()}
    >
      <DialogContent className="max-w-xs">
        <DialogHeader>
          <DialogTitle>
            <FormattedMessage defaultMessage="My profile" />
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 mt-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="username">
              <FormattedMessage defaultMessage="Username" />
            </Label>
            <Input
              id="username"
              autoFocus
              value={value}
              onChange={(event) => setValue(event.target.value)}
              disabled={!user || saving}
              inputSize="sm"
            />
            <p className="text-xs text-muted-foreground">
              <FormattedMessage defaultMessage="Used to sign things like emails and stuff" />
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={closeDialog} disabled={saving} variant="outline">
            <FormattedMessage defaultMessage="Cancel" />
          </Button>
          <Button
            onClick={handleSave}
            disabled={!canSave}
            loading={saving}
            variant="primary"
          >
            <FormattedMessage defaultMessage="Save" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
