import * as React from "react";
import { FormattedMessage } from "react-intl";
import { Button, ButtonProps } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

export type ConfirmDialogProps = {
  isOpen: boolean;
  title: React.ReactNode;
  content: React.ReactNode;
  onCancel: () => void;
  onConfirm: () => void;
  confirmLabel?: React.ReactNode;
  cancelLabel?: React.ReactNode;
  confirmButtonProps?: Partial<ButtonProps>;
  cancelButtonProps?: Partial<ButtonProps>;
};

export const ConfirmDialog = ({
  isOpen,
  title,
  content,
  onCancel,
  onConfirm,
  confirmLabel,
  cancelLabel,
  confirmButtonProps,
  cancelButtonProps,
}: ConfirmDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onCancel()}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle><span>{title}</span></DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground">{content}</p>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={onCancel} {...cancelButtonProps}>
            {cancelLabel ?? <FormattedMessage defaultMessage="Cancel" />}
          </Button>
          <Button variant="primary" onClick={onConfirm} {...confirmButtonProps}>
            {confirmLabel ?? <FormattedMessage defaultMessage="Confirm" />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
