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
  const banks = data.split("\n").filter((line) => line.length > 0);
  const nums = [];
  banks.forEach((bank) => {
    const bankArray = bank.split("").map(Number);
    const maxNumber = Math.max(...bankArray);
    const maxIndex = bankArray.findIndex((num) => num === maxNumber);
    bankArray[maxIndex] = -1;
    const secondMaxNumber = Math.max(...bankArray);
    const secondMaxIndex = bankArray.findIndex(
      (num) => num === secondMaxNumber
    );
    if (maxIndex < secondMaxIndex) {
      nums.push([bank[maxIndex], bank[secondMaxIndex]].join(""));
    } else if (maxIndex === bankArray.length - 1) {
      nums.push([bank[secondMaxIndex], bank[maxIndex]].join(""));
    } else {
      nums.push(
        [bank[maxIndex], Math.max(...bankArray.slice(maxIndex))].join("")
      );
    }
  });
  log(nums.reduce((a, b) => Number(a) + Number(b), 0));
}
