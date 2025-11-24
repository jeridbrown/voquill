import { useEffect } from "react";
import { useAppStore } from "../store";
import { getMyUser } from "../utils/user.utils";

export const useTheme = () => {
  const user = useAppStore((state) => getMyUser(state));
  const preferredTheme = user?.preferredTheme ?? "system";

  useEffect(() => {
    const applyTheme = (theme: "light" | "dark") => {
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    };

    if (preferredTheme === "system") {
      // Listen to system preference
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

      const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
        applyTheme(e.matches ? "dark" : "light");
      };

      // Apply initial theme based on system preference
      handleChange(mediaQuery);

      // Listen for changes
      mediaQuery.addEventListener("change", handleChange);

      return () => {
        mediaQuery.removeEventListener("change", handleChange);
      };
    } else {
      // Apply user's preferred theme
      applyTheme(preferredTheme);
    }
  }, [preferredTheme]);
};
