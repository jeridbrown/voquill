import {
  Copy,
  Trash2,
  Info,
  Pause,
  Play,
  RotateCcw,
} from "lucide-react";
import { getRec } from "@repo/utilities";
import { convertFileSrc } from "@tauri-apps/api/core";
import dayjs from "dayjs";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useIntl } from "react-intl";
import { showErrorSnackbar, showSnackbar } from "../../actions/app.actions";
import {
  openTranscriptionDetailsDialog,
  retranscribeTranscription,
} from "../../actions/transcriptions.actions";
import { getTranscriptionRepo } from "../../repos";
import { produceAppState, useAppStore } from "../../store";
import { TypographyWithMore } from "../common/TypographyWithMoreNew";
import { TranscriptionToneMenu } from "./TranscriptionToneMenuNew";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { cn } from "../ui/utils/cn";

export type TranscriptionRowProps = {
  id: string;
};

const formatDuration = (durationMs?: number | null): string => {
  if (!durationMs || !Number.isFinite(durationMs)) {
    return "0:00";
  }

  const totalSeconds = Math.max(0, Math.round(durationMs / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

const createSeededRandom = (seed: number) => {
  let value = seed % 2147483647;
  if (value <= 0) {
    value += 2147483646;
  }

  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
};

const DEFAULT_WAVEFORM_BAR_COUNT = 58;
const MIN_WAVEFORM_BAR_VALUE = 0.05;
const MIN_COMPUTED_BAR_COUNT = 24;
const MAX_COMPUTED_BAR_COUNT = 120;
const WAVEFORM_BAR_MIN_WIDTH = 2;
const WAVEFORM_BAR_MAX_WIDTH = 4;
const WAVEFORM_BAR_GAP = 2;

const buildWaveformOutline = (
  seedKey: string,
  durationMs?: number | null,
  points = 28
): number[] => {
  if (points <= 0) {
    return [];
  }

  const durationSeed = Math.round((durationMs ?? 0) / 37);
  const stringSeed = seedKey
    .split("")
    .reduce(
      (accumulator, character) => accumulator + character.charCodeAt(0),
      0
    );
  const combinedSeed = stringSeed * 31 + durationSeed * 17 || 1;
  const random = createSeededRandom(combinedSeed);

  return Array.from({ length: points }, (_, index) => {
    const t = points <= 1 ? 0 : index / (points - 1);
    const eased = Math.pow(t, 0.85);
    const envelope = Math.sin(Math.PI * eased);
    const modulation = 0.45 + random() * 0.55;
    const baseline = 0.12 + random() * 0.2;
    return Math.max(0.12, Math.min(1, envelope * modulation + baseline));
  });
};

export const TranscriptionRow = ({ id }: TranscriptionRowProps) => {
  const intl = useIntl();
  const transcription = useAppStore((state) =>
    getRec(state.transcriptionById, id)
  );

  const hasMetadata = useMemo(() => {
    const model = transcription?.modelSize?.trim();
    const device = transcription?.inferenceDevice?.trim();
    return Boolean(model || device);
  }, [transcription?.inferenceDevice, transcription?.modelSize]);

  const audioSnapshot = transcription?.audio;
  const audioSrc = useMemo(() => {
    if (!audioSnapshot) {
      return null;
    }

    try {
      return convertFileSrc(audioSnapshot.filePath);
    } catch (error) {
      console.error("Failed to resolve audio file path", error);
      return null;
    }
  }, [audioSnapshot?.filePath]);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRetranscribing, setIsRetranscribing] = useState(false);
  const [durationLabel, setDurationLabel] = useState<string | null>(null);
  const [playbackProgress, setPlaybackProgress] = useState(0);
  const [waveformWidth, setWaveformWidth] = useState(0);
  const waveformContainerRef = useRef<HTMLDivElement | null>(null);
  const handleDetailsOpen = useCallback(() => {
    openTranscriptionDetailsDialog(id);
  }, [id]);

  const desiredWaveformBarCount = useMemo(() => {
    if (waveformWidth <= 0) {
      return DEFAULT_WAVEFORM_BAR_COUNT;
    }

    const gap = WAVEFORM_BAR_GAP;
    const availableWidth = waveformWidth;
    const approximateCount = Math.floor(
      (availableWidth + gap) / (WAVEFORM_BAR_MIN_WIDTH + gap)
    );

    return Math.max(
      MIN_COMPUTED_BAR_COUNT,
      Math.min(MAX_COMPUTED_BAR_COUNT, approximateCount)
    );
  }, [waveformWidth]);

  const waveformValues = useMemo(
    () =>
      audioSnapshot
        ? buildWaveformOutline(
            id,
            audioSnapshot.durationMs,
            desiredWaveformBarCount
          )
        : [],
    [audioSnapshot?.durationMs, desiredWaveformBarCount, id]
  );

  const waveformBars = useMemo(() => {
    if (!waveformValues.length) {
      return Array.from(
        { length: desiredWaveformBarCount },
        () => MIN_WAVEFORM_BAR_VALUE
      );
    }

    return waveformValues;
  }, [desiredWaveformBarCount, waveformValues]);

  const computedBarWidth = useMemo(() => {
    if (waveformWidth <= 0 || waveformBars.length === 0) {
      return WAVEFORM_BAR_MIN_WIDTH;
    }

    const totalGaps = WAVEFORM_BAR_GAP * Math.max(waveformBars.length - 1, 0);
    const availableForBars = Math.max(waveformWidth - totalGaps, 0);
    const widthPerBar = availableForBars / waveformBars.length;

    return Math.max(
      WAVEFORM_BAR_MIN_WIDTH,
      Math.min(WAVEFORM_BAR_MAX_WIDTH, widthPerBar)
    );
  }, [waveformBars.length, waveformWidth]);
  const progressPercent = Math.min(Math.max(playbackProgress, 0), 1) * 100;

  useEffect(() => {
    if (audioSnapshot) {
      setDurationLabel(formatDuration(audioSnapshot.durationMs));
    } else {
      setDurationLabel(null);
    }
  }, [audioSnapshot?.durationMs, audioSnapshot?.filePath]);

  useEffect(() => {
    return () => {
      const element = audioRef.current;
      if (element) {
        element.pause();
        element.currentTime = 0;
      }
      setPlaybackProgress(0);
    };
  }, []);

  useEffect(() => {
    const element = audioRef.current;
    if (element) {
      element.pause();
      element.currentTime = 0;
      element.load();
      setIsPlaying(false);
    }
    setPlaybackProgress(0);
  }, [audioSrc]);

  useEffect(() => {
    const element = waveformContainerRef.current;
    if (!element) {
      return;
    }

    const updateWidth = () => {
      setWaveformWidth(element.getBoundingClientRect().width);
    };

    updateWidth();

    if (typeof ResizeObserver === "undefined") {
      if (typeof window !== "undefined") {
        window.addEventListener("resize", updateWidth);
        return () => window.removeEventListener("resize", updateWidth);
      }
      return;
    }

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        setWaveformWidth(entry.contentRect.width);
      }
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, [audioSrc]);

  const handleCopyTranscript = useCallback(
    async (content: string) => {
      try {
        await navigator.clipboard.writeText(content);
        showSnackbar(
          intl.formatMessage({ defaultMessage: "Copied successfully" }),
          { mode: "success" }
        );
      } catch (error) {
        showErrorSnackbar(error);
      }
    },
    [intl]
  );

  const handleDeleteTranscript = useCallback(
    async (id: string) => {
      try {
        produceAppState((draft) => {
          delete draft.transcriptionById[id];
          draft.transcriptions.transcriptionIds =
            draft.transcriptions.transcriptionIds.filter(
              (transcriptionId) => transcriptionId !== id
            );
        });
        await getTranscriptionRepo().deleteTranscription(id);
        showSnackbar(
          intl.formatMessage({ defaultMessage: "Delete successful" }),
          { mode: "success" }
        );
      } catch (error) {
        showErrorSnackbar(error);
      }
    },
    [intl]
  );

  const handlePlaybackToggle = useCallback(async () => {
    const element = audioRef.current;
    if (!element) {
      return;
    }

    try {
      if (element.paused) {
        setPlaybackProgress(0);
        await element.play();
      } else {
        element.pause();
        element.currentTime = 0;
        setPlaybackProgress(0);
      }
    } catch (error) {
      console.error("Failed to toggle audio playback", error);
      showErrorSnackbar(
        intl.formatMessage({ defaultMessage: "Unable to play audio snippet." })
      );
    }
  }, [intl]);

  const handleRetranscribe = useCallback(
    async (toneId: string | null) => {
      if (!audioSnapshot) {
        showErrorSnackbar(
          intl.formatMessage({
            defaultMessage:
              "Audio snapshot unavailable for this transcription.",
          })
        );
        return;
      }

      try {
        const element = audioRef.current;
        if (element) {
          element.pause();
          element.currentTime = 0;
        }
        setPlaybackProgress(0);

        setIsRetranscribing(true);

        await retranscribeTranscription({ transcriptionId: id, toneId });
      } catch (error) {
        console.error("Failed to retranscribe audio", error);
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
    [audioSnapshot, id, intl]
  );

  return (
    <>
      <div className="flex flex-row justify-between items-center mt-6 gap-2">
        <div className="text-sm text-muted-foreground">
          {dayjs(transcription?.createdAt).format("MMM D, YYYY h:mm A")}
        </div>
        <TooltipProvider>
          <div className="flex flex-row gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  aria-label={intl.formatMessage({
                    defaultMessage: "View transcription details",
                  })}
                  onClick={handleDetailsOpen}
                  className="p-1 rounded hover:bg-gray-600 hover:text-white transition-colors"
                >
                  <Info className="h-4 w-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                {intl.formatMessage({
                  defaultMessage: "View transcription details",
                })}
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  aria-label={intl.formatMessage({
                    defaultMessage: "Copy transcript",
                  })}
                  onClick={() =>
                    handleCopyTranscript(transcription?.transcript || "")
                  }
                  className="p-1 rounded hover:bg-gray-600 hover:text-white transition-colors"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                {intl.formatMessage({ defaultMessage: "Copy transcript" })}
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  aria-label={intl.formatMessage({
                    defaultMessage: "Delete transcript",
                  })}
                  onClick={() => handleDeleteTranscript(id)}
                  className="p-1 rounded hover:bg-gray-600 hover:text-white transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                {intl.formatMessage({ defaultMessage: "Delete transcript" })}
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </div>
      <TypographyWithMore variant="body2" maxLines={3} className="mt-2">
        {transcription?.transcript}
      </TypographyWithMore>
      {audioSnapshot && audioSrc && (
        <>
          <div className="mt-6 flex items-center rounded-full border border-border bg-accent px-2 py-0.5 gap-2 w-full max-w-[350px]">
            <button
              aria-label={
                isPlaying
                  ? intl.formatMessage({ defaultMessage: "Pause audio" })
                  : intl.formatMessage({ defaultMessage: "Play audio" })
              }
              onClick={handlePlaybackToggle}
              disabled={isRetranscribing}
              className="p-1 disabled:opacity-50"
            >
              {isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </button>
            <div className="text-sm text-muted-foreground min-w-[42px] font-mono">
              {durationLabel ?? formatDuration(audioSnapshot.durationMs)}
            </div>
            <div
              ref={waveformContainerRef}
              className="flex items-center gap-[2px] flex-1 h-[22px] mx-1 relative overflow-hidden"
            >
              <div className="absolute inset-0 pointer-events-none">
                <div
                  className="absolute top-0 bottom-0 bg-accent opacity-50 transition-[left] duration-[140ms] linear"
                  style={{
                    left: `${progressPercent}%`,
                    right: 0,
                  }}
                />
              </div>
              {waveformBars.map((value, index) => (
                <div
                  key={`wave-bar-${index}`}
                  className="flex-none rounded-sm bg-primary transition-opacity duration-[140ms]"
                  style={{
                    width: `${computedBarWidth}px`,
                    height: `${Math.round(35 + value * 55)}%`,
                  }}
                />
              ))}
            </div>
            <TooltipProvider>
              <TranscriptionToneMenu onToneSelect={handleRetranscribe}>
                {({ ref, open }) => (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span ref={ref as any} className="inline-flex">
                        <button
                          aria-label={intl.formatMessage({
                            defaultMessage: "Retranscribe audio",
                          })}
                          onClick={open}
                          disabled={isRetranscribing}
                          className="p-1 disabled:opacity-50"
                        >
                          <RotateCcw className="h-4 w-4" />
                        </button>
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      {intl.formatMessage({
                        defaultMessage: "Retranscribe audio clip",
                      })}
                    </TooltipContent>
                  </Tooltip>
                )}
              </TranscriptionToneMenu>
            </TooltipProvider>
          </div>
          <audio
            ref={audioRef}
            hidden
            onPlay={() => setIsPlaying(true)}
            onPause={() => {
              setIsPlaying(false);
              const element = audioRef.current;
              if (element && (element.paused || element.ended)) {
                const { duration } = element;
                if (Number.isFinite(duration) && duration > 0) {
                  setPlaybackProgress(element.currentTime / duration);
                }
              }
            }}
            onEnded={() => {
              setIsPlaying(false);
              const element = audioRef.current;
              if (element) {
                element.currentTime = 0;
              }
              setPlaybackProgress(0);
            }}
            onLoadedMetadata={() => {
              const element = audioRef.current;
              if (!element) {
                return;
              }
              if (Number.isFinite(element.duration) && element.duration > 0) {
                setDurationLabel(
                  formatDuration(Math.round(element.duration * 1000))
                );
              }
              setPlaybackProgress(0);
            }}
            onTimeUpdate={() => {
              const element = audioRef.current;
              if (!element) {
                return;
              }
              const { currentTime, duration } = element;
              if (!Number.isFinite(duration) || duration <= 0) {
                setPlaybackProgress(0);
                return;
              }
              setPlaybackProgress(
                Math.min(Math.max(currentTime / duration, 0), 1)
              );
            }}
          >
            <source src={audioSrc} type="audio/wav" />
          </audio>
        </>
      )}
      <div className="h-px bg-border mt-8" />
    </>
  );
};
