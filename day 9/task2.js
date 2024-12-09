const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8').trim();

const lengths = input.split('').map(Number);

// Function to compact disk using whole file movement
function compactDisk(lengths) {
    let disk = [];
    let fileInfo = [];
    let fileId = 0;

    // Initialize disk
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

    // Sort files by ID in descending order
    fileInfo.sort((a, b) => b.id - a.id);

    // Compact files
    for (const file of fileInfo) {
        const fileBlocks = disk.slice(file.startIndex, file.startIndex + file.length);

        // Find the leftmost span of free space that can accommodate the file
        let bestFitIndex = -1;
        for (let i = 0; i <= file.startIndex; i++) {
            // Check if there's enough free space from index i
            const potentialSpaceSlice = disk.slice(i, i + file.length);
            if (potentialSpaceSlice.every(block => block === '.')) {
                bestFitIndex = i;
                break;
            }
        }
        
        // Move the file if a suitable free space is found
        if (bestFitIndex !== -1) {
            // Clear the original file location
            for (let i = file.startIndex; i < file.startIndex + file.length; i++) {
                disk[i] = '.';
            }
            
            // Place the file in the new location
            for (let i = 0; i < file.length; i++) {
                disk[bestFitIndex + i] = fileBlocks[i];
            }
        }
    }

    return disk;
}

// Run compaction
const disk = compactDisk(lengths);

// Calculate checksum
let checksum = 0;
for (let i = 0; i < disk.length; i++) {
    if (disk[i] !== '.') {
        checksum += i * disk[i];
    }
}

console.log(checksum);