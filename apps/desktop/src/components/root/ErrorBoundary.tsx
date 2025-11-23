import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { PageLayout } from "../common/PageLayoutNew";
import { AppHeader } from "./Header";
import { Button } from "../ui/button";

const ErrorContent = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return (
        <h1 className="text-2xl font-semibold">
          <FormattedMessage defaultMessage="404 - page not found" />
        </h1>
      );
    }

    return (
      <>
        <h1 className="text-2xl font-semibold">
          {error.status} - {error.statusText}
        </h1>
        <p className="text-base">{error.data?.message}</p>
      </>
    );
  }

  return (
    <>
      <h1 className="text-2xl font-semibold">
        <FormattedMessage defaultMessage="Something went wrong." />
      </h1>
      <p className="text-base">{(error as Error).message}</p>
    </>
  );
};

export default function ErrorBoundary() {
  const nav = useNavigate();

  const handleGoHome = () => {
    nav("/");
  };

  return (
    <PageLayout header={<AppHeader />}>
      <div className="w-full h-full flex justify-center items-center text-center pb-32">
        <div className="max-w-2xl flex flex-col gap-6 items-center">
          <ErrorContent />
          <Button variant="default" onClick={handleGoHome}>
            <FormattedMessage defaultMessage="Return home" />
          </Button>
        </div>
      </div>
    </PageLayout>
  );
}
