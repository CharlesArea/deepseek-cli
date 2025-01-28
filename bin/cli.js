#!/usr/bin/env node

import { program } from "commander";
import chalk from "chalk";
import { askCommand, configCommand } from "../src/index.js";

const showBanner = () => {
  const version = program.version();
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
  const version = program.version();
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

// Helper function to check if a string is properly quoted
const isProperlyQuoted = (str) => str.startsWith('"') && str.endsWith('"');

if (originalArgs.length === 1 && isProperlyQuoted(originalArgs[0])) {
  // If the only argument is wrapped in quotes, treat it as an ask command
  process.argv.splice(2, 0, "ask");
}

program.name("deepseek").description("DeepSeek CLI tool").version("1.0.0");

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
  .argument("[question]", "The question to ask")
  .action((question) => {
    if (question && !isProperlyQuoted(question)) {
      console.error(chalk.red("Error: Question must be wrapped in quotes"));
      console.log(chalk.yellow('Example: ds ask "How are you?"'));
      console.log();
      process.exit(1);
    }
    askCommand(question);
  });

// Add a default action for the root command
program
  .argument("[question]", "The question to ask (shorthand for ask command)")
  .action((question) => {
    if (question && isProperlyQuoted(question)) {
      // If there's a direct question, treat it as an ask command
      askCommand(question);
    } else if (question) {
      console.error(chalk.red("Error: Question must be wrapped in quotes"));
      console.log(chalk.yellow('Example: ds "How are you?"'));
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
