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
  main(data);
});

function main(data) {
  const joltages = [];
  const banks = data.split("\n").filter((line) => line.length > 0);
  log(banks);
  const maxSeq = 12;
  banks.forEach((bank) => {
    const bankArray = bank.split("").map(Number);
    const largest = largestNumbers(bankArray, maxSeq);
    log(largest);
    const arranged = arrange(largest, maxSeq);
    joltages.push(arranged);
  });
  log(joltages);
}

function largestNumbers(arr, count) {
  if (count > arr.length) {
    return null;
  }

  const result = [];

  for (let i = 0; i < count; i++) {
    const max = Math.max(...arr);
    const index = arr.findIndex((num) => num === max);
    result.push({ value: max, index: index });
    arr[index] = -1;
  }

  return result.sort((a, b) => a.index - b.index);
}

function arrange(largest, maxSeq) {
  if (maxSeq === 0) {
    return Math.max(...largest.map((obj) => obj.value));
  }

  if (largest[0].index < largest.length - maxSeq) {
    return;
  }

  return arrange(largest, maxSeq - 1);
}
