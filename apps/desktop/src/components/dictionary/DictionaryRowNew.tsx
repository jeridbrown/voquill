import { ArrowRight, Trash2 } from "lucide-react";
import { getRec } from "@repo/utilities";
import { useCallback, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { showErrorSnackbar } from "../../actions/app.actions";
import { getTermRepo } from "../../repos";
import { getAppState, produceAppState, useAppStore } from "../../store";
import { Input } from "../ui/input";
import { cn } from "../ui/utils/cn";

export type DictionaryRowProps = {
  id: string;
};

export const DictionaryRow = ({ id }: DictionaryRowProps) => {
  const intl = useIntl();
  const term = useAppStore((state) => getRec(state.termById, id));
  const [sourceValue, setSourceValue] = useState(term?.sourceValue ?? "");
  const [destinationValue, setDestinationValue] = useState(
    term?.destinationValue ?? ""
  );
  const isReplacement = term?.isReplacement ?? true;

  useEffect(() => {
    setSourceValue(term?.sourceValue ?? "");
    setDestinationValue(term?.destinationValue ?? "");
  }, [term?.sourceValue, term?.destinationValue]);

  const handleFieldChange =
    (field: "source" | "destination") =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (field === "source") {
        setSourceValue(event.target.value);
      } else {
        setDestinationValue(event.target.value);
      }
    };

  const handleCommit = useCallback(async () => {
    if (!term) {
      return;
    }

    if (
      term.sourceValue === sourceValue &&
      term.destinationValue === destinationValue
    ) {
      return;
    }

    const previousTerm = term;
    const updatedTerm = {
      ...term,
      sourceValue,
      destinationValue,
    };

    produceAppState((draft) => {
      draft.termById[id] = updatedTerm;
    });

    try {
      await getTermRepo().updateTerm(updatedTerm);
    } catch (error) {
      produceAppState((draft) => {
        draft.termById[id] = previousTerm;
      });
      setSourceValue(previousTerm.sourceValue);
      setDestinationValue(previousTerm.destinationValue);
      showErrorSnackbar(error);
    }
  }, [destinationValue, id, sourceValue, term]);

  const handleDelete = useCallback(async () => {
    if (!term) {
      return;
    }

    const previousTerm = term;
    const previousIds = [...getAppState().dictionary.termIds];

    produceAppState((draft) => {
      draft.dictionary.termIds = draft.dictionary.termIds.filter(
        (termId) => termId !== id
      );
    });

    try {
      await getTermRepo().deleteTerm(id);
    } catch (error) {
      produceAppState((draft) => {
        draft.termById[id] = previousTerm;
        draft.dictionary.termIds = previousIds;
      });
      setSourceValue(previousTerm.sourceValue);
      setDestinationValue(previousTerm.destinationValue);
      showErrorSnackbar(error);
    }
  }, [id, term]);

  if (!term) {
    return null;
  }

  return (
    <div className="flex flex-row gap-4 items-center py-2">
      <Input
        inputSize="sm"
        placeholder={
          isReplacement
            ? intl.formatMessage({ defaultMessage: "Original" })
            : intl.formatMessage({ defaultMessage: "Glossary term" })
        }
        value={sourceValue}
        onChange={handleFieldChange("source")}
        onBlur={handleCommit}
        className="flex-1"
        error={sourceValue.trim() === ""}
      />
      {isReplacement ? (
        <>
          <ArrowRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
          <Input
            inputSize="sm"
            placeholder={intl.formatMessage({ defaultMessage: "Replacement" })}
            value={destinationValue}
            onChange={handleFieldChange("destination")}
            onBlur={handleCommit}
            className="flex-1"
            error={destinationValue.trim() === ""}
          />
        </>
      ) : null}
      <button
        aria-label={intl.formatMessage(
          { defaultMessage: "Delete dictionary item {term}" },
          { term: term.sourceValue }
        )}
        onClick={handleDelete}
        className={cn(
          "p-1 rounded hover:bg-accent flex-shrink-0"
        )}
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
};
