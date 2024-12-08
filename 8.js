const day = 8;
const zeroPad = (num, places) => String(num).padStart(places, '0');

console.log(`Day ${zeroPad(day,2)} part 1: test case =`, solve1(sample()));
console.log(`Day ${zeroPad(day,2)} part 1: real case =`, solve1(input()));

console.log(`Day ${zeroPad(day,2)} part 2: test case =`, solve2(sample()));
console.log(`Day ${zeroPad(day,2)} part 2: real case =`, solve2(input()));

function render(grid) {
    console.log(grid.map(x => x.join("")).join("\n"));
}

function get_antinodes(a, b, n=2) {
    const [xa, ya] = a.split(',').map(x => parseInt(x));
    const [xb, yb] = b.split(',').map(x => parseInt(x));
    if(n === 2) {
	const a1x = xa - (xb - xa);
	const a1y = ya - (yb - ya);
	const a2x = xb + (xb - xa);
	const a2y = yb + (yb - ya);
	return [`${a1x},${a1y}`, `${a2x},${a2y}`];
    } else {
	const result = [];
	const dx = xb - xa;
	const dy = yb - ya;
	for(let i=0; i<n; i++) {
	    result.push(`${xa-dx*i},${ya-dy*i}`);
	    result.push(`${xb+dx*i},${yb+dy*i}`);
	}
	return result;
    }
}

function get_towers(grid, freqs) {
}

function solve1(data) {
    const grid = data.split('\n').map(x => x.split(''));
    render(grid);

    const freqs = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").filter(x => data.indexOf(x) > 0);
    console.log('Number of frequencies present:', freqs.length);
    if(freqs.length < 10) console.log("Frequencies present:", freqs);

    const towers = {};
    for(const f of freqs) towers[f] = [];
    for(let y=0; y<grid.length; y++) {
	for(let x=0; x<grid.length; x++) {
	    let i, f;
	    const found = freqs.some((freq, fi) => { f = freq; i = fi; return f === grid[y][x]; });
	    if(found) towers[freqs[i]].push(`${x},${y}`);
	}
    }
    console.log('Towers:', towers);

    const antinodes = new Set();
    for(const t of Object.values(towers)) {
	const pairs = t.map((v, i) => t.slice(i+1).map(w => [v, w])).flat();
	pairs.forEach(pair => {
	    const a = get_antinodes(...pair);
	    for(const n of a) {
		const [x, y] = n.split(',').map(x => parseInt(x));
		// console.log(0, x, grid[0].length, '|', 0, y, grid.length);
		if(x >= 0 && x < grid[0].length && y >= 0 && y < grid.length) {
		    antinodes.add(n);
		}
	    }
	});
    }
    console.log('Antinodes:', [...antinodes]);
    return antinodes.size;
}

function solve2(data) {
    const grid = data.split('\n').map(x => x.split(''));
    render(grid);

    const freqs = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").filter(x => data.indexOf(x) > 0);
    console.log('Number of frequencies present:', freqs.length);
    if(freqs.length < 10) console.log("Frequencies present:", freqs);

    const towers = {};
    for(const f of freqs) towers[f] = [];
    for(let y=0; y<grid.length; y++) {
	for(let x=0; x<grid.length; x++) {
	    let i, f;
	    const found = freqs.some((freq, fi) => { f = freq; i = fi; return f === grid[y][x]; });
	    if(found) towers[freqs[i]].push(`${x},${y}`);
	}
    }
    console.log('Towers:', towers);

    const antinodes = new Set();
    const N_MAX = Math.max(grid[0].length, grid.length);
    for(const t of Object.values(towers)) {
	const pairs = t.map((v, i) => t.slice(i+1).map(w => [v, w])).flat();
	pairs.forEach(pair => {
	    const a = get_antinodes(...pair, n=N_MAX);
	    for(const n of a) {
		const [x, y] = n.split(',').map(x => parseInt(x));
		// console.log(0, x, grid[0].length, '|', 0, y, grid.length);
		if(x >= 0 && x < grid[0].length && y >= 0 && y < grid.length) {
		    antinodes.add(n);
		}
	    }
	});
    }
    console.log('Antinodes:', [...antinodes]);
    return antinodes.size;
}

function sample() {
    return `............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`;
}

function input() {
    return read_file(`./${day}.txt`);
}

function read_file(path) {
    const fs = require('fs');
    const data = fs.readFileSync(path, 'utf-8');
    return data.trim();
}
