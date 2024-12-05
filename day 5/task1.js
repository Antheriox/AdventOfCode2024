const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');

const lines = input.split('\n');

const rules = [];
const pages = [];
let isPage = false;

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes('PAGE_BREAK')) {
        isPage = true;
        continue;
    }
    if (isPage) {
        pages.push(line.trim());
        continue;
    } else {
        line.trim();
        const before = +line.split('|')[0];
        let after = +line.split('|')[1];
        rules.push({
            before: before,
            after: after
        });
        continue;
    }
}

const ruleMap = new Map();
for (const { before, after } of rules) {
    if (!ruleMap.has(before)) {
        ruleMap.set(before, new Set());
    }
    ruleMap.get(before).add(after);
}

let result = 0;

for (const page of pages) {
    const numbers = page.split(',').map(Number);

    let valid = true;
    for (const before of ruleMap.keys()) {
        const afterSet = ruleMap.get(before);
        for (const after of afterSet) {
            if (
                numbers.includes(before) &&
                numbers.includes(after) &&
                numbers.indexOf(before) > numbers.indexOf(after)
            ) {
                valid = false;
                break;
            }
        }
        if (!valid) break;
    }

    if (valid) {
        const middleIndex = Math.floor(numbers.length / 2);
        result += numbers[middleIndex];
    }
}

console.log(result);
