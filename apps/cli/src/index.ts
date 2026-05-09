import { Command } from "commander";

import { registerCommands } from "./commands";

const program = new Command();

program
  .name("appkit")
  .description("Command-line client for interacting with the AppKit backend API.")
  .version("0.1.0", "-v, --version");

registerCommands(program);

program.action(() => {
  program.outputHelp();
});

program.parse(process.argv);
