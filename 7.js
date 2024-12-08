const day = 7;
const zeroPad = (num, places) => String(num).padStart(places, '0');

console.log(`Day ${zeroPad(day,2)} part 1: test case =`, solve1(sample()));
console.log(`Day ${zeroPad(day,2)} part 1: real case =`, solve1(input()));

console.log(`Day ${zeroPad(day,2)} part 2: test case =`, solve2(sample()));
console.log(`Day ${zeroPad(day,2)} part 2: real case =`, solve2(input()));

function get_operations(xs) {
    const n = xs.length - 1;
    let operations = ['+', '*'];
    for(let i=1; i<n; i++) {
	const queue = [...operations];
	const result = [];
	for(const q of queue) {
	    result.push(q+'+');
	    result.push(q+'*');
	}
	operations = result;
    }
    return operations;
}

function get_operations_cat(xs) {
    const n = xs.length - 1;
    let operations = ['+', '*', "|"];
    for(let i=1; i<n; i++) {
	const queue = [...operations];
	const result = [];
	for(const q of queue) {
	    result.push(q+'+');
	    result.push(q+'*');
	    result.push(q+"|");
	}
	operations = result;
    }
    return operations;
}

function calculate(target, arr1, arr2) { // starts with arr1
    let result = arr1[0];
    for(let i=0; i<arr2.length; i++) {
	result = eval(`${result}${arr2[i]}${arr1[i+1]}`);
    }
    // if(result === target) console.log(target, arr1, arr2, result);
    return result;
}

function calculate_cat(target, arr1, arr2) { // starts with arr1
    let result = [arr1[0]];
    for(let i=0; i<arr2.length; i++) {
	if(arr2[i] === '+') {
	    result[result.length-1] += arr1[i+1];
	} else if(arr2[i] === '*') {
	    result[result.length-1] *= arr1[i+1];
	} else {
	    result.push(arr1[i+1]);
	}
    }
    //if(target === 156)  console.log(target, result);
    //if(target === 7290) console.log(target, result);
    //if(target === 192)  console.log(target, result);
    //console.log(result);
    return parseInt(result.join(""));
}

function solve1(data) {
    const lines = data.split('\n');
    let sum = 0;
    outer: for(const line of lines) {
	const [a, b] = line.split(': ');
	const target = parseInt(a);
	const xs = b.split(' ').map(x => parseInt(x));
	const operations = get_operations(xs);
	for(const o of operations) {
	    if(calculate(target, xs, o.split('')) === target) {
		sum += target;
		continue outer;
	    }
	}
    }
    return sum;
}

// FIX: 7290 is not a result of 6 8 6 15, should be a result of 6 * 8 || 6 * 15 according to text
function solve2(data) {
    const lines = data.split('\n');
    let sum = 0;
    outer: for(const line of lines) {
	const [a, b] = line.split(': ');
	const target = parseInt(a);
	const xs = b.split(' ').map(x => parseInt(x));
	const operations = get_operations_cat(xs);
	for(const o of operations) {
	    const result = calculate_cat(target, xs, o.split(''));
	    if(result === target) {
		sum += target;
		continue outer;
	    }
	}
    }
    return sum;
}

function sample() {
    return `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`;
}

function input() {
    return read_file('./7.txt');
}

function read_file(path) {
    const fs = require('fs');
    const data = fs.readFileSync(path, 'utf-8');
    return data.trim();
}
