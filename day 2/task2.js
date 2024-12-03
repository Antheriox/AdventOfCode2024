const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8').trim();
const lines = input.split('\n').map(line => line.trim()).filter(line => line.length > 0);

let safe = 0;

function isSafe(report) {
    let isIncreasing = null;

    for (let j = 0; j < report.length - 1; j++) {
        const diff = report[j + 1] - report[j];

        if (diff === 0 || Math.abs(diff) > 3) {
            return false;
        }

        if (isIncreasing === null) {
            isIncreasing = diff > 0;
        } else if ((isIncreasing && diff < 0) || (!isIncreasing && diff > 0)) {
            return false;
        }
    }

    return true;
}

for (let i = 0; i < lines.length; i++) {
    const report = lines[i].split(' ').map(Number);

    if (isSafe(report)) {
        safe++;
        continue;
    }

    let dampenerWorks = false;
    for (let j = 0; j < report.length; j++) {
        const modifiedReport = [...report.slice(0, j), ...report.slice(j + 1)];
        if (isSafe(modifiedReport)) {
            dampenerWorks = true;
            break;
        }
    }

    if (dampenerWorks) {
        safe++;
    }
}

console.log(safe);
