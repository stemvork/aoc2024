const day = 9;
const zeroPad = (num, places) => String(num).padStart(places, '0');

const tests = [
    ["12345", 60],
    ["2333133121414131402", 1928],
];
let results = "";
for(const [i, o] of tests) {
    if(solve1(i) !== o) {
	results = results.concat(".");
    } else {
	results = results.concat("o");
    }
}
console.log("Test results:", results);

console.log(`Day ${zeroPad(day,2)} part 1: test case =`, solve1(sample()));
console.log(`Day ${zeroPad(day,2)} part 1: real case =`, solve1(input()));

//console.log(`Day ${zeroPad(day,2)} part 2: test case =`, solve2(sample()));
//console.log(`Day ${zeroPad(day,2)} part 2: real case =`, solve2(input()));

function get_last_not(str, c) {
    for(let i=str.length-1; i>0; i--) {
	if(str[i] !== c) return i;
    }
}

function checksum(str) {
    let total = 0;
    for(let i=0; i<str.length; i++) {
	if(str[i] === '.') continue;
	const code = str.charCodeAt(i);
	if(code > 47 && code < 58) {
	    total += parseInt(str[i]) * i;
	}
    }
    return total;
}

function solve1(data) {
    const chars = data.split("");
    let defrag = "";
    let free = 0;
    let used = 0;
    for(let i=0; i<chars.length; i++) {
	const x = parseInt(chars[i]);
	if(i%2 === 0) { 
	    const suffix = `${i/2}`.repeat(x);
	    defrag = `${defrag}${suffix}`; 
	    used += x;
	}
	if(i%2 === 1) { 
	    const suffix = '.'.repeat(x);
	    defrag = `${defrag}${suffix}`; 
	    if(i !== chars.length - 1) free += x;
	}
    }

    let i = defrag.indexOf('.');
    let j = get_last_not(defrag, '.');
    while(i < j) {
	if(defrag.slice(i).split("").every(x => x === ".")) return checksum(defrag);
	defrag = defrag.slice(0, i) + defrag[j] + defrag.slice(i+1, j) + '.'.repeat(defrag.length-j);
	// console.log(defrag);
	i = defrag.indexOf('.');
	j = get_last_not(defrag, '.');
    }
    return checksum(defrag);
}

function solve2(data) {
    const lines = data.split('\n');
}

function sample() {
    return `2333133121414131402`;
}

function input() {
    return read_file(`./${day}.txt`);
}

function read_file(path) {
    const fs = require('fs');
    const data = fs.readFileSync(path, 'utf-8');
    return data.trim();
}
