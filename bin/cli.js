#!/usr/bin/env node

import { program } from "commander";
import chalk from "chalk";
import { askCommand, configCommand } from "../src/index.js";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// Get version from package.json
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const packageJson = JSON.parse(
  readFileSync(join(__dirname, "../package.json"), "utf8")
);

const showBanner = () => {
  const version = packageJson.version;
  console.log(
    chalk.cyan(`
   ############     ###                
 ################    ##### #####       Welcome to DeepSeek CLI 🤖
 ###################  ############     Version: ${version}
 #################### ##########       
 ######################## #####        Developer: developer.charleslo@gmail.com
 ###      ##########  ##########      
 ###         ######### ########        Documentation: github.com/CharlesArea/deepseek-cli
 ####          ######## #######        
 #####           #############         Type 'ds --help' to see available commands
  #####           ##########           
   ######   ####   ########            Supported Models:
     ##############  #########         • deepseek-chat
       ################  ###           • deepseek-reasoner
           ########                    
 `)
  );
  console.log();
};

const showHelpBanner = () => {
  const version = packageJson.version;
  console.log(
    chalk.cyan(`
DeepSeek CLI ${version}
Documentation: github.com/CharlesArea/deepseek-cli
`)
  );
  console.log();
};

// Custom argument parsing for root command
const originalArgs = process.argv.slice(2);

// Helper function to check if input is valid
const isValidInput = (str) => {
  // Check if this is a single argument containing spaces
  if (!str) return false;

  // If it contains spaces, it must have been properly quoted
  if (str.includes(" ")) {
    // Check if this was a single argument (meaning it was quoted)
    return (
      originalArgs.length === 1 ||
      (originalArgs.length === 2 && originalArgs[0] === "ask")
    );
  }

  return true;
};

// If we have a single argument with spaces, it must have been quoted
if (originalArgs.length === 1 && originalArgs[0].includes(" ")) {
  // If the only argument is wrapped in quotes, treat it as an ask command
  process.argv.splice(2, 0, "ask");
}

program
  .name("deepseek")
  .description("DeepSeek CLI tool")
  .version(packageJson.version);

// Show banner for help or no arguments
if (process.argv.length <= 2) {
  showBanner();
} else if (process.argv.includes("--help") || process.argv.includes("-h")) {
  showHelpBanner();
}

program
  .command("ask")
  .alias("a")
  .description("Ask DeepSeek AI a question")
  .argument("[question]", "The question to ask (must be wrapped in quotes)")
  .action((question) => {
    if (question && !isValidInput(question)) {
      console.error(chalk.red("Error: Question must be wrapped in quotes"));
      console.log(chalk.yellow('Example: ds ask "your question"'));
      console.log();
      process.exit(1);
    }
    askCommand(question);
  });

// Add a default action for the root command
program
  .argument("[question]", "The question to ask (shorthand for ask command)")
  .action((question) => {
    if (question && isValidInput(question)) {
      // If there's a direct question, treat it as an ask command
      askCommand(question);
    } else if (question) {
      console.error(chalk.red("Error: Question must be wrapped in quotes"));
      console.log(chalk.yellow('Example: ds "your question"'));
      console.log();
      process.exit(1);
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
  console.log();
  process.exit(1);
});

program.addHelpText("after", "\n");

program.parse();
