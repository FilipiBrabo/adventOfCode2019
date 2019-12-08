const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString().split('').map(x => parseInt(x));

const width = 25;
const height = 6;

const layerSize = width*height;

let finalImg = Array(layerSize).fill(-1)

for (let i = 0; i < input.length; i+=layerSize) {
    const layer = input.slice(i, i+layerSize);

    for (let j = 0; j < layer.length; j++) {
        if (finalImg[j] !== -1) continue;
        if (layer[j] !== 2) finalImg[j] = layer[j];        
    }
}

finalImg = finalImg.map((x) => { 
    if (x===1) return 'X'
    else return ' ';
});

for (let i = 0; i < finalImg.length; i+=width) {
    console.log(finalImg.slice(i, i+width).join(''))    
}