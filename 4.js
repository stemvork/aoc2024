const day = 4;
const zeroPad = (num, places) => String(num).padStart(places, '0');

console.log(`Day ${zeroPad(day,2)} part 1: test case =`, solve1(sample()));
console.log(`Day ${zeroPad(day,2)} part 1: real case =`, solve1(input()));

console.log(`Day ${zeroPad(day,2)} part 2: test case =`, solve2(sample()));
console.log(`Day ${zeroPad(day,2)} part 2: real case =`, solve2(input()));

function search_and_set(grid, i, j, mask, count) {
    if(i>=3 && j>=3) { // up left diagonal
	const word = [grid[i][j], grid[i-1][j-1], grid[i-2][j-2], grid[i-3][j-3]].join("");
	if(word === "XMAS" || word === "SAMX") {
	    mask[i][j]     ||= true;
	    mask[i-1][j-1] ||= true;
	    mask[i-2][j-2] ||= true;
	    mask[i-3][j-3] ||= true;
	    count++;
	}
    }
    if(i>=3 && j<grid.n-3) { // up right diagonal
	const word = [grid[i][j], grid[i-1][j+1], grid[i-2][j+2], grid[i-3][j+3]].join("");
	if(word === "XMAS" || word === "SAMX") {
	    mask[i][j]     ||= true;
	    mask[i-1][j+1] ||= true;
	    mask[i-2][j+2] ||= true;
	    mask[i-3][j+3] ||= true;
	    count++;
	}
    }
    if(i<grid.m-3 && j>=3) { // down left diagonal
	const word = [grid[i][j], grid[i+1][j-1], grid[i+2][j-2], grid[i+3][j-3]].join("");
	if(word === "XMAS" || word === "SAMX") {
	    mask[i][j]     ||= true;
	    mask[i+1][j-1] ||= true;
	    mask[i+2][j-2] ||= true;
	    mask[i+3][j-3] ||= true;
	    count++;
	}
    }
    if(i<grid.m-3 && j<grid.n-3) { // down right diagonal
	const word = [grid[i][j], grid[i+1][j+1], grid[i+2][j+2], grid[i+3][j+3]].join("");
	if(word === "XMAS" || word === "SAMX") {
	    mask[i][j]     ||= true;
	    mask[i+1][j+1] ||= true;
	    mask[i+2][j+2] ||= true;
	    mask[i+3][j+3] ||= true;
	    count++;
	}
    }
    if(i>=3) { // up
	const word = [grid[i][j], grid[i-1][j], grid[i-2][j], grid[i-3][j]].join("");
	if(word === "XMAS" || word === "SAMX") {
	    mask[i][j]     ||= true;
	    mask[i-1][j]   ||= true;
	    mask[i-2][j]   ||= true;
	    mask[i-3][j]   ||= true;
	    count++;
	}
    }
    if(j>=3) { // left
	const word = [grid[i][j], grid[i][j-1], grid[i][j-2], grid[i][j-3]].join("");
	if(word === "XMAS" || word === "SAMX") {
	    mask[i][j]     ||= true;
	    mask[i][j-1]   ||= true;
	    mask[i][j-2]   ||= true;
	    mask[i][j-3]   ||= true;
	    count++;
	}
    }
    if(i<grid.m-3) { // down
	const word = [grid[i][j], grid[i+1][j], grid[i+2][j], grid[i+3][j]].join("");
	if(word === "XMAS" || word === "SAMX") {
	    mask[i][j]   ||= true;
	    mask[i+1][j] ||= true;
	    mask[i+2][j] ||= true;
	    mask[i+3][j] ||= true;
	    count++;
	}
    }
    if(j<grid.n-3) { // right
	const word = [grid[i][j], grid[i][j+1], grid[i][j+2], grid[i][j+3]].join("");
	if(word === "XMAS" || word === "SAMX") {
	    mask[i][j]   ||= true;
	    mask[i][j+1] ||= true;
	    mask[i][j+2] ||= true;
	    mask[i][j+3] ||= true;
	    count++;
	}
    }
    return count;
}

function solve1(data) {
    const grid = data.split('\n').map(row => row.split(''));
    grid.m = grid.length;
    grid.n = grid[0].length;
    //console.log('grid size:', grid.m, grid.n);
    const mask = Array(grid.m).fill(null).map(x => Array(grid.n).fill(false));
    let count = 0;

    for(let i=0; i<grid.m; i++) {
	for(let j=0; j<grid.n; j++) {
	    count = search_and_set(grid, i, j, mask, count);
	}
    }
    //console.log('mask\n' + mask.map(row => row.map(x => x ? 1 : 0).join("")).join("\n"));

    for(let i=0; i<grid.m; i++) {
	for(let j=0; j<grid.n; j++) {
	    if(!mask[i][j]) grid[i][j] = ".";
	}
    }
    //console.log('grid\n' + grid.map(row => row.join("")).join("\n"));
    return count/2;
}

function search_cross(grid, i, j, mask, count) {
    if(grid[i][j] !== "A") return count;
    if(i>=1 && j>=1 && i<grid.m-1 && j<grid.n-1) {
	const diag1 = [grid[i-1][j-1], grid[i][j], grid[i+1][j+1]].join("");
	const diag2 = [grid[i-1][j+1], grid[i][j], grid[i+1][j-1]].join("");
	if(["MAS", "SAM"].includes(diag1) && ["MAS", "SAM"].includes(diag2)) {
	    //console.log(diag1, diag2);
	    return count+1;
	}
    }
    return count;
}

function solve2(data) {
    const grid = data.split('\n').map(row => row.split(''));
    grid.m = grid.length;
    grid.n = grid[0].length;
    const mask = Array(grid.m).fill(null).map(x => Array(grid.n).fill(false));
    let count = 0;

    for(let i=0; i<grid.m; i++) {
	for(let j=0; j<grid.n; j++) {
	    count = search_cross(grid, i, j, mask, count);
	}
    }
    return count;
}

function sample() {
    return `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;
}

function input() {
    return read_file('./4.txt');
}

function read_file(path) {
    const fs = require('fs');
    const data = fs.readFileSync(path, 'utf-8');
    return data.trim();
}
