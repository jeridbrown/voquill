import { Nullable } from "@repo/types";
import { invoke } from "@tauri-apps/api/core";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FormattedMessage } from "react-intl";
import { setPreferredMicrophone } from "../../actions/user.actions";
import { useMyUser } from "../../hooks/user.hooks";
import { produceAppState, useAppStore } from "../../store";
import { buildWaveFile, ensureFloat32Array } from "../../utils/audio.utils";
import { AudioWaveform } from "../common/AudioWaveform";
import { SettingSection } from "../common/SettingSectionNew";
import { Alert, AlertDescription } from "../ui/alert";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { CircularProgress } from "../ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const AUTO_OPTION_VALUE = "__microphone_auto__";

type InputDeviceDescriptor = {
  label: string;
  isDefault: boolean;
  caution: boolean;
};

type DeviceOption = {
  value: string;
  label: string;
  isDefault: boolean;
  caution: boolean;
  unavailable?: boolean;
};

type StopRecordingResponse = {
  samples: number[] | Float32Array;
  sampleRate?: number;
};

const createPreviewUrl = (
  rawSamples: number[] | Float32Array,
  sampleRate: number
): string | null => {
  if (!sampleRate || !Number.isFinite(sampleRate) || sampleRate <= 0) {
    return null;
  }

  const samples = ensureFloat32Array(rawSamples ?? []);

  if (!samples || samples.length === 0) {
    return null;
  }

  const wavBuffer = buildWaveFile(samples, sampleRate);
  const blob = new Blob([wavBuffer], { type: "audio/wav" });
  return URL.createObjectURL(blob);
};

export const MicrophoneDialog = () => {
  const open = useAppStore((state) => state.settings.microphoneDialogOpen);
  const overlayPhase = useAppStore((state) => state.overlayPhase);
  const audioLevels = useAppStore((state) => state.audioLevels);
  const user = useMyUser();

  const savedPreference = user?.preferredMicrophone ?? null;

  const [devices, setDevices] = useState<DeviceOption[]>([]);
  const [loadingDevices, setLoadingDevices] = useState(false);
  const [deviceError, setDeviceError] = useState<string | null>(null);

  const [selected, setSelected] = useState<Nullable<string>>(savedPreference);
  const [hasChanges, setHasChanges] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [testState, setTestState] = useState<
    "idle" | "starting" | "recording" | "stopping"
  >("idle");
  const [testError, setTestError] = useState<string | null>(null);
  const previewUrlRef = useRef<string | null>(null);
  const previewAudioRef = useRef<HTMLAudioElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isPreviewPlaying, setIsPreviewPlaying] = useState(false);

  const releasePreviewAudio = useCallback(() => {
    const audio = previewAudioRef.current;
    if (audio) {
      audio.pause();
      audio.src = "";
      previewAudioRef.current = null;
    }
    setIsPreviewPlaying(false);
  }, [setIsPreviewPlaying]);

  const clearPreviewUrl = useCallback(() => {
    releasePreviewAudio();
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = null;
    }
    setPreviewUrl(null);
  }, [releasePreviewAudio]);

  const updatePreviewUrl = useCallback(
    (url: string | null) => {
      releasePreviewAudio();
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
      }
      previewUrlRef.current = url;
      setPreviewUrl(url);
    },
    [releasePreviewAudio]
  );

  useEffect(() => () => clearPreviewUrl(), [clearPreviewUrl]);

  useEffect(() => {
    if (!previewUrl) {
      setIsPreviewPlaying(false);
      return;
    }

    const audio = new Audio(previewUrl);
    audio.preload = "auto";

    const handlePlay = () => setIsPreviewPlaying(true);
    const handlePause = () => setIsPreviewPlaying(false);
    const handleEnded = () => setIsPreviewPlaying(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);

    previewAudioRef.current = audio;

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
      audio.pause();
      if (previewAudioRef.current === audio) {
        previewAudioRef.current = null;
      }
    };
  }, [previewUrl, setIsPreviewPlaying]);

  const loadDevices = useCallback(async () => {
    setLoadingDevices(true);
    setDeviceError(null);
    try {
      const result = await invoke<InputDeviceDescriptor[]>("list_microphones");
      const mapped: DeviceOption[] = result.map((device) => ({
        value: device.label,
        label: device.label,
        isDefault: device.isDefault,
        caution: device.caution,
      }));
      setDevices(mapped);
    } catch (error) {
      console.error("Failed to load microphones", error);
      setDeviceError("Unable to fetch microphones. Please try again.");
    } finally {
      setLoadingDevices(false);
    }
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }
    void loadDevices();
  }, [open, loadDevices]);

  useEffect(() => {
    if (!open) {
      return;
    }
    setSelected(savedPreference);
    setHasChanges(false);
    setSaveError(null);
    setSaveSuccess(false);
  }, [open, savedPreference]);

  const deviceOptions = useMemo(() => {
    const base = [...devices];
    if (selected && !base.some((device) => device.value === selected)) {
      base.push({
        value: selected,
        label: `${selected} (unavailable)`,
        isDefault: false,
        caution: true,
        unavailable: true,
      });
    }
    return base;
  }, [devices, selected]);

  const selectValue = selected ?? AUTO_OPTION_VALUE;

  const handleSelectChange = useCallback(
    (value: string) => {
      const normalized = value === AUTO_OPTION_VALUE ? null : value;
      setSelected(normalized);
      setHasChanges((normalized ?? null) !== (savedPreference ?? null));
      setSaveError(null);
      setSaveSuccess(false);
    },
    [savedPreference]
  );

  const handleSave = useCallback(async () => {
    if (!hasChanges || saving) {
      return;
    }

    setSaving(true);
    setSaveError(null);
    setSaveSuccess(false);

    try {
      await setPreferredMicrophone(selected ?? null);
      setHasChanges(false);
      setSaveSuccess(true);
    } catch (error) {
      setSaveError("Failed to save microphone preference. Please try again.");
    } finally {
      setSaving(false);
    }
  }, [hasChanges, saving, selected]);

  const isGlobalRecording =
    overlayPhase === "recording" || overlayPhase === "loading";
  const isTestRunning = testState === "recording";
  const isTestLoading = testState === "starting";
  const isTestStopping = testState === "stopping";

  const handleStartTest = useCallback(async () => {
    if (isTestRunning || isTestLoading || isGlobalRecording) {
      return;
    }

    setTestError(null);
    clearPreviewUrl();
    setTestState("starting");

    try {
      await invoke<void>("start_recording", {
        args: { preferredMicrophone: selected ?? null },
      });
      setTestState("recording");
    } catch (error) {
      console.error("Failed to start microphone test", error);
      setTestError("Unable to start microphone test. Please try again.");
      setTestState("idle");
    }
  }, [
    clearPreviewUrl,
    isGlobalRecording,
    isTestLoading,
    isTestRunning,
    selected,
  ]);

  const handleStopTest = useCallback(
    async (opts?: { silent?: boolean }) => {
      if (testState !== "recording" && testState !== "starting") {
        return;
      }

      setTestState("stopping");

      try {
        const response = await invoke<StopRecordingResponse>("stop_recording");
        const rate = response.sampleRate ?? 0;
        const samplesArray =
          response.samples instanceof Float32Array
            ? Array.from(response.samples)
            : response.samples;

        if (!opts?.silent) {
          const url = createPreviewUrl(samplesArray ?? [], rate);
          if (url) {
            updatePreviewUrl(url);
          } else {
            updatePreviewUrl(null);
            setTestError(
              "We didn't detect any audio. Try speaking while the test is running."
            );
          }
        } else {
          updatePreviewUrl(null);
        }
      } catch (error) {
        console.error("Failed to stop microphone test", error);
        if (!opts?.silent) {
          setTestError("Unable to stop microphone test. Please try again.");
        }
      } finally {
        setTestState("idle");
        produceAppState((draft) => {
          draft.audioLevels = [];
        });
      }
    },
    [testState, updatePreviewUrl]
  );

  const handleTogglePreview = useCallback(() => {
    const audio = previewAudioRef.current;
    if (!audio) {
      return;
    }

    if (isPreviewPlaying) {
      audio.pause();
      return;
    }

    if (
      audio.ended ||
      (audio.duration && audio.currentTime >= audio.duration)
    ) {
      audio.currentTime = 0;
    }

    audio
      .play()
      .then(() => {
        setTestError(null);
        setIsPreviewPlaying(true);
      })
      .catch((error) => {
        console.error("Failed to play recorded preview", error);
        setTestError("Unable to play the recorded preview.");
        setIsPreviewPlaying(false);
      });
  }, [isPreviewPlaying, setIsPreviewPlaying, setTestError]);

  useEffect(() => {
    if (!open) {
      return;
    }

    if (
      (testState === "recording" || testState === "starting") &&
      isGlobalRecording
    ) {
      void handleStopTest({ silent: true });
    }
  }, [handleStopTest, isGlobalRecording, open, testState]);

  useEffect(() => {
    if (!open) {
      if (testState !== "idle") {
        void handleStopTest({ silent: true });
      }
      clearPreviewUrl();
    }
  }, [clearPreviewUrl, handleStopTest, open, testState]);

  const handleClose = useCallback(() => {
    void handleStopTest({ silent: true });
    clearPreviewUrl();
    produceAppState((draft) => {
      draft.settings.microphoneDialogOpen = false;
    });
  }, [clearPreviewUrl, handleStopTest]);

  const disableStartButton =
    isGlobalRecording || isTestLoading || loadingDevices || saving;
  const disableStopButton = isTestStopping;

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && handleClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            <FormattedMessage defaultMessage="Microphone settings" />
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-6 py-4 border-t border-b">
          <div className="flex flex-col gap-3">
            <SettingSection
              title={<FormattedMessage defaultMessage="Preferred microphone" />}
              description={
                <FormattedMessage defaultMessage="Choose which microphone Voquill should use when recording. Automatic picks the best available device each time." />
              }
            />
            <div className="flex flex-col gap-2">
              <Label htmlFor="microphone-select">
                <FormattedMessage defaultMessage="Microphone" />
              </Label>
              <Select
                value={selectValue}
                onValueChange={handleSelectChange}
                disabled={loadingDevices}
              >
                <SelectTrigger id="microphone-select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={AUTO_OPTION_VALUE}>
                    <div className="flex flex-row justify-between items-center gap-2 w-full">
                      <span>
                        <FormattedMessage defaultMessage="Automatic" />
                      </span>
                      <Badge variant="default">
                        <FormattedMessage defaultMessage="Recommended" />
                      </Badge>
                    </div>
                  </SelectItem>
                  <SelectSeparator />
                  {deviceOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex flex-row justify-between gap-4 w-full">
                        <div>
                          <div>{option.label}</div>
                          {option.unavailable ? (
                            <div className="text-xs text-yellow-600">
                              <FormattedMessage defaultMessage="Currently unavailable" />
                            </div>
                          ) : option.caution ? (
                            <div className="text-xs text-muted-foreground">
                              <FormattedMessage defaultMessage="May provide lower audio quality" />
                            </div>
                          ) : null}
                        </div>
                        <div className="flex flex-row gap-1.5 items-center">
                          {option.isDefault && (
                            <Badge variant="outline">
                              <FormattedMessage defaultMessage="Default" />
                            </Badge>
                          )}
                          {option.caution && !option.unavailable && (
                            <Badge
                              variant="outline"
                              className="border-yellow-500 text-yellow-600"
                            >
                              <FormattedMessage defaultMessage="Caution" />
                            </Badge>
                          )}
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <Button
                variant="ghost"
                onClick={loadDevices}
                size="sm"
                disabled={loadingDevices}
              >
                <FormattedMessage defaultMessage="Refresh devices" />
              </Button>
              {loadingDevices && <CircularProgress size={18} />}
            </div>
            {deviceError && (
              <Alert variant="error">
                <AlertDescription>{deviceError}</AlertDescription>
              </Alert>
            )}
            {saveError && (
              <Alert variant="error">
                <AlertDescription>{saveError}</AlertDescription>
              </Alert>
            )}
            {saveSuccess && (
              <Alert variant="success">
                <AlertDescription>
                  <FormattedMessage defaultMessage="Preference saved." />
                </AlertDescription>
              </Alert>
            )}
          </div>

          <hr className="border-border" />

          <div className="flex flex-col gap-3">
            <SettingSection
              title={<FormattedMessage defaultMessage="Test your microphone" />}
              description={
                <FormattedMessage defaultMessage="Start a short test to see live audio levels and play back what was recorded." />
              }
            />
            <div className="relative w-full h-24 overflow-hidden flex items-center">
              <AudioWaveform
                levels={audioLevels}
                active={isTestRunning}
                processing={isTestLoading || isTestStopping}
                style={{ width: "100%", height: "100%" }}
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(90deg, hsl(var(--background)) 0%, transparent 18%, transparent 82%, hsl(var(--background)) 100%)",
                }}
              />
            </div>
            <div className="flex flex-row gap-3 items-center">
              <Button
                variant={isTestRunning ? "outline" : "primary"}
                className={isTestRunning ? "text-destructive border-destructive hover:bg-destructive/10" : ""}
                onClick={
                  isTestRunning ? () => void handleStopTest() : handleStartTest
                }
                loading={isTestLoading || isTestStopping}
                disabled={
                  isTestRunning ? disableStopButton : disableStartButton
                }
              >
                {isTestRunning ? (
                  <FormattedMessage defaultMessage="Stop test" />
                ) : (
                  <FormattedMessage defaultMessage="Start test" />
                )}
              </Button>
              <Button
                variant="outline"
                disabled={previewUrl == null}
                onClick={handleTogglePreview}
              >
                {isPreviewPlaying ? (
                  <FormattedMessage defaultMessage="Pause preview" />
                ) : (
                  <FormattedMessage defaultMessage="Play preview" />
                )}
              </Button>
            </div>
            {isGlobalRecording && (
              <Alert variant="info">
                <AlertDescription>
                  <FormattedMessage defaultMessage="You cannot start a microphone test while a transcription is in progress." />
                </AlertDescription>
              </Alert>
            )}
            {testError && (
              <Alert variant="warning">
                <AlertDescription>{testError}</AlertDescription>
              </Alert>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            <FormattedMessage defaultMessage="Close" />
          </Button>
          <Button
            onClick={handleSave}
            loading={saving}
            disabled={!hasChanges || saving}
            variant="primary"
          >
            <FormattedMessage defaultMessage="Save changes" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
