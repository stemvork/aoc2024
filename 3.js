const day = 3;
const zeroPad = (num, places) => String(num).padStart(places, '0');

console.log(`Day ${zeroPad(day,2)} part 1: test case =`, solve1(sample()));
console.log(`Day ${zeroPad(day,2)} part 1: real case =`, solve1(input()));

console.log(`Day ${zeroPad(day,2)} part 2: test case =`, solve2(sample(true)));
console.log(`Day ${zeroPad(day,2)} part 2: real case =`, solve2(input()));

function solve1(data) {
    const candidates = data.split('mul');
    let total = 0;
    for(const c of candidates) {
	if(c[0] !== '(') continue;
	const head = c.slice(1).split(')')[0];
	const parts = head.split(",");
	if(parts.length !== 2) continue;
	// console.log(parts, 'of', head, 'of', c);
	if(!parts.every(p => p.split("").every(x => "0123456789".includes(x)))) continue;
	const n = parts.map(x => parseInt(x));
	//console.log(n[0], '*', n[1], '=', n[0] * n[1]);
	total += n[0] * n[1];
    }
    return total;
}

function parse_mul(data, i) {
    if(data[i] !== "(") return 0;
    let a = 0;
    let b = 0;
    let second = false;
    let second_start = 0;
    for(let j=0; j<data.length-i; j++) {
	//console.log('in', data, 'read', data[i+j]);
	if(!",()01234567890".includes(data[i+j])) return 0;
	if(!second && data[i+j] === ",") {
	    //console.log('in', data, 'found', data.slice(i+1, i+j));
	    a = parseInt(data.slice(i+1, i+j));
	    second = true;
	    second_start = i+j+1;
	}
	if(second && data[i+j] === ")") {
	    //console.log('in', data, 'found', data.slice(second_start, i+j));
	    b = parseInt(data.slice(second_start, i+j));
	    return a * b;
	}
    }
    return 0;
}

function solve2(data) {
    let total = 0;
    let enabled = true;
    for(let i=0; i<data.length; i++) {
	if(data[i] === "d") {
	    if(data.slice(i, i+7) === "don't()") enabled = false;
	    if(data.slice(i, i+4) === "do()") enabled = true;
	}
	if(data[i] === "m" && enabled) {
	    if(data.slice(i, i+3) === "mul") total += parse_mul(data, i+3);
	}
    }
    return total;
}

function sample(part2=false) {
    if(!part2) return `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`;
    else return `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;
}

function input() {
    const fs = require('fs');
    const data = fs.readFileSync('./3.txt', 'utf-8');
    return data.trim();
}
