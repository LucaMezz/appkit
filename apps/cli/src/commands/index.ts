import { Command } from "commander";

import { status } from "./status";

export const registerCommands = (program: Command) => {
  status(program);
};
