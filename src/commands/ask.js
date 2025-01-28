import inquirer from "inquirer";
import chalk from "chalk";
import ora from "ora";
import { query } from "../utils/api.js";

export async function askCommand(question) {
  try {
    // If no question provided in command line, prompt for it
    if (!question) {
      const answer = await inquirer.prompt([
        {
          type: "input",
          name: "question",
          message: "What would you like to ask DeepSeek?",
          validate: (input) => input.length > 0 || "Please enter a question",
        },
      ]);
      question = answer.question;
    }

    const spinner = ora({
      text: "Thinking...",
      spinner: "dots",
      color: "cyan",
    }).start();

    try {
      const response = await query(question);
      spinner.stop();
      spinner.clear();
      console.log(chalk.cyan("\nDeepSeek: ") + response);
    } catch (error) {
      spinner.stop();
      spinner.clear();
      spinner.fail(chalk.red("Error: " + error.message));
    }
  } catch (error) {
    console.error(chalk.red("Error: " + error.message));
  }
}
