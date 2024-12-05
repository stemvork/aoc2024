const day = 5;
const zeroPad = (num, places) => String(num).padStart(places, '0');

console.log(`Day ${zeroPad(day,2)} part 1: test case =`, solve1(sample()));
console.log(`Day ${zeroPad(day,2)} part 1: real case =`, solve1(input()));

console.log(`Day ${zeroPad(day,2)} part 2: test case =`, solve2(sample()));
console.log(`Day ${zeroPad(day,2)} part 2: real case =`, solve2(input()));

function get_rules(section) {
    const lines = section.split('\n');
    const rules = [];
    for(const l of lines) {
	const [a, b] = l.split('|').map(x => parseInt(x));
	const rule = (update) => {
	    const [ai, bi] = [update.indexOf(a), update.indexOf(b)];
	    if(ai < 0 || bi < 0) return true;
	    if(ai < bi) return true;
	    return false;
	};
	rules.push(rule);
    }
    return rules;
}

function get_updates(section) {
    const lines = section.split('\n');
    const updates = lines.map(line => line.split(',').map(x => parseInt(x)));
    return updates;
}

function is_ordered(update, rules) {
    return rules.every(rule => rule(update));
}

function solve1(data) {
    const sections = data.split('\n\n');
    const rules = get_rules(sections[0]);
    const updates = get_updates(sections[1]);

    let total = 0;
    for(const update of updates) {
	if(is_ordered(update, rules)) {
	    // console.log('ordered', update);
	    total += update[(update.length-1)/2];
	}
    }
    return total;
}

function get_befores(section) {
    const lines = section.split('\n');
    const befores = {};
    for(const l of lines) {
	const [a, b] = l.split('|').map(x => parseInt(x));
	if(befores[a] === undefined) {
	    befores[a] = [b];
	} else {
	    befores[a].push(b);
	}
    }
    return befores;
}

function sort_update(update, befores) {
    const sorted = [update[0]];
    for(const u of update.slice(1)) {
	//console.log(sorted, u , befores[u]);
	if(befores[u] === undefined) { 
	    sorted.push(u);
	} else if(sorted.every(x => befores[u].indexOf(x) < 0)) {
	    sorted.push(u);
	} else {
	    const is = befores[u]
		.map(x => sorted.indexOf(x))
		.filter(x => x >= 0);
	    const i = Math.min(...is);
	    //console.log('put', u, 'before', sorted[i], 'with index', i, 'because', is);
	    sorted.splice(i, 0, u);
	}
    }
    return sorted;
}

function solve2(data) {
    const sections = data.split('\n\n');
    const rules = get_rules(sections[0]);
    const befores = get_befores(sections[0]);
    const updates = get_updates(sections[1]);

    let total = 0;
    for(const update of updates) {
	if(is_ordered(update, rules)) {
	    //console.log('ordered', update);
	    //const middle = update[(update.length-1)/2];
	    //console.log('adding:', middle);
	    //total += middle;
	} else {
	    //console.log('sorting', update);
	    const sorted = sort_update(update, befores);
	    //console.log('sorted:', sorted);
	    const middle = sorted[(sorted.length-1)/2];
	    //console.log('adding:', middle);
	    total += middle;
	}
    }
    return total;
}

function sample() {
    return `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`;
}

function input() {
    return read_file("./5.txt");
}

function read_file(path) {
    const fs = require('fs');
    const data = fs.readFileSync(path, 'utf-8');
    return data.trim();
}
