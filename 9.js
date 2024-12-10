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

console.log(`Day ${zeroPad(day,2)} part 2: test case =`, solve2(sample()));
//console.log(`Day ${zeroPad(day,2)} part 2: real case =`, solve2(input()));

function checksum_arr(arr) {
    return arr.map((x, xi) => x*xi).reduce((p, c) => p + c, 0);
}

function defrag_index(arr) {
    let i = arr.indexOf(null);
    let j = arr.length-1;
    while(arr[j] === null) { j--; }
    if(i >= j) return false;
    [arr[j], arr[i]] = [arr[i], arr[j]];
    // console.log(arr);
    return true;
}

function defrag_files(arr) {
    // NOTE: partition by file (keep index) and then start at the last file, get free spaces before the before-last file and take the first free space that can fit the last file, if no such file exists, skip moving the file for now
    console.log(arr);
    return false;
}

function solve1(data) {
    const nums = data.split("").map(x => parseInt(x));
    const files = nums.map((x, xi) => Array(x).fill(xi%2===0?xi/2:null)).flat();
    while(defrag_index(files)) continue;
    return checksum_arr(files);
}

function solve2(data) {
    const nums = data.split("").map(x => parseInt(x));
    const files = nums.map((x, xi) => Array(x).fill(xi%2===0?xi/2:null)).flat();
    while(defrag_files(files)) continue;
    return checksum_arr(files);
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
