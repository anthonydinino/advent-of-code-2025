const fs = require("node:fs");
fs.readFile(__dirname + "/input.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  let dial = 50;
  const lines = data.split("\n");
  let count = 0;
  for (let line of lines) {
    if (line[0] === "L") {
      const newDial = dial - (line.slice(1) % 100);
      if (newDial < 0) {
        dial = 100 + newDial;
      } else {
        dial = newDial;
      }
    } else if (line[0] === "R") {
      const newDial = dial + (line.slice(1) % 100);
      if (newDial >= 100) {
        dial = newDial - 100;
      } else {
        dial = newDial;
      }
    }
    if (dial === 0) {
      count += 1;
    }
  }
  console.log("Final Dial:", dial);
  console.log("Count of times dial hit 0:", count);
});
