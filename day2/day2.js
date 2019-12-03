const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString().split(',').map(x => parseInt(x));

// Part 1

let program = [...input];

program[1] = 12;
program[2] = 2;

calculate(program);

console.log(program[0]);

function calculate(program) {
    for (let i = 0; i < program.length; i+=4) {
        if (program[i] == 99) break;
    
        const a = program[program[i+1]];
        const b = program[program[i+2]];
        
        program[program[i+3]] = program[i] === 1 ? sum(a, b) : mult(a, b);    
    }

    return program[0];
}

function sum(a, b) {
    return a+b;
}

function mult(a, b) {
    return a*b;
}

/* -------------------------------------------------------------------- */
// Part 2

// Reset program
program = [...input];

const {noun, verb} = getVars(program);

console.log(noun, verb);

function getVars (program) {
    for (let noun = 0; noun < 99; noun++) {
        for (let verb = 0; verb < 99; verb++) {
            program[1] = noun;
            program[2] = verb;
            if (calculate(program) === 19690720) {
                return {noun, verb};
            } 
            program = [...input];      
        }
    }
}
