import { ArrowLeft } from "lucide-react";
import { FormattedMessage } from "react-intl";
import { setMode } from "../../actions/login.actions";
import { Button } from "../ui/button";

export const ResetSentForm = () => {
  const handleClickBack = () => {
    setMode("signIn");
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      <p className="text-sm text-center">
        <FormattedMessage defaultMessage="An email has been sent to you with a link to reset your password." />
      </p>

      <Button
        variant="ghost"
        size="sm"
        onClick={handleClickBack}
        icon={<ArrowLeft className="h-4 w-4" />}
      >
        <FormattedMessage defaultMessage="Back" />
      </Button>
    </div>
  );
};
