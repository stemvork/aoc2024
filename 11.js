const day = 11;
const zeroPad = (num, places) => String(num).padStart(places, '0');

console.log(`Day ${zeroPad(day,2)} part 1: test case =`, solve1(sample()));
console.log(`Day ${zeroPad(day,2)} part 1: real case =`, solve1(input()));

function blink(stone) {
    const ss = stone.toString();
    const sn = ss.length;
    if(stone === 0) { 
	//console.log("0 becomes 1");
	return 1;
    } else if(sn % 2 === 0) {
	const [a, b] = [ss.slice(0, sn/2), ss.slice(sn/2)].map(x => parseInt(x));
	//console.log('split', ss, 'into', a, b);
	return [a, b];
    } else {
	//console.log('multiply', s, 'by 2024');
	return stone*2024;
    }
}

function solve1(data, n=25) {
    const stones = data.split(' ').map(x => parseInt(x));
    console.log(stones);

    let new_stones = stones.map(s => blink(s)).flat();
    for(let i=0; i<n-1; i++) {
	new_stones = new_stones.map(s => blink(s)).flat();
    }
    console.log(new_stones);
    return new_stones.length;
}

function blink_and_count(stone, n) {
    if(n === 0) return 1;
    if(stone === 0) { 
	return blink_and_count(1, n-1); 
    }
    const s = `${stone}`;
    const l = s.length;
    if(l%2 === 0) { 
	const [a, b] = [s.slice(0, l/2), s.slice(l/2)].map(x => parseInt(x));
	return blink_and_count(a, n-1) + blink_and_count(b, n-1); 
    }
    return blink_and_count(stone * 2024, n-1);
}

function collect(stones, n=25) {
    return stones.reduce((a, b) => a + blink_and_count(b, n), 0);
}

const d = {};
const dp = (x, t) => {
    if(`${x},${t}` in d) {
	return d[`${x},${t}`];
    }
    let ret = 0;
    if(t === 0) {
	ret = 1;
    } else if(x === 0) {
	ret = dp(1, t-1);
    } else if(x.toString().length%2 === 0) {
	const xstr = x.toString();
	const lstr = xstr.length;
	const [left, right] = [xstr.slice(0, lstr/2), xstr.slice(lstr/2)].map(x => parseInt(x));
	ret = dp(left, t-1) + dp(right, t-1);
    } else {
	ret = dp(x * 2024, t-1);
    }
    d[`${x},${t}`] = ret;
    return ret;
}

const solve2 = (data) =>  {
    const stones = data.split(' ').map(x => parseInt(x));
    return stones.map(x => dp(x, 75)).reduce((a, b) => a + b, 0);
	//   for(let i=0; i<35; i++) {
	//const start = performance.now();
	//const count = collect(stones, i);
	//const end = performance.now();
	//console.log(i, count, 'in', end-start);
	//   }
    //return collect(stones, 75);

    //console.log("[TESTING]");
    //console.log("    [125, 17]", collect([125, 17], 6));
    //console.log("    [125, 17]", collect([125, 17], 25));
    //console.log("[END]");
}

console.log(`Day ${zeroPad(day,2)} part 2: test case =`, solve2(sample()));
console.log(`Day ${zeroPad(day,2)} part 2: real case =`, solve2(input()));

function sample() {
    return `125 17`;
}

function input() {
    return read_file(`./${day}.txt`);
}

function read_file(path) {
    const fs = require('fs');
    const data = fs.readFileSync(path, 'utf-8');
    return data.trim();
}
