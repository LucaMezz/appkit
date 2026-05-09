import type { Command } from "commander";

export const status = (program: Command) => {
  program
    .command("status")
    .description("Show CLI and API configuration status.")
    .action(() => {
      console.info("AppKit CLI is installed.");
    });
};
