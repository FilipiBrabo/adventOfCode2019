const fs = require('fs');
const scanf = require('scanf');
const input = fs.readFileSync('./input.txt').toString().split(',').map(x => parseInt(x));

function calculate(program) {
    for (let i = 0; i < program.length;) {
        const op = getOperation(program[i]);

        const [_, sndMode, fstMode] = getModes([program[i]]);

        const first = fstMode === 0 ? program[program[i+1]] : program[i+1];
        const second = sndMode === 0 ? program[program[i+2]] : program[i+2];

        switch (op) {
            case 9:
                return program;

            case 3:
                program[program[i+1]] = scanf('%d');
                i += 2;
                break;

            case 4:
                console.log(first);
                i += 2;
                break;
            
            case 5:
                if (first !== 0) {
                    i = second;
                } else {
                    i += 3;
                }
                break;

            case 6:
                if (first === 0) {
                    i = second;
                } else {
                    i += 3;
                }
                break;
            
            case 7:
                program[program[i+3]] = first < second ? 1 : 0;
                i += 4;
                break;

            case 8:
                program[program[i+3]] = first === second ? 1 : 0;
                i += 4;
                break;
            
            default:               
        
                program[program[i+3]] = op === 1 ? sum(first, second) : mult(first, second);             
                
                i += 4;
                break;
        }
    }

    return program;
}

function getModes(code) {
    let params = code.toString().split('')
    
    while(params.length < 5) {
        params.unshift(0);
    }

    params = params.slice(0, 3)

    return params.map((x) => parseInt(x))
}

function numOfDigits(num) {    
    return num.toString().length;
}

function getOperation(code) {
    return code % 10
}

function sum(a, b) {
    return a+b;
}

function mult(a, b) {
    return a*b;
}

calculate(input)