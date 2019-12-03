const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString().split('\n');
const wire1 = input[0].split(',')
const wire2 = input[1].split(',')

function manhatam(p1, p2) {
    return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y)
}

function isHorizontal(s) {
    const dir = s.split('')[0];
    return dir === 'L' || dir === 'R';
}

// Part 1
    console.log(wire1[0].split(''))
