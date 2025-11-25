import { groqTestIntegration } from "@repo/voice-ai";
import { Plus, Trash2, ExternalLink } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import {
  createApiKey,
  deleteApiKey,
  loadApiKeys,
} from "../../actions/api-key.actions";
import { showErrorSnackbar, showSnackbar } from "../../actions/app.actions";
import {
  SettingsApiKey,
  SettingsApiKeyProvider,
} from "../../state/settings.state";
import { useAppStore } from "../../store";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { CircularProgress } from "../ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

type ApiKeyListProps = {
  selectedApiKeyId: string | null;
  onChange: (id: string | null) => void;
};

type AddApiKeyCardProps = {
  onSave: (
    name: string,
    provider: SettingsApiKeyProvider,
    key: string
  ) => Promise<void>;
  onCancel: () => void;
};

const AddApiKeyCard = ({ onSave, onCancel }: AddApiKeyCardProps) => {
  const [name, setName] = useState("");
  const [provider, setProvider] = useState<SettingsApiKeyProvider>("groq");
  const [key, setKey] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSave = useCallback(async () => {
    if (!name || !key || saving) {
      return;
    }

    setSaving(true);
    try {
      await onSave(name, provider, key);
      setName("");
      setKey("");
    } catch (error) {
      console.error("Failed to save API key", error);
    } finally {
      setSaving(false);
    }
  }, [name, key, provider, onSave, saving]);

  return (
    <div className="p-4 border border-border rounded-lg flex flex-col gap-3">
      <div className="flex flex-col gap-2">
        <Label htmlFor="key-name">
          <FormattedMessage defaultMessage="Key name" />
        </Label>
        <Input
          id="key-name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="e.g., My Groq Key"
          inputSize="sm"
          disabled={saving}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="provider">
          <FormattedMessage defaultMessage="Provider" />
        </Label>
        <Select
          value={provider}
          onValueChange={(value) =>
            setProvider(value as SettingsApiKeyProvider)
          }
          disabled={saving}
        >
          <SelectTrigger id="provider" className="h-9">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="groq">Groq</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="api-key">
          <FormattedMessage defaultMessage="API key" />
        </Label>
        <Input
          id="api-key"
          value={key}
          onChange={(event) => setKey(event.target.value)}
          placeholder="Paste your API key"
          inputSize="sm"
          type="password"
          disabled={saving}
        />
      </div>
      <div className="flex gap-2 justify-end">
        <Button variant="outline" onClick={onCancel} size="sm" disabled={saving}>
          <FormattedMessage defaultMessage="Cancel" />
        </Button>
        <Button
          variant="primary"
          size="sm"
          onClick={handleSave}
          disabled={!name || !key || saving}
          loading={saving}
        >
          {saving ? (
            <FormattedMessage defaultMessage="Saving..." />
          ) : (
            <FormattedMessage defaultMessage="Save" />
          )}
        </Button>
      </div>
    </div>
  );
};

const testApiKey = async (apiKey: SettingsApiKey): Promise<boolean> => {
  if (!apiKey.keyFull) {
    throw new Error("The stored API key value is unavailable.");
  }

  switch (apiKey.provider) {
    case "groq":
      return groqTestIntegration({ apiKey: apiKey.keyFull });
    default:
      throw new Error("Testing is not available for this provider.");
  }
};

const ApiKeyCard = ({
  apiKey,
  selected,
  onSelect,
  onTest,
  onDelete,
  testing,
  deleting,
}: {
  apiKey: SettingsApiKey;
  selected: boolean;
  onSelect: () => void;
  onTest: () => void;
  testing: boolean;
  onDelete: () => void;
  deleting: boolean;
}) => (
  <div
    onClick={onSelect}
    className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 flex items-center justify-between gap-4 w-full ${
      selected
        ? "border-primary ring-1 ring-primary"
        : "border-border hover:border-muted-foreground"
    }`}
  >
    <div className="flex flex-col gap-1 flex-1 min-w-0">
      <p className="text-base font-semibold">{apiKey.name}</p>
      <p className="text-sm text-muted-foreground">
        {apiKey.provider.toUpperCase()}
      </p>
      {apiKey.keySuffix ? (
        <p className="text-xs text-muted-foreground">
          <FormattedMessage
            defaultMessage="Ends with {suffix}"
            values={{ suffix: apiKey.keySuffix }}
          />
        </p>
      ) : null}
    </div>
    <div className="flex flex-row gap-2 items-center">
      <Button
        variant="outline"
        size="sm"
        onClick={(event) => {
          event.stopPropagation();
          onTest();
        }}
        disabled={testing || deleting}
        loading={testing}
      >
        {testing ? (
          <FormattedMessage defaultMessage="Testing..." />
        ) : (
          <FormattedMessage defaultMessage="Test" />
        )}
      </Button>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="sm"
              variant="ghost"
              onClick={(event) => {
                event.stopPropagation();
                onDelete();
              }}
              disabled={deleting || testing}
              className="h-8 w-8 p-0 text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <FormattedMessage defaultMessage="Delete key" />
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  </div>
);

const generateApiKeyId = () =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

export const ApiKeyList = ({ selectedApiKeyId, onChange }: ApiKeyListProps) => {
  const apiKeys = useAppStore((state) => state.settings.apiKeys);
  const status = useAppStore((state) => state.settings.apiKeysStatus);
  const [showAddCard, setShowAddCard] = useState(false);
  const [testingApiKeyId, setTestingApiKeyId] = useState<string | null>(null);
  const [apiKeyToDelete, setApiKeyToDelete] = useState<SettingsApiKey | null>(
    null
  );
  const [deletingApiKeyId, setDeletingApiKeyId] = useState<string | null>(null);

  useEffect(() => {
    if (apiKeys.length === 0) {
      return;
    }

    if (selectedApiKeyId === null) {
      onChange(apiKeys[0]?.id ?? null);
      return;
    }

    const exists = apiKeys.some((key) => key.id === selectedApiKeyId);
    if (!exists) {
      onChange(apiKeys[0]?.id ?? null);
    }
  }, [apiKeys, selectedApiKeyId, onChange]);

  const handleAddApiKey = useCallback(
    async (name: string, provider: SettingsApiKeyProvider, key: string) => {
      const created = await createApiKey({
        id: generateApiKeyId(),
        name,
        provider,
        key,
      });

      onChange(created.id);
      setShowAddCard(false);
    },
    [onChange]
  );

  const handleTestApiKey = useCallback(async (apiKey: SettingsApiKey) => {
    setTestingApiKeyId(apiKey.id);
    try {
      const success = await testApiKey(apiKey);
      if (success) {
        showSnackbar("Integration successful", { mode: "success" });
      } else {
        showErrorSnackbar("Integration failed. Provide a valid API key.");
      }
    } catch (error) {
      showErrorSnackbar(
        error instanceof Error ? error.message : "API key test failed."
      );
    } finally {
      setTestingApiKeyId(null);
    }
  }, []);

  const handleRequestDelete = useCallback((apiKey: SettingsApiKey) => {
    setApiKeyToDelete(apiKey);
  }, []);

  const handleCloseDeleteDialog = useCallback(() => {
    if (deletingApiKeyId !== null) {
      return;
    }
    setApiKeyToDelete(null);
  }, [deletingApiKeyId]);

  const handleConfirmDelete = useCallback(async () => {
    if (!apiKeyToDelete) {
      return;
    }

    setDeletingApiKeyId(apiKeyToDelete.id);
    try {
      await deleteApiKey(apiKeyToDelete.id);
      showSnackbar("API key deleted", { mode: "success" });
      setApiKeyToDelete(null);
    } catch (error) {
      // Errors are surfaced via deleteApiKey.
    } finally {
      setDeletingApiKeyId(null);
    }
  }, [apiKeyToDelete, showSnackbar, deleteApiKey]);

  const handleRetryLoad = useCallback(() => {
    void loadApiKeys();
  }, []);

  const loadingState = (
    <div className="flex flex-col gap-2 items-center">
      <CircularProgress size={24} />
      <p className="text-sm text-muted-foreground">
        <FormattedMessage defaultMessage="Loading API keys…" />
      </p>
    </div>
  );

  const errorState = (
    <div className="flex flex-col gap-3 items-start">
      <p className="text-base font-semibold">
        <FormattedMessage defaultMessage="Failed to load API keys" />
      </p>
      <p className="text-sm text-muted-foreground">
        <FormattedMessage defaultMessage="We couldn't load your saved API keys. Please try again." />
      </p>
      <Button variant="outline" onClick={handleRetryLoad}>
        <FormattedMessage defaultMessage="Retry" />
      </Button>
    </div>
  );

  const emptyState = (
    <div className="flex flex-col gap-3 items-start">
      <p className="text-base font-semibold">
        <FormattedMessage defaultMessage="No API keys yet" />
      </p>
      <p className="text-sm text-muted-foreground">
        <FormattedMessage defaultMessage="Connect a transcription provider like Groq with your API key." />
      </p>
      <Button
        variant="primary"
        onClick={() => setShowAddCard(true)}
        icon={<Plus className="h-4 w-4" />}
        iconPosition="left"
      >
        <FormattedMessage defaultMessage="Add API key" />
      </Button>
    </div>
  );

  const shouldShowLoading = status === "loading" && apiKeys.length === 0;
  const shouldShowError = status === "error" && apiKeys.length === 0;
  const shouldShowEmpty =
    apiKeys.length === 0 &&
    !showAddCard &&
    !shouldShowLoading &&
    !shouldShowError;

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex flex-row gap-1 items-center">
        <span className="text-sm text-muted-foreground">
          <FormattedMessage defaultMessage="Grab an API key from the" />
        </span>
        <a
          href="https://console.groq.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-primary hover:underline text-sm"
        >
          <FormattedMessage defaultMessage="Groq Console" />
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
      {shouldShowLoading ? (
        loadingState
      ) : shouldShowError ? (
        errorState
      ) : shouldShowEmpty ? (
        emptyState
      ) : (
        <div className="flex flex-col gap-3 items-stretch w-full">
          {apiKeys.map((apiKey) => (
            <ApiKeyCard
              key={apiKey.id}
              apiKey={apiKey}
              selected={selectedApiKeyId === apiKey.id}
              onSelect={() => onChange(apiKey.id)}
              onTest={() => handleTestApiKey(apiKey)}
              testing={testingApiKeyId === apiKey.id}
              onDelete={() => handleRequestDelete(apiKey)}
              deleting={deletingApiKeyId === apiKey.id}
            />
          ))}
        </div>
      )}
      {showAddCard ? (
        <AddApiKeyCard
          onSave={handleAddApiKey}
          onCancel={() => setShowAddCard(false)}
        />
      ) : apiKeys.length > 0 || shouldShowError ? (
        <Button
          variant="outline"
          onClick={() => setShowAddCard(true)}
          icon={<Plus className="h-4 w-4" />}
          iconPosition="left"
          className="self-start"
        >
          <FormattedMessage defaultMessage="Add another key" />
        </Button>
      ) : null}
      <Dialog
        open={apiKeyToDelete !== null}
        onOpenChange={(isOpen) => !isOpen && handleCloseDeleteDialog()}
      >
        <DialogContent className="max-w-xs">
          <DialogHeader>
            <DialogTitle>
              <FormattedMessage defaultMessage="Delete API key" />
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-2 mt-4">
            <p className="text-sm">
              <FormattedMessage
                defaultMessage="Are you sure you want to delete the API key {keyName}?"
                values={{
                  keyName: (
                    <span className="font-semibold">
                      {apiKeyToDelete?.name ?? "this API key"}
                    </span>
                  ),
                }}
              />
            </p>
            <p className="text-sm text-muted-foreground">
              <FormattedMessage defaultMessage="Removing the key signs you out of that provider on this device." />
            </p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={handleCloseDeleteDialog}
              disabled={deletingApiKeyId !== null}
            >
              <FormattedMessage defaultMessage="Cancel" />
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirmDelete}
              disabled={deletingApiKeyId !== null}
              loading={deletingApiKeyId !== null}
            >
              {deletingApiKeyId !== null ? (
                <FormattedMessage defaultMessage="Deleting..." />
              ) : (
                <FormattedMessage defaultMessage="Delete" />
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
