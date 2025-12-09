const fs = require("node:fs");
fs.readFile(__dirname + "/input.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  let dial = 50;
  const lines = data.split("\n").filter(Boolean);
  let count = 0;
  for (let line of lines) {
    const dir = line[0];
    const n = Number(line.slice(1));
    let start = dial;
    let end;
    if (dir === "L") {
      end = (dial - n + 100) % 100;
      let totalClicks = n;
      let pos = start;
      for (let i = 1; i <= totalClicks; i++) {
        pos = (pos - 1 + 100) % 100;
        if (pos === 0) count++;
      }
      dial = end;
    } else if (dir === "R") {
      end = (dial + n) % 100;
      let totalClicks = n;
      let pos = start;
      for (let i = 1; i <= totalClicks; i++) {
        pos = (pos + 1) % 100;
        if (pos === 0) count++;
      }
      dial = end;
    }
  }
  console.log("Final Dial:", dial);
  console.log("Count of times dial pointed at 0:", count);
});
