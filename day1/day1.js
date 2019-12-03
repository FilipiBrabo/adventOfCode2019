const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString().split('\n');

// Part 1
const mass = input.map(x => parseInt(x));

const fuel = mass.map( x => Math.floor(x/3)).map(x => {
    return x-2
});

const totalFuel1 = fuel.reduce((x, y) => (x+y));
console.log(totalFuel1)

// Part 2
function getFuel(mass) {
    const fuel = Math.floor(mass/3) - 2;
    if (fuel <= 0) return 0;
    return (fuel + getFuel(fuel));
}

const totalFuel2 = mass.map(mass => getFuel(mass)).reduce((x, y) => (x+y))
console.log(totalFuel2);


