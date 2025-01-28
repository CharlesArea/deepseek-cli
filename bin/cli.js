#!/usr/bin/env node

import { program } from "commander";
import chalk from "chalk";
import { askCommand, configCommand } from "../src/index.js";

// Custom argument parsing for root command
const originalArgs = process.argv.slice(2);
if (
  originalArgs.length === 1 &&
  originalArgs[0].startsWith('"') &&
  originalArgs[0].endsWith('"')
) {
  // If the only argument is wrapped in quotes, treat it as an ask command
  process.argv.splice(2, 0, "ask");
}

program.name("deepseek").description("DeepSeek AI CLI tool").version("1.0.0");

program
  .command("ask")
  .alias("a")
  .description("Ask DeepSeek AI a question")
  .argument("[question]", "The question to ask")
  .action(askCommand);

// Add a default action for the root command
program
  .argument("[question]", "The question to ask (shorthand for ask command)")
  .action((question) => {
    if (question) {
      // If there's a direct question, treat it as an ask command
      askCommand(question);
    } else {
      // If no question, show help
      program.help();
    }
  });

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
