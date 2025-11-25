import { toast } from "sonner";

export type ShowSnackbarOpts = {
  duration?: number;
  transitionDuration?: number;
  mode?: "info" | "success" | "error";
};

export const showSnackbar = (
  message: string,
  opts?: ShowSnackbarOpts,
): void => {
  const defaultDuration = message.length > 100 ? 10000 : 5000;
  const duration = opts?.duration ?? defaultDuration;
  const mode = opts?.mode ?? "info";

  switch (mode) {
    case "success":
      toast.success(message, { duration });
      break;
    case "error":
      toast.error(message, { duration });
      break;
    case "info":
    default:
      toast.info(message, { duration });
      break;
  }
};

export const showErrorSnackbar = (message: unknown): void => {
  showSnackbar(String(message), { mode: "error" });
};
