import { AudioWaveform } from "../common/AudioWaveform";
import { useAppStore } from "../../store";
import { LinearProgress } from "../ui/progress";

export const RecordingStatusWidget = () => {
  const phase = useAppStore((state) => state.overlayPhase);
  const levels = useAppStore((state) => state.audioLevels);
  const isListening = phase === "recording";
  const isProcessing = phase === "loading";

  return (
    <div
      className="relative flex items-center justify-center px-4 py-1.5 rounded-[18px] min-w-[128px] h-8 pointer-events-none overflow-hidden"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.92)",
        backdropFilter: "blur(14px)",
        boxShadow: "0 10px 35px rgba(0, 0, 0, 0.36)",
      }}
    >
      <div className="relative w-32 h-6">
        {isProcessing ? (
          <div className="flex items-center justify-center w-full h-full">
            <LinearProgress className="w-full h-0.5" />
          </div>
        ) : (
          <AudioWaveform
            levels={levels}
            active={isListening}
            processing={isProcessing}
            strokeColor="#ffffff"
            width={120}
            height={36}
            style={{
              opacity: isProcessing ? 0 : 1,
              transition: "opacity 160ms ease",
            }}
          />
        )}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, rgba(0, 0, 0, 0.9) 0%, transparent 18%, transparent 85%, rgba(0, 0, 0, 0.9) 100%)",
          }}
        />
      </div>
    </div>
  );
};
