const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString().split('').map(x => parseInt(x));

const width = 25;
const height = 6;
const layerSize = width*height;

let layerWithLeastZeros = input.slice(0, layerSize);
let min = layerWithLeastZeros.filter( (x) => x === 0).length;

for (let i = layerSize; i < input.length; i+=layerSize) {
    const layer = input.slice(i, i+layerSize);
    
    const numOfZeros = layer.filter((x) => x === 0).length;

    if (numOfZeros < min) {
        min = numOfZeros;
        layerWithLeastZeros = layer;
    }
}

const numOfOnes = layerWithLeastZeros.filter((x) => x===1).length;
const numOfTwos = layerWithLeastZeros.filter((x) => x===2).length;
console.log(numOfOnes*numOfTwos);