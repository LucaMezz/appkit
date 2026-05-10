import { signOut } from "@appkit/api-client";
import { AppSidebarActions, Separator } from "@appkit/ui";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@appkit/ui";
import { AppSidebar } from "@appkit/ui";
import { Outlet, useNavigate } from "react-router-dom";

import { AppBreadcrumbs } from "#components/layout/navigation/app-breadcrumbs";

export function DashboardLayout(): React.JSX.Element {
  const navigate = useNavigate();

  const actions: AppSidebarActions = {
    user: {
      onSignOut: async () => {
        const result = await signOut({
          apiBaseUrl: "http://localhost:4000",
          redirectTo: "/",
        });

        if (!result.success) {
          console.error(result.message);
          return;
        }

        navigate(result.redirectTo, {
          replace: true,
        });
      },
    },
  };

  return (
    <SidebarProvider className="flex min-h-0 h-[calc(100vh-33px)] w-full" defaultOpen>
      <AppSidebar className="top-8.25 h-[calc(100vh-33px)]" actions={actions} />
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
