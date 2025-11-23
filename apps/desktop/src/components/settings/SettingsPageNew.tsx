import {
  Rocket,
  Mic,
  Volume2,
  Keyboard,
  Languages,
  WavesLadder,
  Wand2,
  Lock,
  CreditCard,
  FileText,
  Shield,
  LogOut,
  Trash2,
  UserMinus,
  ExternalLink,
} from "lucide-react";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { invokeHandler } from "@repo/functions";
import { openUrl } from "@tauri-apps/plugin-opener";
import { showErrorSnackbar } from "../../actions/app.actions";
import { setAutoLaunchEnabled } from "../../actions/settings.actions";
import { setPreferredLanguage } from "../../actions/user.actions";
import { loadTones } from "../../actions/tone.actions";
import { getAuthRepo } from "../../repos";
import { produceAppState, useAppStore } from "../../store";
import { getIsPaying } from "../../utils/member.utils";
import {
  getHasEmailProvider,
  getIsSignedIn,
  getMyUser,
} from "../../utils/user.utils";
import {
  normalizeLocaleValue,
  LANGUAGE_DISPLAY_NAMES,
} from "../../utils/language.utils";
import { DEFAULT_LOCALE, type Locale } from "../../i18n/config";
import { ListTile } from "../common/ListTileNew";
import { Section } from "../common/SectionNew";
import { DashboardEntryLayout } from "../dashboard/DashboardEntryLayoutNew";
import { Switch } from "../ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const LANGUAGE_OPTIONS = Object.entries(LANGUAGE_DISPLAY_NAMES) as [
  Locale,
  string,
][];

export default function SettingsPage() {
  const hasEmailProvider = useAppStore(getHasEmailProvider);
  const isPaying = useAppStore(getIsPaying);
  const [manageSubscriptionLoading, setManageSubscriptionLoading] =
    useState(false);
  const isSignedIn = useAppStore(getIsSignedIn);
  const [autoLaunchEnabled, autoLaunchStatus] = useAppStore((state) => [
    state.settings.autoLaunchEnabled,
    state.settings.autoLaunchStatus,
  ]);
  const autoLaunchLoading = autoLaunchStatus === "loading";

  const preferredLanguage = useAppStore((state) => {
    const user = getMyUser(state);
    const normalized = normalizeLocaleValue(user?.preferredLanguage);
    return normalized ?? DEFAULT_LOCALE;
  });

  const handlePreferredLanguageChange = (value: string) => {
    const nextValue = (value as Locale) ?? DEFAULT_LOCALE;
    void setPreferredLanguage(nextValue).then(() => {
      loadTones();
    });
  };

  const openChangePasswordDialog = () => {
    produceAppState((state) => {
      state.settings.changePasswordDialogOpen = true;
    });
  };

  const openTranscriptionDialog = () => {
    produceAppState((draft) => {
      draft.settings.aiTranscriptionDialogOpen = true;
    });
  };

  const openPostProcessingDialog = () => {
    produceAppState((draft) => {
      draft.settings.aiPostProcessingDialogOpen = true;
    });
  };

  const openMicrophoneDialog = () => {
    produceAppState((draft) => {
      draft.settings.microphoneDialogOpen = true;
    });
  };

  const openAudioDialog = () => {
    produceAppState((draft) => {
      draft.settings.audioDialogOpen = true;
    });
  };

  const openShortcutsDialog = () => {
    produceAppState((draft) => {
      draft.settings.shortcutsDialogOpen = true;
    });
  };

  const openClearLocalDataDialog = () => {
    produceAppState((draft) => {
      draft.settings.clearLocalDataDialogOpen = true;
    });
  };

  const openDeleteAccountDialog = () => {
    produceAppState((state) => {
      state.settings.deleteAccountDialog = true;
    });
  };

  const handleToggleAutoLaunch = (checked: boolean) => {
    void setAutoLaunchEnabled(checked);
  };

  const handleManageSubscription = async () => {
    setManageSubscriptionLoading(true);
    try {
      const data = await invokeHandler(
        "stripe/createCustomerPortalSession",
        {}
      );
      openUrl(data.url);
    } catch (error) {
      showErrorSnackbar(error);
    } finally {
      setManageSubscriptionLoading(false);
    }
  };

  const handleSignOut = async () => {
    await getAuthRepo().signOut();
  };

  const general = (
    <Section title={<FormattedMessage defaultMessage="General" />}>
      <ListTile
        title={<FormattedMessage defaultMessage="Start on system startup" />}
        leading={<Rocket className="h-5 w-5" />}
        trailing={
          <Switch
            checked={autoLaunchEnabled}
            disabled={autoLaunchLoading}
            onCheckedChange={handleToggleAutoLaunch}
          />
        }
      />
      <ListTile
        title={<FormattedMessage defaultMessage="Microphone" />}
        leading={<Mic className="h-5 w-5" />}
        onClick={openMicrophoneDialog}
      />
      <ListTile
        title={<FormattedMessage defaultMessage="Audio" />}
        leading={<Volume2 className="h-5 w-5" />}
        onClick={openAudioDialog}
      />
      <ListTile
        title={<FormattedMessage defaultMessage="Hotkey shortcuts" />}
        leading={<Keyboard className="h-5 w-5" />}
        onClick={openShortcutsDialog}
      />
      <ListTile
        title={<FormattedMessage defaultMessage="Preferred language" />}
        leading={<Languages className="h-5 w-5" />}
        trailing={
          <div onClick={(event) => event.stopPropagation()} className="min-w-[160px]">
            <Select value={preferredLanguage} onValueChange={handlePreferredLanguageChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGE_OPTIONS.map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        }
      />
    </Section>
  );

  const processing = (
    <Section
      title={<FormattedMessage defaultMessage="Processing" />}
      description={
        <FormattedMessage defaultMessage="How Voquill should manage your transcriptions." />
      }
    >
      <ListTile
        title={<FormattedMessage defaultMessage="AI transcription" />}
        leading={<WavesLadder className="h-5 w-5" />}
        onClick={openTranscriptionDialog}
      />
      <ListTile
        title={<FormattedMessage defaultMessage="AI post processing" />}
        leading={<Wand2 className="h-5 w-5" />}
        onClick={openPostProcessingDialog}
      />
    </Section>
  );

  const advanced = (
    <Section
      title={<FormattedMessage defaultMessage="Advanced" />}
      description={
        <FormattedMessage defaultMessage="Manage your account preferences and settings." />
      }
    >
      {hasEmailProvider && (
        <ListTile
          title={<FormattedMessage defaultMessage="Change password" />}
          leading={<Lock className="h-5 w-5" />}
          onClick={openChangePasswordDialog}
        />
      )}
      {isPaying && (
        <ListTile
          title={<FormattedMessage defaultMessage="Manage subscription" />}
          leading={<CreditCard className="h-5 w-5" />}
          onClick={handleManageSubscription}
          disabled={manageSubscriptionLoading}
          trailing={<ExternalLink className="h-4 w-4" />}
        />
      )}
      <ListTile
        title={<FormattedMessage defaultMessage="Terms & conditions" />}
        onClick={() => openUrl("https://voquill.com/terms")}
        trailing={<ExternalLink className="h-4 w-4" />}
        leading={<FileText className="h-5 w-5" />}
      />
      <ListTile
        title={<FormattedMessage defaultMessage="Privacy policy" />}
        onClick={() => openUrl("https://voquill.com/privacy")}
        trailing={<ExternalLink className="h-4 w-4" />}
        leading={<Shield className="h-5 w-5" />}
      />
      {isSignedIn && (
        <ListTile
          title={<FormattedMessage defaultMessage="Sign out" />}
          leading={<LogOut className="h-5 w-5" />}
          onClick={handleSignOut}
        />
      )}
    </Section>
  );

  const dangerZone = (
    <Section
      title={<FormattedMessage defaultMessage="Danger zone" />}
      description={
        <FormattedMessage defaultMessage="Be careful with these actions. They can have significant consequences for your account." />
      }
    >
      <ListTile
        title={<FormattedMessage defaultMessage="Clear local data" />}
        leading={<Trash2 className="h-5 w-5" />}
        onClick={openClearLocalDataDialog}
      />
      {isSignedIn && (
        <ListTile
          className="mt-2"
          title={<FormattedMessage defaultMessage="Delete account" />}
          leading={<UserMinus className="h-5 w-5" />}
          onClick={openDeleteAccountDialog}
        />
      )}
    </Section>
  );

  return (
    <DashboardEntryLayout>
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold mb-8">
          <FormattedMessage defaultMessage="Settings" />
        </h1>
        {general}
        {processing}
        {advanced}
        {dangerZone}
      </div>
    </DashboardEntryLayout>
  );
}
