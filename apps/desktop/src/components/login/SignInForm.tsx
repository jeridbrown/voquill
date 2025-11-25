import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { setMode, submitSignIn } from "../../actions/login.actions";
import { produceAppState, useAppStore } from "../../store";
import { getCanSubmitLogin } from "../../utils/login.utils";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { SignInWithGoogleButton } from "./ProviderButtons";

export const SignInForm = () => {
  const intl = useIntl();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const email = useAppStore((state) => state.login.email);
  const password = useAppStore((state) => state.login.password);
  const canSubmit = useAppStore((state) => getCanSubmitLogin(state));

  const handleClickReset = () => {
    setMode("resetPassword");
  };

  const handleClickRegister = () => {
    setMode("signUp");
  };

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    produceAppState((state) => {
      state.login.email = event.target.value;
    });
  };

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    produceAppState((state) => {
      state.login.password = event.target.value;
    });
  };

  const handleSubmit = async () => {
    await submitSignIn();
  };

  return (
    <div className="flex flex-col gap-4">
      <SignInWithGoogleButton />

      <div className="relative flex items-center">
        <div className="flex-grow border-t border-border" />
        <span className="mx-4 text-sm text-muted-foreground">
          <FormattedMessage defaultMessage="or" />
        </span>
        <div className="flex-grow border-t border-border" />
      </div>

      <div className="flex flex-col gap-1.5">
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

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="password">
          <FormattedMessage defaultMessage="Password" />
        </Label>
        <div className="relative">
          <Input
            id="password"
            type={passwordVisible ? "text" : "password"}
            value={password}
            onChange={handleChangePassword}
            placeholder={intl.formatMessage({ defaultMessage: "Enter your password" })}
            className="pr-10"
          />
          <button
            type="button"
            onClick={() => setPasswordVisible((v) => !v)}
            tabIndex={-1}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground"
          >
            {passwordVisible ? (
              <Eye className="h-4 w-4" />
            ) : (
              <EyeOff className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      <Button
        variant="primary"
        className="w-full"
        disabled={!canSubmit}
        onClick={handleSubmit}
      >
        <FormattedMessage defaultMessage="Log in" />
      </Button>

      <div className="flex flex-row justify-between gap-2">
        <button
          type="button"
          onClick={handleClickReset}
          className="text-sm text-primary hover:underline"
        >
          <FormattedMessage defaultMessage="Forgot?" />
        </button>
        <button
          type="button"
          onClick={handleClickRegister}
          className="text-sm text-primary hover:underline"
        >
          <FormattedMessage defaultMessage="Create account" />
        </button>
      </div>
    </div>
  );
};
