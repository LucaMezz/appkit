import { Outlet } from "react-router-dom";

import { HistoryControls } from "@/components/history-controls";
import { Inbox } from "@/components/inbox";
import { Separator } from "@/components/shadcn-ui/separator";
import { TooltipProvider } from "@/components/shadcn-ui/tooltip";
import { WindowControls } from "@/components/window/controls/controls";
import { TitleBar } from "@/components/window/title-bar";

export function Layout(): React.JSX.Element {
  return (
    <TooltipProvider>
      <div className="flex flex-col h-screen">
        <TitleBar className="flex h-8 items-center border-b">
          <div className="w-full h-8 flex items-center justify-between px-2">
            <HistoryControls />
            <div className="flex items-center h-full gap-2">
              <Inbox />
              <Separator orientation="vertical" />
            </div>
          </div>
          <WindowControls />
        </TitleBar>
        <main className="w-full h-[calc(100vh-2rem)] max-w-none px-4">
          <Outlet />
        </main>
      </div>
    </TooltipProvider>
  );
}
