import { Suspense, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Outlet } from "react-router-dom";
import { usePageName } from "../../hooks/navigation.hooks";
import { HeaderPortalProvider } from "./HeaderPortalContext";
import { LoadingApp } from "./LoadingApp";
import { PermissionSideEffects } from "./PermissionSideEffects";
import { RootDialogs } from "./RootDialogs";
import { RootSideEffects } from "./RootSideEffects";

function ErrorFallback({ error }: { error: Error }) {
  return (
    <div className="p-4">
      <h2>Something went wrong:</h2>
      <pre className="whitespace-pre-wrap">{error.message}</pre>
    </div>
  );
}

export default function Root() {
  const pageTitle = usePageName();

  useEffect(() => {
    document.title = pageTitle ? `${pageTitle} - Voquill` : "Voquill";
  }, [pageTitle]);

  return (
    <>
      <PermissionSideEffects />
      <RootSideEffects />
      <RootDialogs />
      <HeaderPortalProvider>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={<LoadingApp />}>
            <div className="w-full h-full">
              <Outlet />
            </div>
          </Suspense>
        </ErrorBoundary>
      </HeaderPortalProvider>
    </>
  );
}
