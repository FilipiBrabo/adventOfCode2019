const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString().split(',').map(x => parseInt(x));

function intCode(code, input) {
    for (let i = 0; i < code.length;) {
        const op = getOperation(code[i]);

        const [_, sndMode, fstMode] = getModes([code[i]]);

        const first = fstMode === 0 ? code[code[i+1]] : code[i+1];
        const second = sndMode === 0 ? code[code[i+2]] : code[i+2];
        
        switch (op) {
            case 9:
                return code;

            case 3:
                code[code[i+1]] = input[0];
                input.splice(0,1);
                i += 2;
                break;

            case 4:
                return first;
            
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
                code[code[i+3]] = first < second ? 1 : 0;
                i += 4;
                break;

            case 8:
                code[code[i+3]] = first === second ? 1 : 0;
                i += 4;
                break;
            
            default:               
        
                code[code[i+3]] = op === 1 ? sum(first, second) : mult(first, second);             
                
                i += 4;
                break;
        }
    }

    return code;
}

function getModes(code) {
    let params = code.toString().split('')
    
    while(params.length < 5) {
        params.unshift(0);
    }

    params = params.slice(0, 3)

    return params.map((x) => parseInt(x))
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

function getAllPermutations(string) {
    let results = [];
  
    if (string.length === 1) {
      results.push(string);
      return results;
    }
  
    for (let i = 0; i < string.length; i++) {
      let firstChar = string[i];
      let charsLeft = string.substring(0, i) + string.substring(i + 1);
      let innerPermutations = getAllPermutations(charsLeft);
      for (let j = 0; j < innerPermutations.length; j++) {
        results.push(firstChar + innerPermutations[j]);
      }
    }
    return results;
}

const range = getAllPermutations('01234').map( s => s.split('')).map( s => s.map( c => parseInt(c)))
let maxSignal = -99999;
for (const ampPhase of range) {
    let ampInput = 0
    for (let i = 0; i < 5; i++) {
        ampInput = intCode([...input], [ampPhase[i], ampInput]);    
    }
    maxSignal = Math.max(maxSignal, ampInput); 
}

console.log(maxSignal)
