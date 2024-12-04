const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');

const lines = input.split('\n');

const grid = [];

for (let i = 0; i < lines.length; i++) {
    const chars = lines[i].split('');
    grid.push(chars);
}

const a = [];

for (let i = 0; i < grid.length; i++) {
    const row = grid[i];
    for (let j = 0; j < row.length; j++) {
        if (row[j] === 'A') {
            a.push([j, i]);
        }
    }
}

let result = 0;

for (let i = 0; i < a.length; i++) {
    const [x1, y1] = a[i];
    const relatives = getAllRelatives(x1, y1);
    if (relatives.length !== 4) continue;
    let rightUpper = "";
    let rightBottom = "";
    let leftUpper = "";
    let leftBottom = "";
    let amoutS = 0;
    let amountM = 0;
    for (let j = 0; j < relatives.length; j++) {
        if (relatives[j].position === 'rightUpper') {
            rightUpper = relatives[j].value;
        }
        if (relatives[j].position === 'rightBottom') {
            rightBottom = relatives[j].value;
        }
        if (relatives[j].position === 'leftUpper') {
            leftUpper = relatives[j].value;
        }
        if (relatives[j].position === 'leftBottom') {
            leftBottom = relatives[j].value;
        }
        if (relatives[j].value === 'S') {
            amoutS++;
        }
        if (relatives[j].value === 'M') {
            amountM++;
        }
    }
    if (rightUpper === "X" || rightBottom === "X" || leftUpper === "X" || leftBottom === "X" || rightUpper === "A" || rightBottom === "A" || leftUpper === "A" || leftBottom === "A") continue;
        if (rightUpper !== leftBottom && rightBottom !== leftUpper && amountM === 2 && amoutS === 2) {
            result++;
    }
}

console.log(result);

function getValue(x, y) {
    if (x < 0 || x >= grid[0].length || y < 0 || y >= grid.length) {
        return null;
    }

    return grid[y][x];
}

function getAllRelatives(x, y) {
    const relatives = [];

    if (getValue(x - 1, y - 1)) {
        relatives.push({
            position: 'leftUpper',
            value: getValue(x - 1, y - 1),
            x: x - 1,
            y: y - 1
        });
    }

    if (getValue(x + 1, y - 1)) {
        relatives.push({
            position: 'rightUpper',
            value: getValue(x + 1, y - 1),
            x: x + 1,
            y: y - 1
        });
    }

    if (getValue(x - 1, y + 1)) {
        relatives.push({
            position: 'leftBottom',
            value: getValue(x - 1, y + 1),
            x: x - 1,
            y: y + 1
        });
    }

    if (getValue(x + 1, y + 1)) {
        relatives.push({
            position: 'rightBottom',
            value: getValue(x + 1, y + 1),
            x: x + 1,
            y: y + 1
        });
    }
    
    return relatives;
}
