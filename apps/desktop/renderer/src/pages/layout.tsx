import { Separator } from "@appkit/ui";
import { TooltipProvider } from "@appkit/ui";
import { Outlet } from "react-router-dom";

import { WindowControls } from "@/components/layout/window/controls/controls";
import { HistoryControls } from "@/components/layout/window/history-controls";
import { Inbox } from "@/components/layout/window/inbox";
import { TitleBar } from "@/components/layout/window/title-bar";

export function Layout(): React.JSX.Element {
  return (
    <TooltipProvider>
      <div className="flex flex-col h-screen overflow-hidden">
        <TitleBar className="flex h-8 items-center border-b shrink-0">
          <div className="w-full h-8 flex items-center justify-between px-2">
            <HistoryControls />
            <div className="flex items-center h-full gap-2">
              <Inbox />
              <Separator orientation="vertical" />
            </div>
          </div>
          <WindowControls />
        </TitleBar>

        <main className="flex-1 overflow-y-auto">
          <div className="flex flex-col min-h-0 h-[calc(100vh-33px)] w-full px-4 py-4">
            <Outlet />
          </div>
        </main>
      </div>
    </TooltipProvider>
  );
}
