import {
  BookOpen,
  History,
  Home,
  Palette,
  Settings,
} from "lucide-react";
import { FormattedMessage } from "react-intl";
import { useLocation, useNavigate } from "react-router-dom";
import { ListTile } from "../common/ListTileNew";

const settingsPath = "/dashboard/settings";

type NavItem = {
  label: React.ReactNode;
  path: string;
  icon: React.ReactNode;
};

const navItems: NavItem[] = [
  {
    label: <FormattedMessage defaultMessage="Home" />,
    path: "/dashboard",
    icon: <Home className="h-5 w-5" />,
  },
  {
    label: <FormattedMessage defaultMessage="History" />,
    path: "/dashboard/transcriptions",
    icon: <History className="h-5 w-5" />,
  },
  {
    label: <FormattedMessage defaultMessage="Dictionary" />,
    path: "/dashboard/dictionary",
    icon: <BookOpen className="h-5 w-5" />,
  },
  {
    label: <FormattedMessage defaultMessage="Styles" />,
    path: "/dashboard/styling",
    icon: <Palette className="h-5 w-5" />,
  },
];

export type DashboardMenuProps = {
  onChoose?: () => void;
};

export const DashboardMenu = ({ onChoose }: DashboardMenuProps) => {
  const location = useLocation();
  const nav = useNavigate();

  const onChooseHandler = (path: string) => {
    onChoose?.();
    nav(path);
  };

  const list = (
    <div className="px-4 pb-8">
      {navItems.map(({ label, path, icon }) => (
        <ListTile
          key={path}
          onClick={() => onChooseHandler(path)}
          selected={location.pathname === path}
          leading={icon}
          title={label}
        />
      ))}
    </div>
  );

  return (
    <div className="flex flex-col items-stretch h-full">
      <div className="flex-grow overflow-y-auto">{list}</div>
      <div className="mt-4 p-4">
        <ListTile
          key={settingsPath}
          onClick={() => onChooseHandler(settingsPath)}
          selected={location.pathname === settingsPath}
          leading={<Settings className="h-5 w-5" />}
          title={<FormattedMessage defaultMessage="Settings" />}
        />
      </div>
    </div>
  );
};
