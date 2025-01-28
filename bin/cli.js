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
  .argument("[question]", "The question to ask")
  .action((question) => {
    // Remove quotes if present
    if (question) {
      question = question.replace(/^["']|["']$/g, "");
    }
    askCommand(question);
  });

// Add a default action for the root command
program
  .argument("[question]", "The question to ask (shorthand for ask command)")
  .action((question) => {
    if (question) {
      // Remove quotes if present
      question = question.replace(/^["']|["']$/g, "");
      askCommand(question);
    } else {
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
