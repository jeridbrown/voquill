import React, { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { useBlocker, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

export const PromptLeave = ({
  message = "Are you sure you want to leave this page?",
  when = true,
}: {
  message?: string;
  when?: boolean;
}) => {
  const location = useLocation();

  const blocker = useBlocker((data) => {
    return data.currentLocation.pathname !== data.nextLocation.pathname && when;
  });

  // Reset the blocker if the user cleans the form
  React.useEffect(() => {
    if (blocker.state === "blocked" && !when) {
      blocker.reset();
    }
  }, [blocker, when]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!when) return;

      e.preventDefault();
      e.returnValue = message;
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [message, when, location.pathname]);

  return (
    <Dialog
      open={blocker.state === "blocked"}
      onOpenChange={(open) => !open && blocker.reset?.()}
    >
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>
            <FormattedMessage defaultMessage="Unsaved Changes" />
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground">{message}</p>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={blocker.reset}>
            <FormattedMessage defaultMessage="Stay" />
          </Button>
          <Button variant="primary" onClick={blocker.proceed}>
            <FormattedMessage defaultMessage="Leave" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
