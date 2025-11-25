import { getVersion } from "@tauri-apps/api/app";
import { Outlet } from "react-router-dom";
import { useAsyncData } from "../../hooks/async.hooks";
import { DashboardMenu } from "./DashboardMenu";

export default function DashboardPage() {
  const data = useAsyncData(getVersion, []);

  return (
    <div className="flex flex-row h-full w-full">
      <div className="hidden sm:flex flex-col w-56">
        <DashboardMenu />
      </div>
      <Outlet />
      <div className="fixed bottom-0 left-2 text-[0.55rem] text-muted-foreground opacity-30">
        {data.state === "success" ? `v${data.data}` : ""}
      </div>
    </div>
  );
}
