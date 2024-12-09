const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8').trim();

const lengths = input.split('').map(Number);

function compactDisk(lengths) {
    let disk = [];
    let fileInfo = [];
    let fileId = 0;

    for (let i = 0; i < lengths.length; i += 2) {
        const fileLength = lengths[i];
        const startIndex = disk.length;
        
        for (let j = 0; j < fileLength; j++) {
            disk.push(fileId);
        }
        
        fileInfo.push({
            id: fileId,
            length: fileLength,
            startIndex: startIndex
        });
        
        if (i + 1 < lengths.length) {
            const freeSpaceLength = lengths[i + 1];
            for (let j = 0; j < freeSpaceLength; j++) {
                disk.push('.');
            }
        }
        
        fileId++;
    }

    fileInfo.sort((a, b) => b.id - a.id);

    for (const file of fileInfo) {
        const fileBlocks = disk.slice(file.startIndex, file.startIndex + file.length);

        let bestFitIndex = -1;
        for (let i = 0; i <= file.startIndex; i++) {
            const potentialSpaceSlice = disk.slice(i, i + file.length);
            if (potentialSpaceSlice.every(block => block === '.')) {
                bestFitIndex = i;
                break;
            }
        }
        
        if (bestFitIndex !== -1) {
            for (let i = file.startIndex; i < file.startIndex + file.length; i++) {
                disk[i] = '.';
            }
            for (let i = 0; i < file.length; i++) {
                disk[bestFitIndex + i] = fileBlocks[i];
            }
        }
    }

    return disk;
}

const disk = compactDisk(lengths);

let checksum = 0;
for (let i = 0; i < disk.length; i++) {
    if (disk[i] !== '.') {
        checksum += i * disk[i];
    }
}

console.log(checksum);