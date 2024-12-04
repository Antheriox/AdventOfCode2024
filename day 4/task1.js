const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');

const lines = input.split('\n');

const grid = [];

for (let i = 0; i < lines.length; i++) {
    const chars = lines[i].split('');
    grid.push(chars);
}

const x = [];

for (let i = 0; i < grid.length; i++) {
    const row = grid[i];
    for (let j = 0; j < row.length; j++) {
        if (row[j] === 'X') {
            x.push([j, i]);
        }
    }
}

let result = 0;

for (let i = 0; i < x.length; i++) {
    const [x1, y1] = x[i];
    const relatives = getAllRelatives(x1, y1);
    for (let j = 0; j < relatives.length; j++) {
        if (relatives[j].value === 'M') {
            const aRelative = getRelavtive(relatives[j].x, relatives[j].y, relatives[j].position);
            if (aRelative.value === 'A') {
                if (getRelavtive(aRelative.x, aRelative.y, relatives[j].position).value === 'S') {
                    result++;
                }
            }
        }
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
   
    if (getValue(x, y - 1)) {
        relatives.push({
            position: 'upper',
            value: getValue(x, y - 1),
            x: x,
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

    if (getValue(x - 1, y)) {
        relatives.push({
            position: 'left',
            value: getValue(x - 1, y),
            x: x - 1,
            y: y
        });
    }

    if (getValue(x + 1, y)) {
        relatives.push({
            position: 'right',
            value: getValue(x + 1, y),
            x: x + 1,
            y: y
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

    if (getValue(x, y + 1)) {
        relatives.push({
            position: 'bottom',
            value: getValue(x, y + 1),
            x: x,
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

function getRelavtive(x, y, position) {
    switch (position) {
        case 'leftUpper':
            return {
                value: getValue(x - 1, y - 1),
                x: x - 1,
                y: y - 1
            };
        case 'upper':
            return {
                value: getValue(x, y - 1),
                x: x,
                y: y - 1
            };
        case 'rightUpper':
            return {
                value: getValue(x + 1, y - 1),
                x: x + 1,
                y: y - 1
            };
        case 'left':
            return {
                value: getValue(x - 1, y),
                x: x - 1,
                y: y
            };
        case 'right':
            return {
                value: getValue(x + 1, y),
                x: x + 1,
                y: y
            };
        case 'leftBottom':
            return {
                value: getValue(x - 1, y + 1),
                x: x - 1,
                y: y + 1
            };
        case 'bottom':
            return {
                value: getValue(x, y + 1),
                x: x,
                y: y + 1
            };
        case 'rightBottom':
            return {
                value: getValue(x + 1, y + 1),
                x: x + 1,
                y: y + 1
            };
    }
}
