import { UserCircle, ArrowUp } from "lucide-react";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { openUpgradePlanDialog } from "../../actions/pricing.actions";
import { useHeaderPortal } from "../../hooks/header.hooks";
import { useIsOnboarded } from "../../hooks/user.hooks";
import { produceAppState, useAppStore } from "../../store";
import {
  getIsPaying,
  getMyMember,
  planToDisplayName,
} from "../../utils/member.utils";
import { getInitials } from "../../utils/string.utils";
import { getMyUser } from "../../utils/user.utils";
import { LogoWithText } from "../common/LogoWithText";
import {
  MenuPopoverBuilder,
  type MenuPopoverItem,
} from "../common/MenuPopoverNew";
import { maybeArrayElements } from "../settings/AIPostProcessingConfiguration";

export type BaseHeaderProps = {
  logo?: React.ReactNode;
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
};

export const BaseHeader = ({
  logo,
  leftContent,
  rightContent,
}: BaseHeaderProps) => {
  return (
    <div className="flex flex-row justify-between items-center py-2 px-4">
      <div className="py-1 pr-2">{logo}</div>
      {leftContent}
      <div className="flex-grow" />
      {rightContent}
    </div>
  );
};

export const AppHeader = () => {
  const nav = useNavigate();
  const { leftContent } = useHeaderPortal();
  const isOnboarded = useIsOnboarded();
  const planName = useAppStore((state) =>
    planToDisplayName(getMyMember(state)?.plan ?? "free")
  );
  const isPaying = useAppStore(getIsPaying);

  const myName = useAppStore((state) => {
    const user = getMyUser(state);
    return user?.name ?? "Unknown";
  });

  const myInitials = useMemo(() => getInitials(myName), [myName]);

  const handleLogoClick = () => {
    nav("/");
  };

  const sharedRightMenuItems: MenuPopoverItem[] = [
    {
      kind: "listItem",
      title: <FormattedMessage defaultMessage="My profile" />,
      onClick: ({ close }) => {
        produceAppState((draft) => {
          draft.settings.profileDialogOpen = true;
        });
        close();
      },
      leading: <UserCircle className="h-5 w-5" />,
    },
    ...maybeArrayElements<MenuPopoverItem>(!isPaying, [
      {
        kind: "listItem",
        title: <FormattedMessage defaultMessage="Upgrade to Pro" />,
        onClick: ({ close }) => {
          openUpgradePlanDialog();
          close();
        },
        leading: <ArrowUp className="h-5 w-5" />,
      },
    ]),
  ];

  let rightContent: React.ReactNode;
  if (isOnboarded) {
    rightContent = (
      <MenuPopoverBuilder
        items={sharedRightMenuItems}
      >
        {({ ref, open }) => (
          <button
            ref={ref}
            onClick={open}
            className="hidden sm:flex flex-shrink-0 flex-row items-center gap-3 cursor-pointer bg-transparent border-none p-0 hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
              {myInitials}
            </div>
            <div className="flex flex-col items-start gap-1">
              <div className="text-sm font-bold leading-none text-foreground">
                {myName}
              </div>
              <div className="text-xs text-muted-foreground leading-none">
                {planName}
              </div>
            </div>
          </button>
        )}
      </MenuPopoverBuilder>
    );
  }

  const logo = (
    <div onClick={handleLogoClick} className="cursor-pointer">
      <LogoWithText />
    </div>
  );

  return (
    <BaseHeader
      logo={logo}
      leftContent={leftContent}
      rightContent={rightContent}
    />
  );
};
