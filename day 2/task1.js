const fs = require('fs');

// Read and parse input
const input = fs.readFileSync('input.txt', 'utf8').trim();
const lines = input.split('\n').map(line => line.trim()).filter(line => line.length > 0);

let safe = 0;

for (let i = 0; i < lines.length; i++) {
    const report = lines[i].split(' ').map(Number);

    let isIncreasing = null;
    let isSafe = true;

    for (let j = 0; j < report.length - 1; j++) {
        const diff = report[j + 1] - report[j];

        if (diff === 0 || Math.abs(diff) > 3) {
            isSafe = false;
            break;
        }

        if (isIncreasing === null) {
            isIncreasing = diff > 0;
        } else if ((isIncreasing && diff < 0) || (!isIncreasing && diff > 0)) {
            isSafe = false;
            break;
        }
    }

    if (isSafe) {
        safe++;
    }
}

console.log(safe);
