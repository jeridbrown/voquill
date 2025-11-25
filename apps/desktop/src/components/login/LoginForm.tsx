import { FormattedMessage } from "react-intl";
import { useSearchParams } from "react-router-dom";
import { useOnExit } from "../../hooks/helper.hooks";
import { useConsumeQueryParams } from "../../hooks/navigation.hooks";
import { INITIAL_LOGIN_STATE, LoginMode } from "../../state/login.state";
import { produceAppState, useAppStore } from "../../store";
import { ResetPasswordForm } from "./ResetPasswordForm";
import { ResetSentForm } from "./ResetSentForm";
import { SignInForm } from "./SignInForm";
import { SignUpForm } from "./SignUpForm";

const mapMode = (mode: string | null): LoginMode | null => {
  if (mode === "register") return "signUp";
  if (mode === "login") return "signIn";
  return null;
};

const useMode = () => {
  const stateMode = useAppStore((state) => state.login.mode);
  const [searchParams] = useSearchParams();
  const queryMode = mapMode(searchParams.get("mode"));
  return queryMode || stateMode;
};

export const LoginForm = () => {
  const mode = useMode();
  const errorMessage = useAppStore((state) => state.login.errorMessage);

  useOnExit(() => {
    produceAppState((draft) => {
      draft.login = INITIAL_LOGIN_STATE;
    });
  });

  useConsumeQueryParams(["mode"], ([mode]) => {
    produceAppState((draft) => {
      const mapped = mapMode(mode);
      if (mapped) {
        draft.login.mode = mapped;
      }
    });
  });

  return (
    <div className="flex flex-col gap-3">
      <p className="text-base font-bold">
        {mode === "signIn" && <FormattedMessage defaultMessage="Sign in" />}
        {mode === "signUp" && <FormattedMessage defaultMessage="Sign up" />}
        {mode === "resetPassword" && (
          <FormattedMessage defaultMessage="Reset password" />
        )}
        {mode === "passwordResetSent" && (
          <FormattedMessage defaultMessage="Email sent" />
        )}
      </p>

      {mode === "signIn" && <SignInForm />}
      {mode === "signUp" && <SignUpForm />}
      {mode === "resetPassword" && <ResetPasswordForm />}
      {mode === "passwordResetSent" && <ResetSentForm />}

      <p className="text-xs text-muted-foreground text-center max-w-[300px] self-center">
        <FormattedMessage defaultMessage="By using this service, you agree to our" />{" "}
        <a href="/terms" className="underline hover:text-foreground">
          <FormattedMessage defaultMessage="Terms & Conditions" />
        </a>{" "}
        <FormattedMessage defaultMessage="and" />{" "}
        <a href="/privacy" className="underline hover:text-foreground">
          <FormattedMessage defaultMessage="Privacy Policy" />
        </a>
      </p>

      {errorMessage && (
        <p className="text-destructive text-center">{errorMessage}</p>
      )}
    </div>
  );
};
