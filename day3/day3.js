const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString().split('\n');
const wire1 = input[0].split(',')
const wire2 = input[1].split(',')

function manhatam(p1, p2) {
    return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y)
}

function Point(x, y, steps) {
    this.x = x;
    this.y = y;
    this.steps = steps;
}

function Line(p1, p2, dir) {
    this.p1 = p1;
    this.p2 = p2;
    this.dir = dir;
}

// Creates a line starting from point
function createLine(p1, p2) {
    // Vertical
    if (p1.x === p2.x) {
        return new Line(p1, p2, 'v');
    // Horizontal
    } else {
        return new Line(p1, p2, 'h');
    }
    
}

function createPoint(origin, string) {
    const dir = string.split('')[0];
    const step = parseInt(string.slice(1));

    let dest;
    switch (dir) {
        case 'U':
            dest = new Point(origin.x, origin.y + step, origin.steps+step);
            break;
        case 'D':
            dest = new Point(origin.x, origin.y - step, origin.steps+step);
            break;
        case 'L':
            dest = new Point(origin.x - step, origin.y, origin.steps+step);
            break;
        case 'R':
            dest = new Point(origin.x + step, origin.y, origin.steps+step);
            break;
        default:
            console.log('Invalid direction');
    }
    return dest;
}

function createPoints(origin, arr) {
    let points = [origin];
    for (let i = 0; i < arr.length; i++) {
        const point = createPoint(points[i], arr[i]);
        points.push(point);        
    }

    return points;
}

function createLines(arr) {
    let lines = []
    for (let i = 1; i < arr.length; i++) {
        const line = createLine(arr[i-1], arr[i]);
        lines.push(line)    
    }

    return lines;
}

function intersect(line1, line2) {
    if (line1.dir === line2.dir) return false;

    // Line 1 is always the vertical one
    if (line1.dir === 'h'){
        [line1, line2] = swap(line1, line2);
    } 

    if (between(line1.p1.x, line2.p1.x, line2.p2.x) && between(line2.p1.y, line1.p1.y, line1.p2.y)) return true;
    
    return false;
}

function swap(a, b) {
    return [b, a]
  }

function between(val, start, end) {
    if (start > end) {
        [start, end] = swap(start, end);
    } 

    if (val >= start && val <= end) return true;
    
    return false;
}

function getIntersectPoint(l1, l2) {
    if (l1.dir === 'v') {
        [l1, l2] = swap(l1, l2)
    }
  
    const x = l2.p1.x;
    const y = l1.p1.y;

    const hStep = Math.abs(x - l1.p1.x)
    const vStep = Math.abs(y - l2.p1.y)

    const line1Steps = l1.p1.steps + hStep;
    const line2Steps = l2.p1.steps + vStep;

    const totalSteps = line1Steps+line2Steps;
        
    return new Point(x, y, totalSteps);
}

/** ---------------------------Part 1---------------------------------- */

const origin = new Point(0, 0, 0)

// Create wire 1 points 
const pointsWire1 = createPoints(origin, wire1)

// Create wire1 lines
let linesWire1 = createLines(pointsWire1);

// Create wire 2 points 
const pointsWire2 = createPoints(origin, wire2)

// Create wire2 lines
let linesWire2 = createLines(pointsWire2);

intersections = []

for (const line1 of linesWire1) {
    for (const line2 of linesWire2) {
        if (intersect(line1, line2)) {            
            const p = getIntersectPoint(line1, line2);
            intersections.push(p);
        }
    }   
}

let dists = intersections.map((point) => manhatam(origin, point)).filter((x) => x>0);
dists.sort((a, b) => a-b)
console.log('Part 1:',dists[0])

/** ---------------------------Part 2---------------------------------- */

const steps = intersections.map((x) => x.steps).filter((x) => x>0);
steps.sort((a, b) => a-b)
console.log('Part 2:', steps[0])
