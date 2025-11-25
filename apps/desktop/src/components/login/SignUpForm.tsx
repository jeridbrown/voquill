import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { setMode, submitSignUp } from "../../actions/login.actions";
import { produceAppState, useAppStore } from "../../store";
import {
  getCanSubmitSignUp,
  getSignUpConfirmPasswordValidation,
  getSignUpEmailValidation,
  getSignUpPasswordValidation,
} from "../../utils/login.utils";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { SignInWithGoogleButton } from "./ProviderButtons";

export const SignUpForm = () => {
  const intl = useIntl();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const email = useAppStore((state) => state.login.email);
  const password = useAppStore((state) => state.login.password);
  const confirmPassword = useAppStore((state) => state.login.confirmPassword);
  const canSubmit = useAppStore((state) => getCanSubmitSignUp(state));

  const emailValidation = useAppStore((state) =>
    getSignUpEmailValidation(state)
  );
  const passwordValidation = useAppStore((state) =>
    getSignUpPasswordValidation(state)
  );
  const confirmPasswordValidation = useAppStore((state) =>
    getSignUpConfirmPasswordValidation(state)
  );

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

  const handleChangeConfirmPassword = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    produceAppState((state) => {
      state.login.confirmPassword = event.target.value;
    });
  };

  const handleClickLogin = () => {
    setMode("signIn");
  };

  const handleSubmit = async () => {
    await submitSignUp();
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
          className={emailValidation ? "border-destructive" : ""}
        />
        {emailValidation && (
          <p className="text-xs text-destructive">{emailValidation}</p>
        )}
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
            placeholder={intl.formatMessage({ defaultMessage: "Create a password" })}
            className={`pr-10 ${passwordValidation ? "border-destructive" : ""}`}
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
        {passwordValidation && (
          <p className="text-xs text-destructive">{passwordValidation}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="confirmPassword">
          <FormattedMessage defaultMessage="Confirm password" />
        </Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            type={confirmPasswordVisible ? "text" : "password"}
            value={confirmPassword}
            onChange={handleChangeConfirmPassword}
            placeholder={intl.formatMessage({ defaultMessage: "Confirm your password" })}
            className={`pr-10 ${confirmPasswordValidation ? "border-destructive" : ""}`}
          />
          <button
            type="button"
            onClick={() => setConfirmPasswordVisible((v) => !v)}
            tabIndex={-1}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground"
          >
            {confirmPasswordVisible ? (
              <Eye className="h-4 w-4" />
            ) : (
              <EyeOff className="h-4 w-4" />
            )}
          </button>
        </div>
        {confirmPasswordValidation && (
          <p className="text-xs text-destructive">{confirmPasswordValidation}</p>
        )}
      </div>

      <Button
        variant="primary"
        className="w-full"
        disabled={!canSubmit}
        onClick={handleSubmit}
      >
        <FormattedMessage defaultMessage="Create account" />
      </Button>

      <button
        type="button"
        onClick={handleClickLogin}
        className="text-sm text-primary hover:underline self-center"
      >
        <FormattedMessage defaultMessage="Already have an account? Log in" />
      </button>
    </div>
  );
};
