const fs = require('fs');
const data = fs.readFileSync("./9.txt", 'utf-8').trim();

const sample = '2333133121414131402';

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

function last_index_of_file(disk) {
    for(let i=disk.length-1; i>0; i--) {
	if(disk[i] !== '.') return i;
    }
}

function solve(data) { 
    const ls = data.split('').map(x => parseInt(x));
    const total = ls.reduce((a, b) => a + b, 0);
    let disk = Array(total).fill('.');
    let i = 0;
    ls.forEach((f, fi) => {
	if(fi%2 === 1) { i += f; return; }

	for(let j=0; j<f; j++) {
	    disk[i+j] = fi/2;
	}
	i += f;
    });
    // console.log("LOADED:", disk.join(""));

    i = disk.indexOf('.');
    let j = last_index_of_file(disk);
    while(i < j) {
	[disk[j], disk[i]] = [disk[i], disk[j]];
	i = disk.indexOf('.');
	j = last_index_of_file(disk);
	//console.log("DEFRAG:", disk.join(""));
    }
    // console.log("FINISH:", disk.join(""));
    console.log(checksum(disk.join("")));
}

solve(sample);
solve(data);
