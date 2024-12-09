const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8').trim();

const lengths = input.split('').map(Number);

let disk = [];
let fileId = 0;

for (let i = 0; i < lengths.length; i += 2) {
    const fileLength = lengths[i];
    for (let j = 0; j < fileLength; j++) {
        disk.push(fileId);
    }
    
    if (i + 1 < lengths.length) {
        const freeSpaceLength = lengths[i + 1];
        for (let j = 0; j < freeSpaceLength; j++) {
            disk.push('.');
        }
    }
    
    fileId++;
}

for (let i = disk.length - 1; i >= 0; i--) {
    if (disk[i] !== '.') {
        const firstFreeIndex = disk.indexOf('.');
        
        if (firstFreeIndex !== -1 && firstFreeIndex < i) {
            disk[firstFreeIndex] = disk[i];
            disk[i] = '.';
        }
    }
}

let checksum = 0;
for (let i = 0; i < disk.length; i++) {
    if (disk[i] !== '.') {
        checksum += i * disk[i];
    }
}

console.log(checksum);
