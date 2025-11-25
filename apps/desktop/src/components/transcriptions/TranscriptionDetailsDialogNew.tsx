import { RotateCcw } from "lucide-react";
import { getRec } from "@repo/utilities";
import { useCallback, useMemo, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { showErrorSnackbar } from "../../actions/app.actions";
import {
  closeTranscriptionDetailsDialog,
  retranscribeTranscription,
} from "../../actions/transcriptions.actions";
import { AppState } from "../../state/app.state";
import { useAppStore } from "../../store";
import { TranscriptionToneMenu } from "./TranscriptionToneMenuNew";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";

const formatModelSizeLabel = (
  modelSize?: string | null,
  unknownLabel: React.ReactNode = "Unknown"
): React.ReactNode => {
  const value = modelSize?.trim();
  if (!value) {
    return unknownLabel;
  }

  return value.charAt(0).toUpperCase() + value.slice(1);
};

const renderTextBlock = (
  label: React.ReactNode,
  value: string | null | undefined,
  options?: { placeholder?: React.ReactNode; monospace?: boolean }
) => {
  const normalized = value?.trim();

  return (
    <div>
      <div className="text-xs text-muted-foreground">{label}</div>
      {normalized ? (
        <div className="mt-1 p-2 rounded bg-accent">
          <div
            className={`text-sm whitespace-pre-wrap break-words ${
              options?.monospace ? "font-mono" : ""
            }`}
          >
            {normalized}
          </div>
        </div>
      ) : (
        <div className="text-sm text-muted-foreground">
          {options?.placeholder ?? (
            <FormattedMessage defaultMessage="Not provided." />
          )}
        </div>
      )}
    </div>
  );
};

const resolveApiKeyLabel = (
  records: AppState["apiKeyById"],
  apiKeyId: string | null | undefined,
  noneLabel: string,
  unknownLabel: string
): string => {
  if (!apiKeyId) {
    return noneLabel;
  }

  const record = records[apiKeyId];
  if (!record) {
    return unknownLabel;
  }

  const suffix = record.keySuffix?.trim();
  if (suffix && suffix.length > 0) {
    return `${record.name} (••••${suffix})`;
  }

  return record.name;
};

export const TranscriptionDetailsDialog = () => {
  const open = useAppStore((state) => state.transcriptions.detailsDialogOpen);
  const transcription = useAppStore((state) => {
    const transcriptionId = state.transcriptions.detailsDialogTranscriptionId;
    if (!transcriptionId) {
      return null;
    }
    return getRec(state.transcriptionById, transcriptionId);
  });
  const apiKeysById = useAppStore((state) => state.apiKeyById);
  const intl = useIntl();
  const [isRetranscribing, setIsRetranscribing] = useState(false);

  const handleClose = useCallback(() => {
    closeTranscriptionDetailsDialog();
  }, []);

  const handleRetranscribe = useCallback(
    async (toneId: string | null) => {
      if (!transcription?.id) {
        showErrorSnackbar(
          intl.formatMessage({
            defaultMessage: "Unable to load transcription details.",
          })
        );
        return;
      }

      try {
        setIsRetranscribing(true);
        await retranscribeTranscription({
          transcriptionId: transcription.id,
          toneId,
        });
      } catch (error) {
        const fallbackMessage = intl.formatMessage({
          defaultMessage: "Unable to retranscribe audio snippet.",
        });
        const message =
          error instanceof Error ? error.message : fallbackMessage;
        showErrorSnackbar(message || fallbackMessage);
      } finally {
        setIsRetranscribing(false);
      }
    },
    [intl, transcription?.id]
  );

  const transcriptionModeLabel = useMemo(() => {
    if (transcription?.transcriptionMode === "api") {
      return <FormattedMessage defaultMessage="API" />;
    }
    if (transcription?.transcriptionMode === "cloud") {
      return <FormattedMessage defaultMessage="Voquill Cloud" />;
    }
    if (transcription?.transcriptionMode === "local") {
      return <FormattedMessage defaultMessage="Local" />;
    }
    return <FormattedMessage defaultMessage="Unknown" />;
  }, [transcription?.transcriptionMode]);

  const transcriptionApiKeyLabel = useMemo(
    () =>
      resolveApiKeyLabel(
        apiKeysById,
        transcription?.transcriptionApiKeyId,
        "None",
        "Unknown"
      ),
    [apiKeysById, transcription?.transcriptionApiKeyId]
  );

  const postProcessModeLabel = useMemo(() => {
    if (transcription?.postProcessMode === "api") {
      return <FormattedMessage defaultMessage="API" />;
    }
    if (transcription?.postProcessMode === "cloud") {
      return <FormattedMessage defaultMessage="Voquill Cloud" />;
    }
    return <FormattedMessage defaultMessage="Disabled" />;
  }, [transcription?.postProcessDevice, transcription?.postProcessMode]);

  const postProcessApiKeyLabel = useMemo(
    () =>
      resolveApiKeyLabel(
        apiKeysById,
        transcription?.postProcessApiKeyId,
        "None",
        "Unknown"
      ),
    [apiKeysById, transcription?.postProcessApiKeyId]
  );

  const modelSizeLabel = useMemo(
    () => formatModelSizeLabel(transcription?.modelSize ?? null, "Unknown"),
    [transcription?.modelSize]
  );

  const deviceLabel = useMemo(() => {
    const value = transcription?.inferenceDevice?.trim();
    return value && value.length > 0 ? (
      value
    ) : (
      <FormattedMessage defaultMessage="Unknown" />
    );
  }, [transcription?.inferenceDevice]);

  const postProcessDeviceLabel = useMemo(() => {
    const value = transcription?.postProcessDevice?.trim();
    return value && value.length > 0 ? (
      value
    ) : (
      <FormattedMessage defaultMessage="Unknown" />
    );
  }, [transcription?.postProcessDevice]);

  const transcriptionPrompt = useMemo(() => {
    const prompt = transcription?.transcriptionPrompt?.trim();
    return prompt && prompt.length > 0 ? prompt : null;
  }, [transcription?.transcriptionPrompt]);

  const rawTranscriptText = useMemo(
    () => transcription?.rawTranscript ?? transcription?.transcript ?? "",
    [transcription?.rawTranscript, transcription?.transcript]
  );

  const postProcessPrompt = useMemo(() => {
    let prompt = transcription?.postProcessPrompt?.trim() ?? "";
    if (rawTranscriptText) {
      prompt = prompt.replace(rawTranscriptText.trim(), "<transcript>");
    }

    return prompt && prompt.length > 0 ? prompt : null;
  }, [transcription?.postProcessPrompt, rawTranscriptText]);

  const finalTranscriptText = transcription?.transcript ?? "";
  const warnings = useMemo(() => {
    if (!transcription?.warnings) {
      return [];
    }
    return transcription.warnings
      .map((warning) => warning.trim())
      .filter((warning) => warning.length > 0);
  }, [transcription?.warnings]);

  return (
    <Dialog open={open} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            <FormattedMessage defaultMessage="Transcription Details" />
          </DialogTitle>
        </DialogHeader>
        {transcription ? (
          <div className="flex flex-col gap-6">
            <div>
              <div className="text-xs uppercase tracking-wide text-muted-foreground mb-2">
                <FormattedMessage defaultMessage="Transcription Step" />
              </div>
              <div className="flex flex-col gap-3">
                <div>
                  <div className="text-xs text-muted-foreground">
                    <FormattedMessage defaultMessage="Mode" />
                  </div>
                  <div className="text-sm font-semibold">
                    {transcriptionModeLabel}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">
                    <FormattedMessage defaultMessage="Device" />
                  </div>
                  <div className="text-sm font-semibold">{deviceLabel}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">
                    <FormattedMessage defaultMessage="Model Size" />
                  </div>
                  <div className="text-sm font-semibold">{modelSizeLabel}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">
                    <FormattedMessage defaultMessage="API Key" />
                  </div>
                  <div className="text-sm font-semibold">
                    {transcriptionApiKeyLabel}
                  </div>
                </div>
                {renderTextBlock(
                  <FormattedMessage defaultMessage="Prompt" />,
                  transcriptionPrompt,
                  {
                    placeholder: (
                      <FormattedMessage defaultMessage="No custom prompt applied." />
                    ),
                    monospace: true,
                  }
                )}
              </div>
            </div>

            <div className="h-px bg-border" />

            <div>
              <div className="text-xs uppercase tracking-wide text-muted-foreground mb-2">
                <FormattedMessage defaultMessage="Post-processing Step" />
              </div>
              <div className="flex flex-col gap-3">
                <div>
                  <div className="text-xs text-muted-foreground">
                    <FormattedMessage defaultMessage="Mode" />
                  </div>
                  <div className="text-sm font-semibold">
                    {postProcessModeLabel}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">
                    <FormattedMessage defaultMessage="Processor" />
                  </div>
                  <div className="text-sm font-semibold">
                    {postProcessDeviceLabel}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">
                    <FormattedMessage defaultMessage="API Key" />
                  </div>
                  <div className="text-sm font-semibold">
                    {postProcessApiKeyLabel}
                  </div>
                </div>
                {renderTextBlock(
                  <FormattedMessage defaultMessage="Prompt" />,
                  postProcessPrompt,
                  {
                    placeholder: (
                      <FormattedMessage defaultMessage="No LLM post-processing was applied." />
                    ),
                    monospace: true,
                  }
                )}
              </div>
            </div>

            <div className="h-px bg-border" />

            <div>
              <div className="text-xs uppercase tracking-wide text-muted-foreground mb-2">
                <FormattedMessage defaultMessage="Outputs" />
              </div>
              <div className="flex flex-col gap-3">
                {renderTextBlock(
                  <FormattedMessage defaultMessage="Raw transcription" />,
                  rawTranscriptText,
                  {
                    placeholder: (
                      <FormattedMessage defaultMessage="Raw transcript unavailable." />
                    ),
                    monospace: true,
                  }
                )}
                {renderTextBlock(
                  <FormattedMessage defaultMessage="Final transcription" />,
                  finalTranscriptText,
                  {
                    placeholder: (
                      <FormattedMessage defaultMessage="Final transcript unavailable." />
                    ),
                    monospace: true,
                  }
                )}
              </div>
            </div>

            <div className="h-px bg-border" />

            <div>
              <div className="text-xs uppercase tracking-wide text-muted-foreground mb-2">
                <FormattedMessage defaultMessage="Warnings" />
              </div>
              <div className="flex flex-col gap-2">
                {warnings.length > 0 ? (
                  warnings.map((warning, index) => (
                    <div key={`warning-${index}`} className="p-2 rounded bg-accent">
                      <div className="text-sm text-warning">{warning}</div>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-muted-foreground">
                    <FormattedMessage defaultMessage="No warnings recorded for this transcription." />
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-sm text-muted-foreground">
            <FormattedMessage defaultMessage="Metadata unavailable for this transcription." />
          </div>
        )}
        <DialogFooter>
          <TranscriptionToneMenu onToneSelect={handleRetranscribe}>
            {({ ref, open }) => (
              <Button
                ref={ref as any}
                icon={<RotateCcw className="h-4 w-4" />}
                iconPosition="left"
                onClick={open}
                disabled={isRetranscribing || !transcription}
                variant="secondary"
              >
                <FormattedMessage defaultMessage="Retranscribe" />
              </Button>
            )}
          </TranscriptionToneMenu>
          <Button onClick={handleClose}>
            <FormattedMessage defaultMessage="Close" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
