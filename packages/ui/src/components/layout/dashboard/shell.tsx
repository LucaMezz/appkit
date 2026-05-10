import type { ReactNode } from "react";

import { Separator } from "#components/shadcn-ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "#components/shadcn-ui/sidebar";

import { AppSidebar, AppSidebarActions } from "./sidebar";

interface DashboardShellProps {
  actions: AppSidebarActions;
  breadcrumbs?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function DashboardShell({ actions, breadcrumbs, children }: DashboardShellProps) {
  return (
    <SidebarProvider className="flex min-h-0 h-[calc(100vh-33px)] w-full" defaultOpen>
      <AppSidebar className="top-8.25 h-[calc(100vh-33px)]" actions={actions} />

      <SidebarInset className="p-0 m-0">
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
            {breadcrumbs}
          </div>
        </header>

        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
