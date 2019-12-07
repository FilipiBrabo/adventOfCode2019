const fs = require('fs');
const Graph = require('graph-data-structure');

const input = fs.readFileSync('./input.txt').toString().split('\r\n');

let graph = new Graph();

for (const string of input) {
    const nodes = string.split(')');

    graph.addEdge(nodes[1], nodes[0]);
    graph.addEdge(nodes[0], nodes[1]);    
}

console.log(graph.shortestPath('YOU', 'SAN').weight - 2);