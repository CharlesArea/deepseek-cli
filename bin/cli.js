#!/usr/bin/env node

import { program } from "commander";
import chalk from "chalk";
import { askCommand, configCommand } from "../src/index.js";

program.name("deepseek").description("DeepSeek AI CLI tool").version("1.0.0");

program
  .command("ask")
  .alias("a")
  .description("Ask DeepSeek AI a question")
  .argument("[question]", "The question to ask")
  .action(askCommand);

program
  .command("config")
  .description("Configure DeepSeek API settings")
  .action(configCommand);

// Error handling for unknown commands
program.on("command:*", () => {
  console.error(chalk.red("Invalid command."));
  console.log(
    `Use ${chalk.yellow("deepseek --help")} to see available commands.`
  );
  process.exit(1);
});

program.parse();
