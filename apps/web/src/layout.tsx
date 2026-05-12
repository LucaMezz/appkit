import { TooltipProvider } from "@appkit/ui";
import { Outlet } from "react-router-dom";

export function Layout(): React.JSX.Element {
  return (
    <TooltipProvider>
      <div className="flex flex-col h-screen overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          <div className="flex flex-col min-h-0 h-[calc(100vh-33px)] w-full px-4 py-4">
            <Outlet />
          </div>
        </main>
      </div>
    </TooltipProvider>
  );
}
