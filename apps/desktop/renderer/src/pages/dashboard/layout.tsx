import { Separator } from "@appkit/ui";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@appkit/ui";
import { Outlet } from "react-router-dom";

import { AppBreadcrumbs } from "#components/layout/navigation/app-breadcrumbs";
import { AppSidebar } from "#components/layout/navigation/sidebar/app-sidebar";

export function DashboardLayout(): React.JSX.Element {
  return (
    <SidebarProvider className="flex min-h-0 h-[calc(100vh-33px)] w-full" defaultOpen>
      <AppSidebar className="top-8.25 h-[calc(100vh-33px)]" />
      <SidebarInset className="p-0 m-0">
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
            <AppBreadcrumbs collapseAfter={3} />
          </div>
        </header>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
