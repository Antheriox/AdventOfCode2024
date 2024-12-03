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

list1.sort();
list2.sort();


let sum = 0;

for (let i = 0; i < list1.length; i++) {
    const a = +list1[i];
    const b = +list2[i];
    console.log(a, b);

    let result = 0;

    if (a > b) {
        result = a - b;
        
    }
    if (b > a) {
        result = b - a;
    }
    sum += result;
}

console.log(sum);