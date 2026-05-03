import { Theme } from "./types";

export function applyTheme(theme: Theme) {
  const root = document.documentElement;

  //   root.style.setProperty("--radius", theme.radius.toString());

  for (const [key, value] of Object.entries(theme.tokens)) {
    root.style.setProperty(`--${toKebab(key)}`, value);
  }
}

function toKebab(str: string) {
  return str.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
}
