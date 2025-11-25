import { ArrowUp } from "lucide-react";
import { useCallback, useMemo } from "react";
import Markdown from "react-markdown";
import { FormattedMessage, useIntl } from "react-intl";
import {
  dismissUpdateDialog,
  installAvailableUpdate,
} from "../../actions/updater.actions";
import { useAppStore } from "../../store";
import { formatSize } from "../../utils/format.utils";
import { Alert, AlertDescription } from "../ui/alert";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { LinearProgress } from "../ui/progress";

const formatReleaseDate = (isoDate: string | null) => {
  if (!isoDate) {
    return null;
  }

  const parsed = new Date(isoDate);
  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(parsed);
};

export const UpdateDialog = () => {
  const intl = useIntl();
  const dialogOpen = useAppStore((state) => state.updater.dialogOpen);
  const status = useAppStore((state) => state.updater.status);
  const availableVersion = useAppStore(
    (state) => state.updater.availableVersion
  );
  const currentVersion = useAppStore((state) => state.updater.currentVersion);
  const releaseDate = useAppStore((state) => state.updater.releaseDate);
  const releaseNotes = useAppStore((state) => state.updater.releaseNotes);
  const downloadProgress = useAppStore(
    (state) => state.updater.downloadProgress
  );
  const downloadedBytes = useAppStore((state) => state.updater.downloadedBytes);
  const totalBytes = useAppStore((state) => state.updater.totalBytes);
  const errorMessage = useAppStore((state) => state.updater.errorMessage);

  const isUpdating = status === "downloading" || status === "installing";
  const showProgress = status === "downloading" || status === "installing";

  const versionLabel = availableVersion
    ? intl.formatMessage(
        {
          defaultMessage: "Voquill {version}",
        },
        { version: availableVersion }
      )
    : intl.formatMessage({
        defaultMessage: "A Voquill update",
      });

  const formattedDate = useMemo(
    () => formatReleaseDate(releaseDate),
    [releaseDate]
  );

  const percent = useMemo(() => {
    if (downloadProgress == null) {
      return null;
    }
    const clamped = Math.max(0, Math.min(1, downloadProgress));
    return Math.round(clamped * 100);
  }, [downloadProgress]);

  const progressLabel = useMemo(() => {
    if (downloadedBytes == null || totalBytes == null || totalBytes <= 0) {
      return null;
    }
    return `${formatSize(downloadedBytes)} of ${formatSize(totalBytes)}`;
  }, [downloadedBytes, totalBytes]);

  const currentVersionLabel =
    currentVersion ??
    intl.formatMessage({
      defaultMessage: "unknown",
    });

  const readyToInstallLabel = intl.formatMessage(
    {
      defaultMessage: "{label} is ready to install.",
    },
    { label: versionLabel }
  );

  const currentVersionDescription = intl.formatMessage(
    {
      defaultMessage:
        "You're currently on version {version}. The app will restart after the update finishes.",
    },
    { version: currentVersionLabel }
  );

  const handleClose = useCallback(() => {
    if (isUpdating) {
      return;
    }
    dismissUpdateDialog();
  }, [isUpdating]);

  const handleInstall = useCallback(async () => {
    if (isUpdating) {
      return;
    }
    await installAvailableUpdate();
  }, [isUpdating]);

  return (
    <Dialog
      open={dialogOpen}
      onOpenChange={(isOpen) => !isOpen && !isUpdating && handleClose()}
    >
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            <FormattedMessage defaultMessage="Update available" />
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 mt-4">
          <div className="flex flex-col gap-1">
            <p className="text-base font-semibold">{readyToInstallLabel}</p>
            <p className="text-sm text-muted-foreground">
              {currentVersionDescription}
            </p>
            {formattedDate && (
              <p className="text-xs text-muted-foreground">
                <FormattedMessage
                  defaultMessage="Released on {date}"
                  values={{ date: formattedDate }}
                />
              </p>
            )}
          </div>

          {releaseNotes && (
            <div className="flex flex-col gap-2">
              <p className="text-base">
                <FormattedMessage defaultMessage="What's new" />
              </p>
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <Markdown>{releaseNotes}</Markdown>
              </div>
            </div>
          )}

          {showProgress && (
            <div className="flex flex-col gap-2">
              <LinearProgress
                value={percent ?? undefined}
                indeterminate={percent == null}
              />
              <div className="flex flex-row gap-2 justify-between">
                <span className="text-xs text-muted-foreground">
                  {status === "installing" ? (
                    <FormattedMessage defaultMessage="Installing update..." />
                  ) : (
                    <FormattedMessage defaultMessage="Downloading update..." />
                  )}
                </span>
                {progressLabel && (
                  <span className="text-xs text-muted-foreground">
                    {progressLabel}
                    {percent != null ? ` (${percent}%)` : ""}
                  </span>
                )}
              </div>
            </div>
          )}

          {status === "installing" && (
            <Alert variant="info">
              <AlertDescription>
                <FormattedMessage defaultMessage="Installation in progress. Voquill may restart automatically when finished." />
              </AlertDescription>
            </Alert>
          )}

          {status === "error" && errorMessage && (
            <Alert variant="error">
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleClose} disabled={isUpdating}>
            <FormattedMessage defaultMessage="Later" />
          </Button>
          <Button
            variant="primary"
            onClick={handleInstall}
            disabled={isUpdating}
            loading={isUpdating}
            icon={<ArrowUp className="h-4 w-4" />}
            iconPosition="right"
          >
            <FormattedMessage defaultMessage="Update" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
