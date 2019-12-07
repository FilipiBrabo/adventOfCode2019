const fs = require('fs');
const Graph = require('graph-data-structure');

const input = fs.readFileSync('./input.txt').toString().split('\r\n');

let graph = new Graph();

for (const string of input) {
    const nodes = string.split(')');

    graph.addEdge(nodes[1], nodes[0]);    
}

function getNumOfOrbits(node, graph) {
    if (node === 'COM') return 0;

    const target = 'COM';

    let [neighbor] = graph.adjacent(node)

    let numOfOrbits = 1;
    while (neighbor !== target && neighbor) {
        numOfOrbits++;
        [neighbor] = graph.adjacent(neighbor)
    }

    return numOfOrbits;
}

let totalNumOfOrbits = 0;
for (const node of graph.nodes()) {
    totalNumOfOrbits += getNumOfOrbits(node, graph);
}

console.log(totalNumOfOrbits);



