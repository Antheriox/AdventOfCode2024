const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');

const lines = input.split('\n');

const equations = [];

for (let i = 0; i < lines.length; i++) {
    const answer = +lines[i].split(':')[0];
    const numbers = lines[i].split(':')[1].trim().split(' ').map(Number);
    equations.push({ answer, numbers });
}

const result = totalCalibrationResult(equations);
console.log("Total Calibration Result:", result);

function evaluateExpression(numbers, operators) {
    let result = numbers[0];
    for (let i = 0; i < operators.length; i++) {
        if (operators[i] === '+') {
            result += numbers[i + 1];
        } else if (operators[i] === '*') {
            result *= numbers[i + 1];
        } else if (operators[i] === '||') {
            result = parseInt('' + result + numbers[i + 1]);
        }
    }
    return result;
}

function isValidEquation(answer, numbers) {
    const numOperators = numbers.length - 1;
    const operators = ['+', '*', '||'];

    function* generateCombinations(n) {
        if (n === 0) {
            yield [];
            return;
        }
        for (const op of operators) {
            for (const combo of generateCombinations(n - 1)) {
                yield [op, ...combo];
            }
        }
    }

    for (const ops of generateCombinations(numOperators)) {
        if (evaluateExpression(numbers, ops) === answer) {
            return true;
        }
    }
    return false;
}

function totalCalibrationResult(equations) {
    let total = 0;
    for (let i = 0; i < equations.length; i++) { 
        const { answer, numbers } = equations[i];
        if (isValidEquation(answer, numbers)) {
            total += answer;
        }
    }
    return total;
}
