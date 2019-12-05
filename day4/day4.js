const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString().split('-');

const start = parseInt(input[0]);
const end = parseInt(input[1]);

function validadePar1(arr) {
    return isSorted(arr) && anyDouble(arr);
}

function validadePar2(arr) {
    return isSorted(arr) && anyDuplicate(arr);
}

function isSorted(arr) {
    let sorted = true; 
    for (let i = 1; i < arr.length && sorted; i++) {
        sorted = arr[i] >= arr[i-1] ? true : false;        
    }
    return sorted
}

function anyDouble(arr) {
    let found = false;
    for (let i = 0; i < arr.length && !found; i++) {
        found = arr[i] === arr[i-1] ? true : false;        
    }

    return found;
}

function anyDuplicate(arr) {
    let found = false;
    for (let i = 0; i < arr.length && !found; i++) {
        if (arr[i-1] === arr[i] && arr[i] !== arr[i+1] && arr[i] !== arr[i-2]) {
            found = true;
        }        
    }
    return found;
}

let pws1 = 0;
let pws2 = 0;
for (let i = start; i < end; i++) {
    const pw = Array.from(String(i), Number);
    if (validadePar1(pw)) pws1++; 
    if (validadePar2(pw)) pws2++;
}

console.log('Part 1:', pws1)
console.log('Part 2:', pws2)
