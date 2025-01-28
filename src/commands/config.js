import inquirer from "inquirer";
import chalk from "chalk";
import Table from "cli-table3";
import config from "../config.js";

const AVAILABLE_MODELS = ["deepseek-chat", "deepseek-reasoner"];

function displayCurrentConfig() {
  const table = new Table({
    head: [chalk.cyan("Setting"), chalk.cyan("Value")],
    style: {
      head: [], // Disable colors in header
    },
  });

  const currentConfig = {
    "API Key": config.get("apiKey") ? "********" : "Not set",
    Model: config.get("model"),
    "Base URL": config.get("baseURL"),
    Temperature: config.get("temperature"),
    "System Prompt": config.get("systemPrompt"),
    "Max Tokens": config.get("maxTokens"),
  };

  Object.entries(currentConfig).forEach(([key, value]) => {
    table.push([key, value]);
  });

  console.log(chalk.bold("\nCurrent Configuration:"));
  console.log(table.toString());
  console.log("");
}

export async function configCommand() {
  // Show current config first
  displayCurrentConfig();

  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "apiKey",
      message: "Enter your DeepSeek API key:",
      default: config.get("apiKey"),
    },
    {
      type: "list",
      name: "model",
      message: "Select the model to use:",
      choices: AVAILABLE_MODELS,
      default: config.get("model"),
    },
    {
      type: "input",
      name: "baseURL",
      message: "Enter the base URL:",
      default: config.get("baseURL"),
      validate: (input) => {
        try {
          new URL(input);
          return true;
        } catch (e) {
          return "Please enter a valid URL";
        }
      },
    },
    {
      type: "number",
      name: "temperature",
      message: "Enter temperature (0.0 to 1.5):",
      default: config.get("temperature"),
      validate: (input) => {
        if (input >= 0 && input <= 1.5) return true;
        return "Temperature must be between 0 and 1";
      },
    },
    {
      type: "input",
      name: "systemPrompt",
      message: "Enter system prompt:",
      default: config.get("systemPrompt"),
    },
    {
      type: "number",
      name: "maxTokens",
      message: "Enter max tokens:",
      default: config.get("maxTokens"),
      validate: (input) => {
        if (input > 0) return true;
        return "Max tokens must be greater than 0";
      },
    },
  ]);

  config.set("apiKey", answers.apiKey);
  config.set("model", answers.model);
  config.set("baseURL", answers.baseURL);
  config.set("temperature", answers.temperature);
  config.set("systemPrompt", answers.systemPrompt);
  config.set("maxTokens", answers.maxTokens);

  console.log(chalk.green("✓ Configuration saved successfully!"));

  // Show updated config
  displayCurrentConfig();
}
