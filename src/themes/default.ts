import type { ThemeTokens } from "./types";

export const defaultThemeTokens: ThemeTokens = {
  background: "oklch(0.145 0 0)",
  foreground: "oklch(0.985 0 0)",

  card: "oklch(0.145 0 0)",
  cardForeground: "oklch(0.985 0 0)",

  popover: "oklch(0.145 0 0)",
  popoverForeground: "oklch(0.985 0 0)",

  primary: "oklch(0.985 0 0)",
  primaryForeground: "oklch(0.205 0 0)",

  secondary: "oklch(0.269 0 0)",
  secondaryForeground: "oklch(0.985 0 0)",

  muted: "oklch(0.269 0 0)",
  mutedForeground: "oklch(0.708 0 0)",

  accent: "oklch(0.269 0 0)",
  accentForeground: "oklch(0.985 0 0)",

  destructive: "oklch(0.396 0.141 25.723)",
  destructiveForeground: "oklch(0.637 0.237 25.331)",

  border: "oklch(0.269 0 0)",
  input: "oklch(0.269 0 0)",
  ring: "oklch(0.439 0 0)",

  chart1: "oklch(0.488 0.243 264.376)",
  chart2: "oklch(0.696 0.17 162.48)",
  chart3: "oklch(0.769 0.188 70.08)",
  chart4: "oklch(0.627 0.265 303.9)",
  chart5: "oklch(0.645 0.246 16.439)",

  sidebar: "oklch(0.205 0 0)",
  sidebarForeground: "oklch(0.985 0 0)",

  sidebarPrimary: "oklch(0.488 0.243 264.376)",
  sidebarPrimaryForeground: "oklch(0.985 0 0)",

  sidebarAccent: "oklch(0.269 0 0)",
  sidebarAccentForeground: "oklch(0.985 0 0)",

  sidebarBorder: "oklch(0.269 0 0)",
  sidebarRing: "oklch(0.439 0 0)",
};

export const defaultTheme = {
  id: "default",
  name: "Default",
  tokens: defaultThemeTokens,
};
