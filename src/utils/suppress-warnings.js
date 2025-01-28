// Monkey patch the warning system
const originalEmit = process.emit;
process.emit = function (name, data, ...args) {
  if (
    name === `warning` &&
    typeof data === "object" &&
    data.name === "DeprecationWarning" &&
    data.message.includes("punycode")
  ) {
    return false;
  }
  return originalEmit.apply(process, [name, data, ...args]);
};

// Set environment variable
process.env.NODE_NO_WARNINGS = "1";
