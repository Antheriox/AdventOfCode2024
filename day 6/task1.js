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

setValue(startingPos.x, startingPos.y, 'x');

let done = false;
let currentPos = {x: startingPos.x, y: startingPos.y};
let facing = "UP";

while(!done) {
    let next = getNextValue(currentPos.x, currentPos.y, facing);
    if (next === '.' || next === 'x') {
        setValue(currentPos.x, currentPos.y, 'x');
        currentPos = getNextPos(currentPos.x, currentPos.y, facing);
    } else if (next === '#') {
        facing = getRight(facing);
        setValue(currentPos.x, currentPos.y, 'x');
        currentPos = getNextPos(currentPos.x, currentPos.y, facing);
    } else if (next === null) {
        setValue(currentPos.x, currentPos.y, 'x');
        done = true
    }
}

let result = 0;

for (let i = 0; i < grid.length; i++) {
    const row = grid[i];
    for (let j = 0; j < row.length; j++) {
        if (row[j] === 'x') {
            result++;
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
