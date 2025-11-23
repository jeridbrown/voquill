import { FileSearch, Sparkles, Plus } from "lucide-react";
import { Term } from "@repo/types";
import dayjs from "dayjs";
import { useCallback } from "react";
import { FormattedMessage } from "react-intl";
import { showErrorSnackbar } from "../../actions/app.actions";
import { getTermRepo } from "../../repos";
import { produceAppState, useAppStore } from "../../store";
import { createId } from "../../utils/id.utils";
import { MenuPopoverBuilder } from "../common/MenuPopoverNew";
import { VirtualizedListPage } from "../common/VirtualizedListPageNew";
import { DictionaryRow } from "./DictionaryRowNew";
import { Button } from "../ui/button";

export default function DictionaryPage() {
  const termIds = useAppStore((state) => state.dictionary.termIds);

  const handleAddTerm = useCallback(async (replacement: boolean) => {
    const newTerm: Term = {
      id: createId(),
      createdAt: dayjs().toISOString(),
      sourceValue: "",
      destinationValue: "",
      isReplacement: replacement,
    };

    produceAppState((draft) => {
      draft.termById[newTerm.id] = newTerm;
      draft.dictionary.termIds = [newTerm.id, ...draft.dictionary.termIds];
    });

    try {
      const created = await getTermRepo().createTerm(newTerm);
      produceAppState((draft) => {
        draft.termById[created.id] = created;
      });
    } catch (error) {
      produceAppState((draft) => {
        delete draft.termById[newTerm.id];
        draft.dictionary.termIds = draft.dictionary.termIds.filter(
          (termId) => termId !== newTerm.id
        );
      });
      showErrorSnackbar(error);
    }
  }, []);

  const addButton = (
    <MenuPopoverBuilder
      items={[
        {
          kind: "listItem",
          title: (
            <FormattedMessage defaultMessage="Glossary term" />
          ),
          onClick: ({ close }) => {
            handleAddTerm(false);
            close();
          },
          leading: <Sparkles className="h-4 w-4" />,
        },
        {
          kind: "listItem",
          title: (
            <FormattedMessage defaultMessage="Replacement rule" />
          ),
          onClick: ({ close }) => {
            handleAddTerm(true);
            close();
          },
          leading: <FileSearch className="h-4 w-4" />,
        },
      ]}
    >
      {(args) => (
        <Button
          variant="ghost"
          icon={<Plus className="h-4 w-4" />}
          iconPosition="left"
          onClick={args.open}
          ref={args.ref as any}
        >
          <FormattedMessage defaultMessage="Add" />
        </Button>
      )}
    </MenuPopoverBuilder>
  );

  return (
    <VirtualizedListPage
      title={<FormattedMessage defaultMessage="Dictionary" />}
      subtitle={
        <FormattedMessage defaultMessage="Voquill may misunderstand you on occasion. If you see certain words being missed frequently, you can define a replacement rule here to fix the spelling automatically." />
      }
      action={addButton}
      items={termIds}
      computeItemKey={(id) => id}
      heightMult={10}
      renderItem={(id) => <DictionaryRow key={id} id={id} />}
    />
  );
}
