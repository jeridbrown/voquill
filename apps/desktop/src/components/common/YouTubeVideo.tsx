import { cn } from "../ui/utils/cn";

type YouTubeVideoProps = {
  videoId: string;
  title?: string;
  autoplay?: boolean;
  startSeconds?: number;
  aspectRatio?: number;
  className?: string;
};

/**
 * Responsive embedded YouTube video that can be dropped into any layout.
 */
export function YouTubeVideo({
  videoId,
  title = "YouTube video",
  autoplay = false,
  startSeconds,
  aspectRatio = 16 / 9,
  className,
}: YouTubeVideoProps) {
  const params = new URLSearchParams({
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
  });

  if (autoplay) {
    params.set("autoplay", "1");
    params.set("mute", "1"); // Autoplay works more reliably when muted.
  }

  if (startSeconds !== undefined) {
    params.set("start", String(startSeconds));
  }

  const safeAspectRatio = aspectRatio > 0 ? aspectRatio : 16 / 9;
  const src = `https://www.youtube.com/embed/${videoId}?${params.toString()}`;

  return (
    <div
      className={cn("relative w-full", className)}
      style={{ paddingTop: `${100 / safeAspectRatio}%` }}
    >
      <iframe
        src={src}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="absolute inset-0 w-full h-full rounded-lg shadow-lg border-0"
      />
    </div>
  );
}
