"use client";

import {
  Boxes,
  Braces,
  Building2,
  CheckCircle2,
  Code2,
  Database,
  GalleryVerticalEnd,
  GitBranch,
  Globe,
  Layers3,
  Monitor,
  Package,
  Settings2,
  ShieldCheck,
  Terminal,
} from "lucide-react";
import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "#shadcn/sidebar";

import { NavMain } from "./nav-main";
import { NavProjects } from "./nav-projects";
import { NavUser } from "./nav-user";
import { TeamSwitcher } from "./team-switcher";

const data = {
  user: {
    name: "AppKit User",
    email: "user@appkit.dev",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "AppKit",
      logo: GalleryVerticalEnd,
      plan: "Template workspace",
    },
    {
      name: "Starter app",
      logo: Boxes,
      plan: "Local development",
    },
    {
      name: "Production app",
      logo: Building2,
      plan: "Future product",
    },
  ],
  navMain: [
    {
      title: "Overview",
      url: "#",
      icon: Layers3,
      isActive: true,
      items: [
        {
          title: "Template map",
          url: "#",
        },
        {
          title: "Readiness chart",
          url: "#",
        },
        {
          title: "Quality gates",
          url: "#",
        },
      ],
    },
    {
      title: "Applications",
      url: "#",
      icon: Monitor,
      items: [
        {
          title: "Web",
          url: "#",
        },
        {
          title: "Desktop",
          url: "#",
        },
        {
          title: "API",
          url: "#",
        },
        {
          title: "CLI",
          url: "#",
        },
      ],
    },
    {
      title: "Shared packages",
      url: "#",
      icon: Package,
      items: [
        {
          title: "UI",
          url: "#",
        },
        {
          title: "Frontend",
          url: "#",
        },
        {
          title: "API client",
          url: "#",
        },
        {
          title: "Core",
          url: "#",
        },
        {
          title: "Config",
          url: "#",
        },
      ],
    },
    {
      title: "Backend",
      url: "#",
      icon: Database,
      items: [
        {
          title: "Auth sessions",
          url: "#",
        },
        {
          title: "CLI authorization",
          url: "#",
        },
        {
          title: "Database schema",
          url: "#",
        },
      ],
    },
    {
      title: "Tooling",
      url: "#",
      icon: CheckCircle2,
      items: [
        {
          title: "Checks",
          url: "#",
        },
        {
          title: "Architecture",
          url: "#",
        },
        {
          title: "Dependency health",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Web app",
      url: "#",
      icon: Globe,
    },
    {
      name: "Desktop app",
      url: "#",
      icon: Monitor,
    },
    {
      name: "API server",
      url: "#",
      icon: Braces,
    },
    {
      name: "CLI",
      url: "#",
      icon: Terminal,
    },
    {
      name: "Shared packages",
      url: "#",
      icon: GitBranch,
    },
    {
      name: "Config",
      url: "#",
      icon: Settings2,
    },
    {
      name: "Auth",
      url: "#",
      icon: ShieldCheck,
    },
    {
      name: "Code quality",
      url: "#",
      icon: Code2,
    },
  ],
};

export interface AppSidebarActions {
  user: {
    onSignOut: () => void | Promise<void>;
  };
}

export interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  actions: AppSidebarActions;
}

export function AppSidebar({ actions, ...props }: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} onSignOut={actions.user.onSignOut} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
