fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');
const lines = input.split('\n');

for (let i = 0; i < lines.length; i++) {
    lines[i] = lines[i].trim();
}

let list1 = [];
let list2 = [];

for (let i = 0; i < lines.length; i++) {
    list1.push(lines[i].split('   ')[0]);
    list2.push(lines[i].split('   ')[1]);
}

let simScore = 0;

for (let i = 0; i < list1.length; i++) {
    let amount = 0;
    const number = +list1[i];
    for (let j = 0; j < list2.length; j++) {
        if (number === +list2[j]) {
            amount++;
        }
    }
    simScore += (amount * number);
}

console.log(simScore);