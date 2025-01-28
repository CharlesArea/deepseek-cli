import process from "process";
import "./suppress-warnings.js";

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
  if (error.message.includes("punycode")) {
    return; // Ignore punycode warnings
  }
  console.error("An error occurred:", error);
  process.exit(1);
});

// Handle unhandled rejections
process.on("unhandledRejection", (error) => {
  if (error.message.includes("punycode")) {
    return; // Ignore punycode warnings
  }
  console.error("An error occurred:", error);
  process.exit(1);
});
