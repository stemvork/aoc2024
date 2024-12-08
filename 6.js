const day = 6;
const zeroPad = (num, places) => String(num).padStart(places, '0');

console.log(`Day ${zeroPad(day,2)} part 1: test case =`, solve1(sample()));
console.log(`Day ${zeroPad(day,2)} part 1: real case =`, solve1(input()));

console.log(`Day ${zeroPad(day,2)} part 2: test case =`, solve2(sample(), true));
console.log(`Day ${zeroPad(day,2)} part 2: real case =`, solve2(input(), true));

// FIX: part 1 is now off by 1 for the sample, but not for the actual input...
function guard_walks(area, part2=false) {
    const directions = [
	{ dx: 0, dy: -1, symbol: "^"}, //up
	{ dx: +1, dy: 0, symbol: ">"}, //right
	{ dx: 0, dy: +1, symbol: "v"}, //down
	{ dx: -1, dy: 0, symbol: "<"}, //left
    ];

    let guard = null;
    const symbols = "^>v<".split("");
    for(let y=0; y<area.length; y++) {
	for(let x=0; x<area[0].length; x++) {
	    const symbol = area[y][x];
	    if(symbols.includes(symbol)) {
		guard = { x, y, dir: directions.findIndex(d => d.symbol === symbol), loop: false, exits: false };
		break;
	    }
	}
    }

    guard.visited = new Set(`${guard.x},${guard.y},0`);

    while(true) {
	const { x, y, dir } = guard;
	const { dx, dy } = directions[dir];
	const nx = x + dx;
	const ny = y + dy;

	if(nx < 0 || nx >= area[0].length || ny < 0 || ny >= area.length) {
	    guard.exits = true;
	    break;
	}
	if(area[ny][nx] === "#") {
	    guard.dir = (dir+1)%4;
	} else {
	    const state = `${nx},${ny},${guard.dir}`;
	    // console.log(state);
	    if(guard.visited.has(state)) {
		guard.loop = true;
		break;
	    }
	    guard.visited.add(state);
	    guard.x = nx;
	    guard.y = ny;
	}
    }
    return guard;
}

function solve1(data) {
    const area  = data.split('\n').map(line => line.split(""));
    const { visited } = guard_walks(area);
    return new Set([...visited].map(x => x.slice(0, -2))).size;
}

function solve2(data) {
    const area  = data.split('\n').map(line => line.split(""));
    let count = 0;

    const symbols = "^>v<#".split("");
    for(let y=0; y<area.length; y++) {
	for(let x=0; x<area[0].length; x++) {
	    if(symbols.includes(area[y][x])) continue;
	    area[y][x] = '#';
	    const guard = guard_walks(area);
	    if(guard.loop) count++;
	    area[y][x] = '.';
	}
   }
    return count;
}

function sample() {
    return `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`;
}

function input() {
    return read_file('./6.txt');
}

function read_file(path) {
    const fs = require('fs');
    const data = fs.readFileSync(path, 'utf-8');
    return data.trim();
}
