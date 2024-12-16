const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');
const lines = input.trim().split('\n');

const grid = [];

for (let i = 0; i < lines.length; i++) {
    grid.push(lines[i].split(''));
}

const result = solveMazeWithAStar(grid);
console.log(result);

function solveMazeWithAStar(maze) {
    const directions = ['NORTH', 'EAST', 'SOUTH', 'WEST'];
    const dirOffsets = {
        'NORTH': [-1, 0],
        'EAST': [0, 1],
        'SOUTH': [1, 0],
        'WEST': [0, -1]
    };

    let start, end;
    for (let r = 0; r < maze.length; r++) {
        for (let c = 0; c < maze[r].length; c++) {
            if (maze[r][c] === 'S') start = [r, c];
            if (maze[r][c] === 'E') end = [r, c];
        }
    }

    const rows = maze.length;
    const cols = maze[0].length;

    function heuristic(x, y) {
        return Math.abs(x - end[0]) + Math.abs(y - end[1]);
    }

    class PriorityQueue {
        constructor() {
            this.queue = [];
        }
        enqueue(item) {
            this.queue.push(item);
            this.queue.sort((a, b) => a.priority - b.priority);
        }
        dequeue() {
            return this.queue.shift();
        }
        isEmpty() {
            return this.queue.length === 0;
        }
    }

    const queue = new PriorityQueue();
    const costs = new Map();

    function stateKey(x, y, dir) {
        return `${x},${y},${dir}`;
    }

    for (let dir of directions) {
        const key = stateKey(start[0], start[1], dir);
        costs.set(key, Infinity);
    }
    queue.enqueue({ x: start[0], y: start[1], dir: 'EAST', g: 0, priority: heuristic(start[0], start[1]) });
    costs.set(stateKey(start[0], start[1], 'EAST'), 0);

    while (!queue.isEmpty()) {
        const { x, y, dir, g } = queue.dequeue();

        if (x === end[0] && y === end[1]) return g;

        for (let i = 0; i < directions.length; i++) {
            const newDir = directions[i];
            const turnCost = dir === newDir ? 0 : 1000;

            const [dx, dy] = dirOffsets[newDir];
            const nx = x + dx;
            const ny = y + dy;

            if (nx >= 0 && ny >= 0 && nx < rows && ny < cols && maze[nx][ny] !== '#') {
                const newG = g + turnCost + 1;
                const newKey = stateKey(nx, ny, newDir);
                const newPriority = newG + heuristic(nx, ny);

                if (newG < (costs.get(newKey) || Infinity)) {
                    costs.set(newKey, newG);
                    queue.enqueue({ x: nx, y: ny, dir: newDir, g: newG, priority: newPriority });
                }
            }
        }
    }

    return -1
}
