const { log } = require("node:console");
const fs = require("node:fs");
const file = process.argv.slice(2)[0] ?? null;
if (!file) {
  console.error("Please provide an input file as a command line argument.");
  process.exit(1);
}
fs.readFile(__dirname + "/" + file, "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const ranges = data.split(",").map((range) => {
    const [start, end] = range.split("-").map(Number);
    return { start, end };
  });
  const invalidIds = [];
  ranges.forEach(({ start, end }) => {
    for (let i = start; i <= end; i++) {
      if (isInvalid(i)) {
        invalidIds.push(i);
      }
    }
  });
  log(
    "Sum of Invalid IDs:",
    invalidIds.reduce((a, b) => a + b, 0)
  );
});

function splitNum(numString, sep) {
  const parts = [];
  for (let i = 0; i < numString.length; i += sep) {
    parts.push(numString.slice(i, i + sep));
  }
  return parts;
}

function isInvalid(num) {
  const numString = num.toString();
  const numLength = numString.length;
  for (let sep = Math.floor(numLength / 2); sep > 0; sep--) {
    if (numLength % sep !== 0) continue;
    const parts = splitNum(numString, sep);
    if (parts.every((part) => parts[0] === part)) {
      return true;
    }
    continue;
  }
  return false;
}
