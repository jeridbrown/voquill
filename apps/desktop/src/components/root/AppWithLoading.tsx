import Router from "../../router";
import { useAppStore } from "../../store";
import { LoadingApp } from "./LoadingApp";
import { AppSideEffects } from "./AppSideEffects";
import { useTheme } from "../../hooks/useTheme";

export const AppWithLoading = () => {
  const initialized = useAppStore((state) => state.initialized);
  useTheme();

  return (
    <>
      <AppSideEffects />
      <div className="h-screen w-screen overflow-hidden">
        {initialized ? <Router /> : <LoadingApp />}
      </div>
    </>
  );
};
