function jumpIfTrue(first, second, third) {
    if (!code[first].isZero()) {
        i = code[second].toJSNumber();
    } else {
        i += 3;
    }
}

function jumpIfFalse(first, second, third) {
    if (code[first].isZero()) {
        i = code[second].toJSNumber();
    } else {
        i += 3;
    }
}

function lessThan(first, second, third) {
    code[third] = code[first].lesser(code[second]) ? bigInt(1) : bigInt(0);
    i+=4;
}

function equals(first, second, third) {
    code[third] = code[first].equals(code[second]) ? bigInt(1) : bigInt(0);
    i+=4;
}

function scan(first, second, third) {
    code[first] = input;
    i+=2;
}

function print(first, second, third) {
    output.push(code[first].toJSNumber());
    i+=2;
}

function add(first, second, third) {
    code[third] = code[first].plus(code[second]);
    i+=4;
}

function mult(first, second, third) {    
    code[third] = code[first].times(code[second]);
    i+=4;
}

function adjustRelBase(first, second, third) {
    relativeBase+=code[first].toJSNumber();
    i+=2;
}

const operations = {
    1: add,
    2: mult,
    3: scan,
    4: print,
    5: jumpIfTrue,
    6: jumpIfFalse,
    7: lessThan,
    8: equals,
    9: adjustRelBase
}

function getOperation(val) {
    return val.toJSNumber() % 100;
}

function getModes(val) {
    let params = val.toJSNumber().toString().split('')
    
    while(params.length < 5) {
        params.unshift(0);
    }

    params = params.slice(0, 3)

    return params.map((x) => parseInt(x));
}

function getPtr(mode, val) {
    switch (mode) {
        case 0:
            return code[val].toJSNumber();
        case 1:
            return val;
        case 2:
            return code[val].toJSNumber() + relativeBase;
            // return code[code[val+relativeBase].toJSNumber()]
        default:
            console.log('Invalid op...');
            break;
    }
}

function execute() {
    while (true) {
        const op = getOperation(code[i]);

        const [trdMode, sndMode, fstMode] = getModes(code[i]);

        const firstPtr = getPtr(fstMode, i+1);
        const secondPtr = getPtr(sndMode, i+2);
        const thirdPtr = getPtr(trdMode, i+3)
        // const thirdPtr = trdMode === 2 ? bigInt((code[i+3].toJSNumber() + relativeBase)) : code[i+3];

        if (op === 99) break;

        operations[op](firstPtr, secondPtr, thirdPtr);
    }
}

const bigInt = require("big-integer");
const fs = require('fs')

let input = bigInt(1);
let i = 0;
let relativeBase = 0;
let output = [];

let code = fs.readFileSync('./input.txt').toString().split(',').map(x => parseInt(x));
code = code.concat(Array(10000).fill(0)).map(x => bigInt(x));
execute()
console.log(output)