const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');

let stones = Float64Array.from(input.split(' ').map(Number));


for (let i = 75; i > 0; i--) {
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
  const newArray = new Float64Array(array.length + 1);
    
  for (let i = 0; i < index; i++) {
      newArray[i] = array[i];
  }

  newArray[index] = newElement1;
  newArray[index + 1] = newElement2;
  
  for (let i = index + 1; i < array.length; i++) {
      newArray[i + 1] = array[i];
  }
  
  return newArray;
}