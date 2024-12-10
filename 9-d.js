const sample = `2333133121414131402`;

const fs = require('fs');
const input = fs.readFileSync('./9.txt', 'utf-8').trim();

console.log("Part 1 (test):", solve(sample));
console.log("Part 1 (real):", solve(input));
console.log("Part 2 (test):", solve2(sample));
console.log("Part 2 (real):", solve2(input));

function solve(data) {
    const sizes = data.split('').map(x => parseInt(x));
    const disk = sizes.map((s, si) => {
	if(si%2 === 0) return Array(s).fill(si/2);
	else return Array(s).fill(null);
    }).flat();

    const last_file_index = disk => {
	let j = disk.length-1;
	while(disk[j] === null) j--;
	return j;
    }
    let i = disk.indexOf(null);
    let j = last_file_index(disk);
    while(i<j) {
	[disk[j], disk[i]] = [disk[i], disk[j]];
	i = disk.indexOf(null);
	j = last_file_index(disk);
    }

    const checksum = disk => {
	let total = 0;
	for(let i=0; i<disk.length; i++)  {
	    if(disk[i] === null) break;
	    total += i * disk[i];
	}
	return total;
    }
    return checksum(disk);
}

function solve2(data) {
    const sizes = data.split('').map(x => parseInt(x));
    let disk = sizes.map((s, si) => {
	if(si%2 === 0) return Array(s).fill(si/2);
	else return Array(s).fill(null);
    }).flat();

    const files = (disk) => {
	const files = []
	let j = disk.length - 1;
	while(j>=0) {
	    while(disk[j] === null) j--;
	    let f = disk[j];
	    let size = 0;
	    while(disk[j] === f) { j--; size++; }
	    files.push([f, j+1, size]);
	}
	return files;
    }
    const disk_files = files(disk);
    //console.log(disk_files);

    const spaces = (disk) => {
	const spaces = [];
	let i = disk.indexOf(null);
	let j = 1;
	while(i<disk.length) {
	    while(disk[i+j] === null) j++;
	    //console.log(i, j, ':', disk[i], disk[i+j-1]);
	    const sp = [i, j];
	    spaces.push(sp);
	    const k = disk.slice(i+j).indexOf(null);
	    if(k>=0) {
		i = i+j+k;
		j = 1;
	    } else break;
	}
	return spaces;
    }
    const disk_spaces = spaces(disk);
    //console.log(disk_spaces);

    for(const df of disk_files) {
	for(const ds of disk_spaces) {
	    if(ds[1] >= df[2] && ds[0] < df[1]) {
		for(let i=0; i<df[2]; i++) {
		    disk[ds[0]+i] = df[0];
		    disk[df[1]+i] = null;
		}
		ds[0] += df[2];
		ds[1] -= df[2];
		break;
	    }
	}
	//console.log(disk);
    }

    const checksum = disk => {
    	let total = 0;
    	for(let i=0; i<disk.length; i++)  {
    	    total += i * disk[i];
    	}
    	return total;
    }
    return checksum(disk);
}

function solve2_opt(data) {
    const sizes = data.split('').map(x => parseInt(x));
    let disk = sizes.map((s, si) => (si % 2 === 0 ? Array(s).fill(si / 2) : Array(s).fill(null))).flat();

    const extractSegments = (disk) => {
        const files = [];
        const spaces = [];
        let i = 0;

        while (i < disk.length) {
            if (disk[i] !== null) {
                let start = i;
                let value = disk[i];
                while (i < disk.length && disk[i] === value) i++;
                files.push({ value, start, size: i - start });
            } else {
                let start = i;
                while (i < disk.length && disk[i] === null) i++;
                spaces.push({ start, size: i - start });
            }
        }
        return { files, spaces };
    };

    const { files, spaces } = extractSegments(disk);

    for (const file of files) {
        let spaceIndex = spaces.findIndex(space => space.size >= file.size);
        if (spaceIndex !== -1) {
            const space = spaces[spaceIndex];
            for (let i = 0; i < file.size; i++) {
                disk[space.start + i] = file.value;
                disk[file.start + i] = null;
            }
            // Update space
            space.start += file.size;
            space.size -= file.size;
            if (space.size === 0) spaces.splice(spaceIndex, 1);
        }
    }

    const checksum = disk.reduce((total, value, index) => total + index * (value || 0), 0);
    return checksum;
}

