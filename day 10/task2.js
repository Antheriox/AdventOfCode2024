const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');

const lines = input.split('\n');

const grid = [];

for (let i = 0; i < lines.length; i++) {
    const chars = lines[i].split('');
    grid.push(chars);
}

const trailheads = [];

for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
        if (grid[i][j] === '0') {
            trailheads.push({ x: j, y: i });
        }
    }
}

let result = 0;

for (let i = 0; i < trailheads.length; i++) {
    const {x, y} = trailheads[i];
    result += findTrails(x, y);
}

console.log(result);

function getValue(x, y) {
    if (x < 0 || x >= grid[0].length || y < 0 || y >= grid.length) {
        return null;
    }

    return +grid[y][x];
}

function findTrails(x, y) {
    const key = `${x},${y}`;

    const value = getValue(x, y);
    if (value === 9) return 1;
    if (value === null) return 0;

    let score = 0;

    const directions = [
        { dx: 0, dy: -1 },
        { dx: -1, dy: 0 },
        { dx: 1, dy: 0 },
        { dx: 0, dy: 1 }
    ];

    for (const { dx, dy } of directions) {
        const nx = x + dx;
        const ny = y + dy;
        const nextValue = getValue(nx, ny);

        if (nextValue === value + 1) {
            score += findTrails(nx, ny);
        }
    }

    return score;
}