const day = 5;
const zeroPad = (num, places) => String(num).padStart(places, '0');

console.log(`Day ${zeroPad(day,2)} part 1: test case =`, solve1(sample()));
console.log(`Day ${zeroPad(day,2)} part 1: real case =`, solve1(input()));

//console.log(`Day ${zeroPad(day,2)} part 2: test case =`, solve2(sample()));
//console.log(`Day ${zeroPad(day,2)} part 2: real case =`, solve2(input()));

function solve1(data) {
    const lines = data.split('\n');
}

function solve2(data) {
    const lines = data.split('\n');
}

function sample() {
    return ``;
}

function input() {
    return ``;
}

function read_file(path) {
    const fs = require('fs');
    const data = fs.readFileSync(path, 'utf-8');
    return data.trim();
}
