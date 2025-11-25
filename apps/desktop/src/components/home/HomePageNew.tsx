import { FormattedMessage, useIntl } from "react-intl";
import { useAppStore } from "../../store";
import { getMyUser, getMyUserName } from "../../utils/user.utils";
import { Section } from "../common/SectionNew";
import { DashboardEntryLayout } from "../dashboard/DashboardEntryLayoutNew";
import { Stat } from "./StatNew";
import { HomeSideEffects } from "./HomeSideEffects";
import { DictationInstruction } from "../common/DictationInstructionNew";
import { Textarea } from "../ui/textarea";

export default function HomePage() {
  const user = useAppStore(getMyUser);
  const userName = useAppStore(getMyUserName);
  const intl = useIntl();

  const wordsThisMonth = user?.wordsThisMonth ?? 0;
  const wordsTotal = user?.wordsTotal ?? 0;

  return (
    <DashboardEntryLayout>
      <HomeSideEffects />
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold mb-2">
          <FormattedMessage
            defaultMessage="Welcome, {name}"
            values={{ name: userName }}
          />
        </h1>
        <div className="my-8">
          <div className="flex flex-row gap-4 mb-4 justify-around">
            <Stat
              label={intl.formatMessage({
                defaultMessage: "Words this month",
              })}
              value={wordsThisMonth}
            />
            <Stat
              label={intl.formatMessage({
                defaultMessage: "Words total",
              })}
              value={wordsTotal}
            />
          </div>
        </div>
        <Section
          title={intl.formatMessage({
            defaultMessage: "Try it out",
          })}
          description={intl.formatMessage({
            defaultMessage:
              "Use this space to type or paste anything and see how Voquill handles it. Nothing you write here is saved.",
          })}
        >
          <div className="mb-2">
            <DictationInstruction />
          </div>
          <Textarea
            placeholder={intl.formatMessage({
              defaultMessage: "Start dictating here...",
            })}
            autoComplete="off"
            resize="vertical"
            className="min-h-[120px]"
          />
        </Section>
      </div>
    </DashboardEntryLayout>
  );
}
