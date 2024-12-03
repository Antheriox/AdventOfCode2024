const fs = require('fs');

const regex = /mul\((\d+),(\d+)\)|do\(\)|don't\(\)/g;

const input = fs.readFileSync('input.txt', 'utf8')

let mul = true;
let result = 0;

let match;
while ((match = regex.exec(input)) !== null) {
    if (match[0] === "do()") {
        mul = true;
        console.log("do");
    } else if (match[0] === "don't()") {
        mul = false;
        console.log("dont");
    } else if (mul && match[1] && match[2]) {
        console.log(match[0]);
        const a = parseInt(match[1]);
        const b = parseInt(match[2]);
        result += a * b;
    }
}

console.log(result);
