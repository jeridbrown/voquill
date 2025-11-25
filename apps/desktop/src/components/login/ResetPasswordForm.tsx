import { ArrowLeft } from "lucide-react";
import { FormattedMessage, useIntl } from "react-intl";
import { setMode, submitResetPassword } from "../../actions/login.actions";
import { produceAppState, useAppStore } from "../../store";
import { getCanSubmitResetPassword } from "../../utils/login.utils";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export const ResetPasswordForm = () => {
  const intl = useIntl();
  const email = useAppStore((state) => state.login.email);
  const canSubmit = useAppStore((state) => getCanSubmitResetPassword(state));

  const handleClickBack = () => {
    setMode("signIn");
  };

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    produceAppState((state) => {
      state.login.email = event.target.value;
    });
  };

  const handleSubmit = async () => {
    await submitResetPassword();
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      <p className="text-sm text-center">
        <FormattedMessage defaultMessage="Enter your email and we'll send a reset link." />
      </p>

      <div className="flex flex-col gap-1.5 w-full">
        <Label htmlFor="email">
          <FormattedMessage defaultMessage="Email" />
        </Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={handleChangeEmail}
          placeholder={intl.formatMessage({ defaultMessage: "Enter your email" })}
        />
      </div>

      <Button
        variant="primary"
        className="w-full"
        disabled={!canSubmit}
        onClick={handleSubmit}
      >
        <FormattedMessage defaultMessage="Send reset link" />
      </Button>

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
