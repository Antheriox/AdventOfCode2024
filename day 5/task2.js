const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');

const lines = input.split('\n');

const rules = [];
const pages = [];
let isPage = false;

for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.includes('PAGE_BREAK')) {
        isPage = true;
        continue;
    }
    if (isPage) {
        pages.push(line);
    } else {
        const [before, after] = line.split('|').map(Number);
        rules.push({ before, after });
    }
}

const ruleMap = new Map();
for (const { before, after } of rules) {
    if (!ruleMap.has(before)) {
        ruleMap.set(before, new Set());
    }
    ruleMap.get(before).add(after);
}

function reorderPage(numbers) {
    numbers.sort((a, b) => {
        if (ruleMap.get(a)?.has(b)) return -1;
        if (ruleMap.get(b)?.has(a)) return 1;
        return 0;
    });
    return numbers;
}

const incorrectPages = [];
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

    if (!valid) {
        const reordered = reorderPage(numbers);
        incorrectPages.push(reordered);
    }
}

let result = 0;
for (const correctedPage of incorrectPages) {
    const middleIndex = Math.floor(correctedPage.length / 2);
    result += correctedPage[middleIndex];
}

console.log(result);
