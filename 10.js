const sample = `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`; //score 36
//const sample = `...0...
//...1...
//...2...
//6543456
//7.....7
//8.....8
//9.....9`; //score 2
//const sample = `..90..9
//...1.98
//...2..7
//6543456
//765.987
//876....
//987....`; //score 4
//const sample = `10..9..
//2...8..
//3...7..
//4567654
//...8..3
//...9..2
//.....01`; //score 3
const input = `1089890105678121432132101232127321012354321
0178763234589030543045000345018018985467610
3298954103490347656106215496789123876508998
4567832234321258985287306784100034565012567
2356541025652767014396454993211239654523498
1403456710787854320478567884589748703012367
0512109876598941231569545675679856412721456
7657238102345410542349830901298764567810565
8998341201986789621056721850347543201998776
7087650345679878700876545765456670102367985
6121065436901263210980238750105985434451234
5432376327874354890121129653234356321010105
2345981210965568765430098544234067865430096
1296590210567809012321107230165123956721187
0187645323456918456789236109877034847810256
0099236012567823565018045234578765432901340
1678107101998894654327102198679896001076541
2363218900806765785210231087988587123189832
1454300210712567892104345896107698894898321
0510321345643498763569856745234565765765410
9621410478761098954478765030109874327656731
8734589569454167410349034121918969018549843
9435678400123256301256121030876878129450652
4521017312321343214787036980125561034321781
5670901205430456345698347898234432211289690
4989874396012387210510256723478934300478541
3090765487801091234423105410560125410367630
2101051234945670542394576321021076523458921
1672340545234987691087689987688987984361010
0589655676101296789079012896590868970154301
3438764985054385674108543003481078561567210
0127123078765676543287632112872369432018923
6546042129654778904398910001965454342129854
7237653434569865215897601223450569243036765
8198548521010764346710510319321678154545678
9011239630781453454323423408765321069694789
0100348749692354320345014503455430678783210
3217654458543765211276769612786726789698701
8348983267012891200989838764691810652189610
9456678101101010341234542123500901643076521
8764569434514567650765430054411898701103430
7623430127603498769876121069322345632212341
6510121098012389858789012378443454543303454`; //score 501

function solve(sample) {
    const grid_from = text => text.split('\n').map(x => x.split(''));
    const grid = grid_from(sample);

    const find_value_in_grid = (value, grid) => {
	return grid.map((r, ri) => {
	    return r.map((c, ci) => {
		if(c === value) return [ci, ri];
		else return false;
	    });
	});
    };

    const starts = find_value_in_grid('0', grid).flat().filter(Boolean);
    //console.log("Trailheads:", starts);

    const ends = find_value_in_grid('9', grid).flat().filter(Boolean);
    //console.log("Peaks:", ends);

    const neighbors = (coord, grid) => {
	const [x, y] = coord;
	const candidates = [
	    [x-1, y],
	    [x+1, y],
	    [x, y-1],
	    [x, y+1],
	];
	const [n, m] = [grid.length, grid[0].length];
	return candidates.filter(x => x[0] >= 0 && x[0] < m && x[1] >= 0 && x[1] < n)
	    .map(x => [x, parseInt(grid[x[1]][x[0]])]);
    }
    //console.log("Neighbors of current trailhead:", neighbors(starts[0], grid));
    const walk_paths = (grid, paths) => {
	const new_paths = [];
	for(const p of paths) {
	    const [pos, height] = p[p.length-1];
	    const ns = neighbors(pos, grid);
	    for(const n of ns) {
		if(n[1] - height === 1) new_paths.push([...p, n]);
	    }
	}
	return new_paths;
    }

    const walk_trail = (grid, start) => {
	let paths = neighbors(start, grid).map(n => [[start, 0], n]);
	paths = walk_paths(grid, paths);
	paths = walk_paths(grid, paths);
	paths = walk_paths(grid, paths);
	paths = walk_paths(grid, paths);
	paths = walk_paths(grid, paths);
	paths = walk_paths(grid, paths);
	paths = walk_paths(grid, paths);
	paths = walk_paths(grid, paths);
	return paths;
    }

    const count_peaks = (paths) => {
	return new Set(paths.map(p => `${p[p.length-1][0]},${p[p.length-1][1]}`)).size;
    }

    const score_trail = (grid, starts) => {
	const scores = starts.map(x => count_peaks(walk_trail(grid, x)));
	console.log(scores);
	return scores.reduce((a, b) => a + b, 0);
    }
    console.log("Score:", score_trail(grid, starts));
}
//solve(input);

function solve_attempt2(input) {
    const grid_from = text => text.split('\n').map(x => x.split(''));
    const grid = grid_from(input);

    const find_value_in_grid = (value, grid) => {
	return grid.map((r, ri) => {
	    return r.map((c, ci) => {
		if(c === value) return [ci, ri];
		else return false;
	    });
	});
    };
    const starts = find_value_in_grid('0', grid).flat().filter(Boolean);
    const ends = find_value_in_grid('9', grid).flat().filter(Boolean);
    const hash = (x, y) => `[${x},${y}]`;
    //console.log(starts);

    const dirs = [[-1,0],[0,-1],[1,0],[0,1]];
    let height = 1;
    let paths = starts.map(x => [x]);
    const add_pos_to = ([sx, sy]) => ([dx, dy]) => [sx+dx, sy+dy]
    const within_grid = (grid) => ([nx, ny]) => nx >= 0 && ny >= 0 && nx < grid[0].length && ny < grid.length
    const has_height = (grid, height) => ([nx, ny]) => parseInt(grid[ny][nx]) === height;
    const add_path = (path) => (n) => [...path, n];
    let new_paths = [];
    for(const p of paths) {
	const [sx, sy] = p[p.length-1];
	new_paths.push(...dirs.map(add_pos_to([sx, sy])).filter(within_grid(grid)).filter(has_height(grid, height)).map(add_path(p)));
    }
    for(let i=0; i<8; i++) {
	paths = new_paths;
	new_paths = [];
	height++;
	for(const p of paths) {
	    const [sx, sy] = p[p.length-1];
	    new_paths.push(...dirs.map(add_pos_to([sx, sy])).filter(within_grid(grid)).filter(has_height(grid, height)).map(add_path(p)));
	}
    }
    console.log("Part 1:", new Set(new_paths.map(p => `${p[0]}|${p[p.length-1]}`)).size);
    console.log("Part 2:", new_paths.map(p => `${p[0]}|${p[p.length-1]}`).length);
}
console.log("---- SAMPLE  ----");
solve_attempt2(sample);
console.log("----REAL DATA----");
solve_attempt2(input);

