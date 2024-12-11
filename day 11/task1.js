const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');

let stones = input.split(' ').map(Number);

for (let i = 25; i > 0; i--) {
    for (let j = 0; j < stones.length; j++) {
        if (stones[j] === 0) {
            stones[j] = 1;
        } else if (stones[j].toString().length % 2 === 0) {
            const firstHalf = stones[j].toString().slice(0, stones[j].toString().length / 2);
            const secondHalf = stones[j].toString().slice(stones[j].toString().length / 2);
            stones = splitAndInsertAtIndex(stones, j, Number(firstHalf), Number(secondHalf));
            j++;
        } else {
            stones[j] = stones[j] * 2024;
        }
    }
}

console.log(stones.length);

function splitAndInsertAtIndex(array, index, newElement1, newElement2) {
    array.splice(index, 1);

    array.splice(index, 0, newElement1, newElement2);

    return array;
}