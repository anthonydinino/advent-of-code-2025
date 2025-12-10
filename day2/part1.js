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
      const numLength = i.toString().length;
      if (numLength % 2 === 0) {
        const mid = numLength / 2;
        const left = i.toString().slice(0, mid);
        const right = i.toString().slice(mid);
        if (left == right) {
          invalidIds.push(i);
        }
      }
    }
  });
  log(
    "Sum of Invalid IDs:",
    invalidIds.reduce((a, b) => a + b, 0)
  );
});
