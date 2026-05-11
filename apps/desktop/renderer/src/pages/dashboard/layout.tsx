import { signOut } from "@appkit/api-client";
import { DashboardShell, AppSidebarActions } from "@appkit/ui/client";
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
    <DashboardShell actions={actions} breadcrumbs={<AppBreadcrumbs collapseAfter={3} />}>
      <Outlet />
    </DashboardShell>
  );
}
