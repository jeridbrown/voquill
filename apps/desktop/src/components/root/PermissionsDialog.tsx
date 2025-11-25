import { CheckCircle, XCircle, ExternalLink, Clock } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { produceAppState, useAppStore } from "../../store";
import type { PermissionKind } from "../../types/permission.types";
import {
  REQUIRED_PERMISSIONS,
  describePermissionState,
  getPermissionInstructions,
  getPermissionLabel,
  isPermissionAuthorized,
  requestAccessibilityPermission,
  requestMicrophonePermission,
} from "../../utils/permission.utils";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

const getPurposeDescription = (
  kind: PermissionKind,
  intl: ReturnType<typeof useIntl>
): string => {
  const descriptions: Record<PermissionKind, string> = {
    microphone: intl.formatMessage({
      defaultMessage:
        "Allows Voquill to capture audio from your microphone for transcription.",
    }),
    accessibility: intl.formatMessage({
      defaultMessage:
        "Lets you trigger dictation hotkeys while using other applications.",
    }),
  };
  return descriptions[kind];
};

const PermissionRow = ({ kind }: { kind: PermissionKind }) => {
  const intl = useIntl();
  const status = useAppStore((state) => state.permissions[kind]);
  const [requesting, setRequesting] = useState(false);

  const { icon, badgeVariant, chipLabel } = useMemo(() => {
    if (!status) {
      return {
        icon: <Clock className="h-7 w-7 text-muted-foreground" />,
        badgeVariant: "secondary" as const,
        chipLabel: intl.formatMessage({ defaultMessage: "Checking" }),
      };
    }

    if (isPermissionAuthorized(status.state)) {
      return {
        icon: <CheckCircle className="h-7 w-7 text-green-500" />,
        badgeVariant: "default" as const,
        chipLabel: intl.formatMessage({ defaultMessage: "Authorized" }),
      };
    }

    return {
      icon: <XCircle className="h-7 w-7 text-destructive" />,
      badgeVariant: "destructive" as const,
      chipLabel: describePermissionState(status.state),
    };
  }, [status, intl]);

  const instructions = getPermissionInstructions(kind);
  const title = getPermissionLabel(kind);
  const requestingDisabled = status
    ? isPermissionAuthorized(status.state)
    : false;

  const handleRequest = useCallback(async () => {
    if (requesting || requestingDisabled) {
      return;
    }

    setRequesting(true);
    try {
      const requestFn =
        kind === "microphone"
          ? requestMicrophonePermission
          : requestAccessibilityPermission;
      const result = await requestFn();
      produceAppState((draft) => {
        draft.permissions[kind] = result;
      });
    } catch (error) {
      console.error(`Failed to request ${kind} permission`, error);
    } finally {
      setRequesting(false);
    }
  }, [kind, requesting, requestingDisabled]);

  return (
    <div className="flex flex-row gap-4 items-start py-3">
      <div className="leading-none">{icon}</div>
      <div className="flex flex-col gap-1 flex-1">
        <div className="flex flex-row gap-2 items-center">
          <h3 className="text-lg font-semibold">{title}</h3>
          <Badge variant={badgeVariant}>{chipLabel}</Badge>
        </div>
        <p className="text-sm font-medium">{instructions}</p>
        <p className="text-sm text-muted-foreground">
          {getPurposeDescription(kind, intl)}
        </p>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={() => void handleRequest()}
        disabled={requesting || requestingDisabled}
        icon={<ExternalLink className="h-4 w-4" />}
        iconPosition="right"
      >
        <FormattedMessage defaultMessage="Enable" />
      </Button>
    </div>
  );
};

export const PermissionsDialog = () => {
  const permissions = useAppStore((state) => state.permissions);

  const { ready, blocked } = useMemo(() => {
    let known = true;
    let missing = false;

    for (const kind of REQUIRED_PERMISSIONS) {
      const status = permissions[kind];
      if (!status) {
        known = false;
        continue;
      }

      if (!isPermissionAuthorized(status.state)) {
        missing = true;
      }
    }

    return { ready: known, blocked: missing };
  }, [permissions]);

  const open = ready && blocked;

  return (
    <Dialog open={open}>
      <DialogContent className="max-w-md pb-6 backdrop-blur-sm">
        <DialogHeader>
          <DialogTitle>
            <FormattedMessage defaultMessage="Voquill needs permissions to run" />
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-6 mt-4">
          <p className="text-base">
            <FormattedMessage defaultMessage="This dialog will close automatically after you have granted all required permissions." />
          </p>
          <div className="flex flex-col">
            {REQUIRED_PERMISSIONS.map((kind) => (
              <PermissionRow key={kind} kind={kind} />
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
