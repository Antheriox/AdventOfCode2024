const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');

const lines = input.split('\n');

const grid = [];

for (let i = 0; i < lines.length; i++) {
    const chars = lines[i].split('');
    grid.push(chars);
}

let startingPos = {x: 0, y: 0};
let found = false;

for (let i = 0; i < grid.length; i++) {
    if (found) {
        break;
    }
    const row = grid[i];
    for (let j = 0; j < row.length; j++) {
        if (row[j] === '^') {
            startingPos = {x: j, y: i};
            found = true;
            break;
        }
    }
}

setValue(startingPos.x, startingPos.y, '.');

let result = 0;

for (let i = 0; i < grid.length; i++) {
    const row = grid[i];
    for (let j = 0; j < row.length; j++) {
        const obstructionPos = { x: j, y: i };
        if (obstructionPos.x === startingPos.x && obstructionPos.y === startingPos.y || getValue(obstructionPos.x, obstructionPos.y) === '#') {
            continue;
        }
        setValue(obstructionPos.x, obstructionPos.y, 'o');

        let done = false;
        let currentPos = { x: startingPos.x, y: startingPos.y };
        let facing = "UP";
        const states = new Set();
        while (!done) {
            const state = `${currentPos.x},${currentPos.y},${facing}`;
            if (states.has(state)) {
                result++;
                done = true;
                continue;
            }
            states.add(state);
            let next = getNextValue(currentPos.x, currentPos.y, facing);
            if (next === '.') {
                currentPos = getNextPos(currentPos.x, currentPos.y, facing);
                continue;
            } else if (next === '#' || next === 'o') {
                facing = getRight(facing);
                continue;
            } else if (!next) {
                done = true;
                continue;
            } else {
                result--;
            }
        }
        setValue(obstructionPos.x, obstructionPos.y, '.');
    }
}

console.log(result);

function getValue(x, y) {
    if (x < 0 || x >= grid[0].length || y < 0 || y >= grid.length) {
        return null;
    }
    return grid[y][x];
}

function setValue(x, y, value) {
    if (x < 0 || x >= grid[0].length || y < 0 || y >= grid.length) {
        return;
    }
    grid[y][x] = value;
}

function getNextValue(x, y, face) {
    switch (face) {
        case "UP":
            return getValue(x, y - 1);
        case "DOWN":
            return getValue(x, y + 1);
        case "LEFT":
            return getValue(x - 1, y);
        case "RIGHT":
            return getValue(x + 1, y);
    }
}

function getNextPos(x, y, face) {
    switch (face) {
        case "UP":
            return {x: x, y: y - 1};
        case "DOWN":
            return {x: x, y: y + 1};
        case "LEFT":
            return {x: x - 1, y: y};
        case "RIGHT":
            return {x: x + 1, y: y};
    }
}

function getRight(face) {
    switch (face) {
        case "UP":
            return "RIGHT";
        case "DOWN":
            return "LEFT";
        case "LEFT":
            return "UP";
        case "RIGHT":
            return "DOWN";
    }
}
