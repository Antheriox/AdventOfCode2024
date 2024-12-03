const fs = require('fs');

const regex = new RegExp(/mul\((\d+),(\d+)\)/g);

const input = fs.readFileSync('input.txt', 'utf8');

let result = 0;

let match;
while ((match = regex.exec(input)) !== null) {
    const a = parseInt(match[1]);
    const b = parseInt(match[2]);
    result += a * b;
}

console.log(result);
