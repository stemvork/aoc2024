const day = 2;
const zeroPad = (num, places) => String(num).padStart(places, '0');

console.log(`Day ${zeroPad(day,2)} part 1: test case =`, solve1(sample()));
console.log(`Day ${zeroPad(day,2)} part 1: real case =`, solve1(input()));

console.log(`Day ${zeroPad(day,2)} part 2: test case =`, solve2(sample()));
console.log(`Day ${zeroPad(day,2)} part 2: real case =`, solve2(input()));

function solve1(data) {
    const lines = data.split('\n');
    let safe = 0;
    outer: for(const line of lines) {
	const levels = line.split(" ").map(x => parseInt(x));
	const delta = levels[1]-levels[0];
	if(Math.abs(delta) > 3 || delta === 0) continue outer;
	for(let i=2; i<levels.length; i++) {
	    const dd = levels[i] - levels[i-1];
	    if(dd === 0 || Math.abs(dd) > 3 || dd*delta < 0) continue outer;
	}
	// console.log('line', line, 'is safe');
	safe++;
    }
    return safe;
}

function validate(levels) {
    const d1 = levels[1] - levels[0];
    if(d1 === 0 || Math.abs(d1) > 3) { return false; }
    for(let i=2; i<levels.length; i++) {
	const d2 = levels[i] - levels[i-1];
	if(d2 === 0 || Math.abs(d2) > 3 || d1 * d2 < 0) { return false; }
    }
    return true;
}

function solve2(data) {
    const lines = data.split('\n');
    let safe = 0;
    outer: for(const line of lines) {
	const levels = line.split(" ").map(x => parseInt(x));
	if(validate(levels)) safe++;
	else {
	    for(let i=0; i<levels.length; i++) {
		if(validate(levels.slice(0, i).concat(levels.slice(i+1, levels.length)))) {
		    safe++;
		    continue outer;
		}
	    }
	}
    }
    return safe;
}

function sample() {
    return `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;
}

function input() {
    return `44 47 50 51 53 54 53
70 73 75 77 80 81 84 84
1 3 4 7 10 13 16 20
47 49 52 53 55 57 60 65
69 70 71 70 71
22 23 20 21 24 27 24
90 92 93 94 95 93 94 94
16 18 15 16 20
47 48 51 50 55
27 28 31 31 32 34
35 36 36 38 39 41 38
32 33 33 36 38 39 39
11 14 14 17 20 22 23 27
65 68 71 71 72 79
68 69 71 74 76 79 83 84
51 52 56 58 59 61 64 61
89 91 94 98 98
45 48 51 55 59
82 85 89 90 91 93 99
41 42 44 49 51
74 76 77 82 81
33 36 37 43 45 48 48
10 12 15 18 23 27
63 66 72 75 76 81
71 68 71 73 74 75
78 75 76 77 76
8 6 9 11 11
39 37 38 41 43 47
87 86 87 90 96
32 31 32 30 33 35
17 16 17 18 16 17 14
63 60 62 61 62 65 65
77 76 77 78 75 78 80 84
9 7 10 11 8 15
48 46 47 49 52 52 54
17 16 17 19 20 23 23 22
12 9 10 12 12 13 13
20 18 20 20 24
69 66 66 67 72
9 7 10 12 16 17 18
19 17 18 19 21 25 28 27
55 54 57 58 62 62
55 54 58 61 65
51 49 53 55 58 60 65
59 58 60 65 68
82 81 88 90 93 96 93
17 14 17 18 23 23
53 50 52 54 61 65
26 24 27 28 33 34 36 43
18 18 19 20 21 22
63 63 65 67 68 71 70
3 3 6 7 10 10
82 82 83 86 89 93
37 37 40 43 50
53 53 54 51 52 54 56
86 86 83 84 83
37 37 40 42 41 41
9 9 12 13 10 12 13 17
57 57 59 61 60 63 65 71
65 65 67 67 70 72
23 23 24 24 23
94 94 96 98 98 99 99
49 49 50 53 53 55 57 61
54 54 54 57 64
70 70 74 77 78
46 46 47 51 48
9 9 10 14 14
78 78 80 81 84 88 92
49 49 50 53 55 56 60 67
70 70 77 79 82 85 88
7 7 14 15 13
46 46 52 55 58 59 62 62
16 16 21 22 26
28 28 29 31 36 43
2 6 9 10 11 12
56 60 62 64 63
60 64 65 68 71 73 74 74
27 31 33 34 37 38 41 45
6 10 11 14 15 18 21 26
14 18 19 22 19 22 24
17 21 23 26 27 26 28 27
85 89 92 93 91 94 94
20 24 27 24 28
47 51 52 51 52 53 56 62
18 22 24 24 25 28
28 32 35 38 38 40 39
43 47 47 49 50 52 52
45 49 52 52 56
33 37 38 38 45
66 70 73 75 79 81 82 83
12 16 20 22 24 25 26 25
54 58 59 61 65 68 71 71
14 18 20 24 28
30 34 36 40 43 45 50
22 26 27 29 31 32 38 40
59 63 66 67 70 73 79 76
40 44 47 49 50 55 58 58
46 50 51 53 58 62
34 38 40 43 48 55
53 59 61 64 67 70
47 52 53 55 56 54
31 37 39 41 43 45 45
21 27 29 31 33 37
18 24 26 28 30 33 36 41
29 36 37 38 36 38
2 9 7 9 12 14 15 12
72 77 76 77 80 82 85 85
42 48 50 48 50 53 57
75 81 83 81 84 87 90 97
17 22 24 27 27 30 33 34
42 48 48 51 54 52
82 87 89 89 91 92 93 93
36 42 44 45 48 50 50 54
51 58 60 62 62 63 68
15 20 23 24 26 30 33
18 25 27 31 30
68 73 77 78 81 81
6 12 13 17 21
8 15 19 21 23 26 31
8 15 17 22 24 27
19 25 32 35 37 38 40 39
55 60 61 63 70 71 71
43 50 57 60 61 63 67
12 17 19 25 26 28 34
96 94 93 92 91 90 87 90
75 74 71 70 69 66 63 63
72 69 68 67 66 62
77 74 72 69 67 66 65 58
43 42 40 37 40 38 37 36
99 96 97 96 95 93 92 93
89 86 85 86 83 81 81
48 46 43 42 41 42 40 36
69 66 64 61 64 62 61 55
98 95 93 90 90 87 84 81
30 27 24 24 23 25
33 30 28 28 28
58 57 54 54 52 48
71 69 68 68 65 62 57
36 33 32 31 27 24
94 91 87 86 84 81 78 79
35 34 31 28 27 24 20 20
77 76 75 71 69 65
53 52 48 45 44 41 39 33
99 98 96 95 88 85 83 80
79 76 69 66 64 61 62
58 57 55 49 48 48
40 39 33 32 30 27 23
93 90 89 88 87 81 74
37 39 36 35 32 29 28
96 99 96 94 96
47 48 47 45 42 39 39
33 35 34 32 28
17 19 16 14 7
82 83 81 78 79 78 75 72
25 27 26 25 28 26 29
23 26 29 28 25 25
85 88 91 89 88 86 85 81
81 83 82 79 82 79 77 72
44 47 47 45 43
80 83 82 82 85
38 40 39 38 37 37 35 35
86 88 85 83 83 82 78
27 29 28 28 22
49 51 49 45 42
37 39 37 33 30 27 30
63 65 62 58 58
43 45 42 40 39 36 32 28
33 34 32 29 25 23 17
33 35 33 31 28 22 19
39 41 38 31 30 28 29
15 16 15 8 7 6 6
24 26 25 20 16
92 93 90 88 82 76
54 54 51 49 46 44 42 40
37 37 36 35 37
44 44 43 42 41 41
32 32 31 30 27 24 20
34 34 32 29 23
94 94 97 94 92 90
43 43 40 42 40 37 40
36 36 38 36 35 32 32
66 66 63 66 65 63 59
6 6 3 6 1
48 48 45 44 44 42 41 40
43 43 42 42 39 42
52 52 49 47 44 44 44
31 31 28 28 26 22
47 47 45 45 38
79 79 75 72 71 69
43 43 42 39 37 34 30 33
21 21 17 14 14
69 69 66 62 60 57 56 52
42 42 38 35 32 25
94 94 91 86 84
25 25 23 20 14 11 8 11
27 27 21 20 18 16 16
80 80 79 73 72 71 67
38 38 35 32 25 19
48 44 43 40 38 37 36 34
17 13 11 9 6 5 8
59 55 52 49 47 46 46
92 88 87 84 82 79 76 72
74 70 69 66 63 60 57 51
90 86 85 88 87
82 78 75 76 75 76
72 68 71 69 66 65 65
79 75 74 72 70 68 70 66
55 51 52 49 42
34 30 30 29 28 25 24
72 68 67 64 64 67
77 73 72 72 70 70
85 81 80 77 77 76 72
45 41 39 38 35 35 33 27
31 27 25 23 20 16 15
69 65 61 59 58 60
54 50 49 45 43 43
64 60 59 57 53 51 49 45
31 27 26 22 17
78 74 67 64 62 61 60
43 39 37 32 35
81 77 71 70 67 64 62 62
71 67 65 64 63 58 56 52
52 48 47 45 42 39 32 27
97 90 88 86 84 81 78 77
15 10 9 7 6 9
43 37 35 33 32 32
89 84 81 78 76 75 71
35 28 25 22 19 16 14 7
66 59 56 57 55 52 51 49
79 74 72 73 76
83 78 80 77 74 72 72
62 55 53 55 51
95 89 87 89 86 79
31 24 23 22 20 18 18 16
94 89 87 87 85 82 79 80
35 29 29 28 28
45 39 39 36 35 31
30 23 23 21 19 16 11
73 68 64 63 62 59 58 55
57 50 46 45 42 45
28 22 21 19 15 12 10 10
61 56 53 49 45
57 52 50 47 46 44 40 35
64 57 54 48 47 44 43
27 21 18 11 10 9 10
51 45 42 39 36 29 26 26
95 88 85 79 75
41 34 33 27 22
79 80 83 84 86 92 90
46 39 36 33 29 25
54 50 49 46 45 44 47
94 89 88 82 82
16 19 22 25 27 31 32 34
92 89 90 96 96
83 83 82 79 76 69 68
80 77 79 80 80 87
41 44 45 48 49 56 60
28 28 27 23 19
87 88 90 93 94 98 99 97
6 10 7 10 8
13 13 18 20 24
57 57 57 58 62
75 77 79 82 79 80 83
62 59 63 65 68 69 72
89 85 84 81 79 77 74 72
49 50 49 46 42 40 38 34
31 28 30 36 38
38 34 34 31 29 23
95 96 99 97 96 95 94 96
98 94 91 88 87 86 85 85
69 69 66 64 62 61 54
47 47 49 50 51 51 51
31 27 25 28 27 26 22
73 76 79 81 85
12 15 15 13 11 4
57 64 65 67 72 75 77
31 29 26 25 26
66 73 79 81 79
59 62 62 59 56 56
78 74 73 73 70 67 64
23 23 23 20 19 17 11
68 68 66 64 62 65 63 64
63 59 62 60 57 54 54
31 37 35 37 38 38
44 45 42 41 39 41
22 22 25 26 28
49 51 44 43 41 38 37 40
19 18 21 21 25
89 83 79 77 74 76
98 97 96 94 91 88 83
89 88 85 82 79 76 76 71
71 68 67 65 61 60 58
32 36 37 44 45 47 49 55
14 12 10 12 12
19 17 18 20 21 21 19
15 12 17 18 21 23 30
86 87 86 81 80
65 65 64 62 64 62 60 56
4 6 5 8 8
70 67 63 60 60
41 42 42 45 49
45 47 54 55 58 58
81 85 87 88 89 93
83 84 83 80 79 78 71 65
63 60 59 61 57
57 57 54 53 51 51 48
4 3 5 6 7 7
70 70 68 69 68
57 51 48 43 41
74 78 81 83 86 85
56 60 61 62 65 68
10 11 11 14 15 15
86 90 91 92 93 94 99 98
43 47 50 51 54 61
36 29 27 26 23 22 19 13
56 57 54 51 51 49 46 44
46 40 37 34 34 28
56 61 64 65 64 65 66 68
13 11 8 5 1
79 79 77 77 76 73 72 72
37 35 34 31 31 31
61 57 53 51 48 47
26 22 21 19 17 12
37 33 31 28 25 23 19
25 31 34 37 38 37 38 42
16 23 26 27 30 33 37 37
65 60 57 51 48 46 42
3 2 5 2 6
56 56 57 59 61 64 70
78 78 76 73 70 69 63 63
88 89 86 82 82
29 31 29 29 25
70 66 64 62 56 55 53
35 34 35 36 38 36
2 6 7 8 11 14 16 16
50 48 49 51 52 57 58 62
49 49 52 56 58 62
71 66 63 61 57
89 91 92 95 95 94
25 30 33 36 43
82 84 85 86 87 89 91 97
42 42 40 39 32 28
63 67 70 72 76 78 79 81
66 66 67 69 70 74
47 40 38 38 37 36 34 34
14 14 13 14 16 17 17
68 68 66 63 61 60 57 57
51 52 56 59 61 68
40 42 40 39 36 35 34 30
28 25 18 15 13 9
81 85 83 84 88
27 23 19 18 17 15 11
40 41 42 48 49
61 61 62 61 58 55 55
33 34 33 36 29
29 27 26 20 18 16
28 23 20 18 15 12 10 8
5 5 8 9 10 10 12 17
51 56 56 58 61 67
17 21 23 24 24 26 29 26
12 18 20 21 23 25 25
16 16 17 20 22 23 27 28
20 18 15 14 14 10
40 34 33 31 30 33 31 29
39 38 41 44 46 44 50
15 15 19 22 23 30
57 61 58 60 62 69
72 79 82 85 82
58 56 54 52 49 47 49 47
8 10 15 16 21
76 75 78 82 83 80
93 95 94 91 84 80
87 85 86 88 91 94 95 99
88 88 86 84 83 79
74 75 78 79 82 82
58 59 61 65 67 69 69
57 64 66 69 73
81 77 72 71 68 62
73 73 68 67 66 65 63 58
56 56 53 52 48 50
56 55 53 50 45 43 42 42
26 24 20 19 17 12
62 62 63 64 62 64 62
47 42 38 37 34 32 26
55 59 62 63 61 63 64
81 78 77 73 70 71
46 46 48 49 46 49 55
73 70 70 69 72
62 62 63 62 61 56
74 78 81 78 81 81
90 86 84 83 82 78 78
2 9 12 14 14 15 13
95 91 88 88 89
45 45 43 41 39 33 31 33
43 42 43 45 42 44 45 45
20 24 27 33 37
85 81 80 78 78 74
7 10 8 10 9
39 41 42 40 37 37
76 73 72 66 68
34 40 41 44 49 53
92 90 93 97 97
61 68 70 72 69 72 74 72
37 33 31 30 29 24 20
24 20 16 14 11 10 9 4
72 76 78 84 85 86 86
21 24 23 20 17 16 18 14
26 28 25 23 20 20
4 4 7 8 12 14 12
92 91 88 86 85 83 80
95 93 91 90 89
83 84 86 89 92 95
61 62 65 67 70
91 88 85 84 81
6 7 9 10 13
81 82 85 88 91 93 95
74 73 70 67 66 64
55 57 59 62 65
12 10 9 6 4 2
48 46 44 41 40 39
98 95 94 92 89
38 39 40 41 42 44 45
19 22 23 25 28 30 32 34
56 59 61 63 65 66 67
21 23 24 26 27 30
9 11 14 15 18
3 6 8 10 11
24 23 20 18 17 15 13
17 15 14 11 10 7 4 2
49 48 45 42 40 37 34 33
49 50 51 53 55
18 16 13 11 8 7 4
75 73 70 68 67 64 61 58
17 14 12 10 9 7
8 10 12 13 15 18 20 21
77 76 75 73 71 70 69
67 66 63 62 59 58
17 18 20 22 24
67 65 63 60 59
2 4 7 9 10 11 14
39 37 35 32 30
31 33 35 36 37 39
83 82 79 78 75 72 71 69
46 45 42 40 39 38 36 33
36 38 39 40 41
40 42 45 47 49
46 45 43 42 40 38 36 34
37 35 32 31 30 28
34 33 32 30 28 26 23
66 69 71 72 73 75 78
63 60 57 55 54 52 51
59 61 63 64 66
20 17 16 14 11 8
99 97 94 91 89 87 84 82
92 90 87 86 84 81 79 76
53 51 48 47 44 41 39 36
88 90 91 94 96 97
14 11 9 8 5
4 5 6 7 9 12 15
89 87 85 83 82 79 77 76
2 5 8 9 10 11 14 17
10 12 14 16 18 21
51 54 57 60 62 64 66 68
46 48 49 50 53
5 7 8 11 14 16 17 20
73 71 70 69 67 64 61 58
94 91 89 86 84 83 80
87 90 91 92 95 96 97
25 23 20 17 15 13
70 71 73 76 79 81 83
72 70 69 66 65 62 60
97 95 92 91 89 87
59 58 57 56 54
61 60 57 55 52 51
93 90 87 84 83
8 11 14 15 18 20
25 26 29 32 35
14 15 16 19 20 22 23 24
77 75 73 72 71
79 82 83 86 87 89 91 94
40 39 36 34 31 28 26
85 87 90 91 94 95
53 50 49 46 45 43 40 37
72 74 77 80 81 84 86
68 65 63 61 58 56 54
17 16 14 13 10
82 81 79 76 75 72 71 68
2 3 6 8 11 12 13
56 53 50 48 47
63 65 67 69 71 74 77
38 40 41 44 47
89 86 84 81 80 77 76
65 62 61 59 58
53 55 56 58 61 63 65
69 71 74 75 77 79 82
78 76 73 72 71 69 68 67
71 74 77 78 81 82 84 87
14 12 9 8 5 3
84 81 79 76 74 73 71 70
58 57 55 53 51 49 47
59 62 64 65 67 69
17 14 12 10 8 5 4
46 43 41 39 36 33 32
66 65 62 60 57
14 13 11 10 9 7
3 5 6 9 12 13 16
38 39 41 42 43 45 47 48
19 22 23 25 27 30
41 38 36 35 33 32 29 26
34 36 37 39 42
40 37 34 33 32
26 23 21 20 18 16
75 76 77 79 82
75 77 78 79 80 83
67 70 72 73 74 77 80 82
50 48 45 42 39
69 68 67 65 64 63 61
15 14 12 10 7
42 40 37 36 33
27 24 22 21 19 17 14
57 59 62 64 67 70
14 17 20 22 24 25 26
32 29 27 24 23 21 18 15
65 67 70 71 74
1 4 5 8 11
79 80 81 84 87 90 92 94
11 10 9 7 5 3 2
41 40 37 36 35 32 29 28
61 63 66 68 69 72 74
42 41 40 39 38 36 33 30
36 35 33 32 31 30 28
12 13 15 18 21 23
62 61 58 55 53 52
78 76 73 71 68 66
22 24 26 28 31 33
31 29 26 24 21 19
7 10 12 13 15 17
8 9 11 13 15 16
62 61 60 58 56
11 9 6 4 1
72 74 76 77 78 81 83
53 55 56 58 60 63 65 67
42 44 46 48 49 52
22 21 19 18 15 13 11 9
42 45 46 48 51 52
49 48 47 46 45 43
11 9 7 4 3
86 85 84 81 79 77 74
22 24 25 28 29 32 35 36
46 47 49 51 52 53
20 21 24 25 26 28
48 50 51 54 55 58
42 41 39 38 37
60 59 56 53 50 47 46 44
25 22 20 19 17 16 13
14 13 11 10 9 7 5 4
79 76 75 72 71 70 68
67 64 62 59 57 55 53 50
28 25 24 23 21 19
4 7 10 11 12 13 16
27 24 22 20 19
37 36 33 32 30 27
3 5 8 11 14 15
22 23 25 26 29 32 35 38
63 65 66 68 69 71
86 87 88 89 90 93 94 97
65 63 60 57 56
48 46 44 42 39
98 96 94 91 90 87 86 85
6 9 10 11 13
88 91 92 94 96 98
74 77 78 79 81 84
96 95 93 91 90 87
33 34 35 37 39
12 9 7 6 4
19 21 22 23 26 28
13 16 17 19 20 21 23
56 58 59 61 63 66 68 69
72 70 69 67 64 63 62 59
63 66 69 71 72
41 38 37 36 34 31
76 79 82 83 84 87 89 91
5 6 8 10 12 15 16
72 74 77 80 83 84 87 90
88 85 83 80 78 75 74 73
46 44 41 39 37 36 33 30
69 71 74 76 79 82
89 90 93 95 98
58 55 54 51 49 48 45
44 41 38 37 36 35 34
34 36 37 40 42
66 68 70 73 75 78
59 61 62 63 66 67 69 72
22 21 18 16 14 13 11 9
15 14 13 12 9
41 39 38 36 33 30 29 26
14 15 18 20 22
32 31 28 26 23 21
22 24 25 26 28 29 32
73 76 79 81 84 86 89 90
13 15 18 20 23 25 27 28
5 6 8 10 12 13
17 18 21 24 27
91 89 87 85 83 81 80
30 29 26 23 21 19
34 37 40 43 44 45 48
38 39 41 42 44 46 49 50
29 32 33 34 37 39 41
75 77 80 81 84 87 90 93
74 73 70 67 66
10 11 14 16 18 19 21
30 29 27 25 24 21
65 68 71 72 73 76 79
78 75 73 72 70 67 64
99 98 96 93 91
71 69 68 67 66 64 62 61
18 20 22 25 26 27 29
64 67 69 71 72 75 78
88 87 84 81 78 76 73
25 23 22 21 18
89 86 84 83 82 80 78
79 76 75 72 70 67 66 63
67 69 71 74 76 77
66 63 60 59 56 55
73 72 69 66 63 61 60
20 23 24 27 29 30
96 95 93 92 91
65 63 62 61 58
75 76 77 80 83
31 28 25 22 20 18 15 14
20 23 26 29 31 34 36
89 90 91 92 95 96 97
74 72 69 66 64 63 61
39 41 44 46 49
38 36 33 30 27 24 23 20
78 79 81 82 84 87
3 4 7 10 12 14
12 9 8 6 4 3
95 93 92 91 90 88 87
44 45 46 47 48
80 81 82 85 88
47 44 41 38 37
55 57 59 61 62 65 66
52 54 56 57 60
83 82 80 78 75
72 70 67 66 63 61 60 58
43 44 46 47 50 53 54
15 14 11 9 8 7
85 83 81 80 78
19 17 14 12 10 8 5 4
22 23 25 27 29 31 33
43 45 47 49 52 54 57 58
57 56 54 51 50 47
89 88 86 84 81 80 77
54 55 57 58 59 61 64
32 29 28 26 23 21 18
38 36 35 34 33
36 38 40 42 44 47
22 21 20 19 17 16 14 11
52 54 55 57 60 63 64
13 15 18 19 21 23 25
19 21 24 27 28 31
14 17 20 22 25
63 61 58 57 54 52
22 20 18 15 14 13 10 7
34 36 37 40 41
15 14 13 11 8 6 5 2
36 39 40 42 44 45 47
35 37 40 42 43 44 45
19 18 16 14 11 9
38 41 42 44 45 46
84 85 88 90 93 95 97
53 52 51 48 45
37 35 33 32 31 30 27 25
17 19 20 22 25 28
9 10 12 14 15
25 26 29 31 34 36 37 40
19 20 23 24 26
48 51 53 56 57 59 60
74 71 68 66 63 62 59 57
17 15 12 10 8 6 4
36 33 30 27 25 22 21 20
71 72 75 78 80
67 69 72 73 74 75 77
67 70 71 74 76
89 92 94 95 97
61 59 56 54 52 51 48
15 17 20 22 25
26 29 32 34 35 37 40
22 24 25 28 29 32
26 25 22 19 16 15 12
13 16 17 20 22 23
85 82 79 77 76 75 72
9 11 13 16 18 20 23
56 55 54 51 48
5 8 11 14 15 16
54 51 48 47 46 45
60 62 65 68 69 70 73
22 19 17 15 13
97 95 94 92 90 87 85 83
22 19 16 13 12 9
63 66 67 70 73 75
94 92 91 88 86 84 83 81
42 43 45 48 50 53 56 58
42 44 47 50 53
15 14 13 12 10
63 60 58 56 54 51 49 48
54 52 50 47 44 41
18 21 23 26 28 30 32
38 37 35 34 31 28 26 23
81 79 76 75 73 72 71 68
46 44 41 38 37
91 90 87 85 83
12 14 15 18 20
54 56 57 60 63 65
57 56 55 52 51 50
40 37 35 32 30 28
61 63 64 65 68
2 3 4 5 6 9 12
49 50 51 52 54
69 71 74 75 76 77
74 75 77 79 82 85
17 15 12 11 9
32 31 28 25 22 21
27 28 31 34 37
11 13 16 17 20 22 23 26
80 79 77 75 74 71
15 12 11 10 7 6
87 84 83 81 79
34 37 38 40 43 45 47
45 48 49 52 55 57
54 51 50 49 46 44 43
37 40 41 44 47 49 50
16 13 12 10 8 6 3
84 86 87 90 93 96 99
59 57 54 53 52 49 48
60 57 55 54 51 50 48
29 30 31 33 34 36
66 67 70 71 74 76 79 81
84 86 88 91 94 96
47 44 43 40 39
80 79 77 75 73 72 71 68
17 15 13 12 9
81 79 76 74 71 70 67
22 20 19 17 15
56 58 60 62 63 66 67
26 28 29 31 32 33 34
48 45 43 42 41 38 37
41 44 47 50 53 56
71 70 68 66 63
50 49 47 44 43 41 39
16 13 10 8 7 6 5 3
40 37 34 31 28 26 25 22
79 82 84 86 87 90 92 95
90 87 86 85 82 79 78 75
48 50 51 54 56
62 59 56 53 52
52 55 57 60 61
39 42 45 48 50 52
68 67 65 64 63 60
8 10 13 14 17 20 21 23
23 24 25 27 28 30 33 34
80 79 77 74 72 70 67 65
3 4 7 9 12 13 15 16
65 67 70 72 75
64 63 60 57 55 52
82 79 78 76 73 70 67 64
91 89 86 83 80 79 78 76
18 15 13 11 8 6 5 3
71 69 68 67 65 62 59
58 60 62 64 66 69
53 52 49 46 44 41 40 37
52 53 54 57 58 61 64 67
5 7 9 12 14 16 19
62 64 65 68 71 73 74 75
32 34 36 38 40
39 40 42 45 48 49 52 55
10 12 15 18 20 21 22
44 41 40 38 35 32 29
74 75 76 77 79
14 13 11 9 8 7
16 18 19 20 21 24
19 16 13 10 7 6
54 57 58 59 62 63 64
12 15 16 19 21 23 26 28
61 58 57 55 54
24 21 19 18 16
54 51 50 49 46
33 36 39 41 44
32 33 36 38 41 44 47
44 47 49 51 52
20 22 25 28 29 31 34
46 43 40 39 36 34 33 32
4 7 9 12 15
18 16 14 12 9 8 6
17 14 11 8 5
51 50 49 48 45
51 50 48 47 45 44 43
48 46 43 42 41
70 71 74 76 77 78
42 41 38 37 36 34
43 42 39 37 35 32 30 27
73 70 68 67 65 64 61 60
85 86 89 91 92 94
53 56 58 59 60 61 63 66
83 84 86 88 91 92
91 90 89 86 85 84 83
4 6 9 12 14 15 18
89 88 85 82 79 77
31 29 26 25 24
28 30 33 35 36 37 39 40
66 65 64 62 59
25 23 21 19 18 17
93 92 91 89 88 86 84 81
19 20 22 24 27 28 31 34
24 25 27 28 30
7 10 11 14 17 18 20
26 27 30 32 35
72 69 66 65 62 59 57
96 94 93 92 90
11 13 16 19 20 23 24 26
50 49 47 44 43 42 40 39
31 29 27 24 21 20 19 18
53 55 58 61 63 66 68
57 60 63 65 67
73 74 75 77 78 80
21 20 17 14 11 9 7
56 58 61 64 65 66 67
77 75 72 69 67 65 64
53 55 57 58 61
30 27 25 23 20 17
45 44 42 40 37 36 33
34 31 28 26 23 21 20 17
45 46 48 50 52
51 52 53 54 55 58
39 36 35 33 31
56 59 61 64 66 69 71 72
94 92 89 88 85 83
4 7 10 12 15 17 18 21
74 76 79 82 83 84
71 69 66 63 61 60 57
82 85 86 88 90 92 94 96
69 71 73 74 75
35 38 40 41 44 46 49
78 80 81 82 84 85 87 88
29 32 34 35 38
26 24 21 19 17 16 13 11
39 41 43 45 48
58 60 61 62 63 64 67 68
61 64 66 67 70 73
85 84 83 81 80
66 63 62 61 59 57 55
38 41 42 43 46 49
47 44 41 40 38 35 32 30
41 39 38 37 36
85 88 91 93 95
7 10 11 13 16 19 22
51 50 48 47 44 43 40
47 46 43 41 39 38 36
93 92 91 89 87 85 83 82
83 80 79 77 74 73 70
46 44 41 39 37 36 33 32
29 32 33 35 38
21 18 16 15 12 9 8
25 27 29 31 33
51 53 56 58 59 62 64
57 58 61 63 65 67
49 48 47 45 44 41
42 44 47 48 49
69 68 66 63 61 60
27 24 22 21 20
81 78 77 74 71 70 67 64
41 44 46 49 50
13 11 9 6 5 3
53 52 50 48 47 44 43 42
48 45 42 41 38 36 34
62 59 58 57 56 55
51 50 47 44 42 39 36
3 4 7 10 13 16
16 19 20 22 25
93 91 90 87 85
87 86 83 80 77
84 82 80 79 78 76 75 73
25 27 28 29 31 32 35 38
82 81 78 75 74 72 70
84 85 86 89 90
80 81 82 85 87 89
1 2 5 8 10
74 76 78 81 82 83 84 86
52 54 55 56 57 58
17 20 22 24 26 28 30 31
73 72 69 68 65 62
65 62 60 59 56 55
54 52 50 48 46
44 43 42 40 39
67 68 70 73 74 77 79 81
91 90 88 86 83 82 81 80
36 38 39 40 43 45 47 49
29 28 25 24 23 20
39 40 43 46 47 49
83 81 79 76 74 73
45 43 42 41 40 37
38 41 42 44 45 47 48
34 35 38 41 42 43 44 45
62 59 56 55 52 49 48
11 13 16 17 20 21
49 46 45 43 41 40 38
54 52 51 49 46 44
96 94 92 89 88 86 84
41 38 36 33 31 28 25
21 22 25 26 29 30 31
27 28 29 32 35 37 39 41
55 58 60 63 66 68 69 71
18 15 14 12 11 10
77 75 74 71 70
23 25 28 30 31 32
14 15 17 20 23 25 28
46 48 50 51 53 55
72 71 70 69 68
60 57 56 54 53 51
93 92 89 86 83
66 63 62 61 60 59 58
28 31 34 37 38
78 79 82 84 85 88 90 92
60 62 65 67 70 71
57 60 62 65 67 70 72
5 8 11 14 15
63 65 67 69 71 74 75 77
79 77 74 72 70
55 58 60 62 65
28 30 32 34 37
19 21 24 25 27
67 65 62 59 58 56
94 93 91 89 86 83 81 79
42 41 40 39 37
16 19 21 23 26
67 64 62 59 56
66 64 61 59 56 54 53 51
62 63 64 67 68
87 84 81 79 76 74 71 68
7 8 11 14 15
37 39 42 43 45
21 24 26 28 31 33 36 39
48 50 53 56 59 61 64 65
63 64 65 66 69 70
58 60 63 64 65
5 6 7 10 11 14 17 19
51 48 47 46 44
25 28 30 32 35 37 39
32 31 28 26 25
91 89 88 85 83
91 90 87 85 84 83
39 38 35 34 31 29
50 51 53 54 56
59 60 63 65 66
25 27 28 30 31
57 54 53 51 50
50 53 56 57 60 62 65 68
63 61 60 58 55 52 50
60 62 64 65 66 68 69
43 45 48 49 51 52 55
65 66 68 71 74 77
24 25 26 28 29 30 32 35
89 90 92 95 97
83 84 86 88 89 92 94
31 32 34 35 37 40 42 43
73 76 78 79 81
63 64 67 68 70 73 75 78
86 84 81 78 77 75
43 42 40 38 35
62 64 65 68 71
68 70 72 75 78 80 83
77 80 82 85 88 90 91 94
11 9 8 7 6
79 80 83 84 87
44 45 46 47 50 52 55 56
32 34 35 37 38 40 43
57 54 51 49 46 45 44 42
41 39 38 37 34 31 29 26
81 82 83 85 88 90 91 93
62 64 66 69 72 73 76
27 28 30 31 32 33 34 36
25 27 30 31 33 36
99 96 93 92 90
34 33 30 27 25 23 22 21
27 24 23 20 18 15 13
91 90 88 87 84
62 59 56 55 52 49 47
19 17 16 15 14 13
95 92 90 87 84 82 79 76
12 11 9 8 6 3
15 18 20 22 25 26 27 29
51 49 47 46 43 40
62 65 67 68 71
67 68 71 74 77 79 82 84
47 45 42 39 37 35 32 31
51 48 47 46 44 42 41 39
45 46 49 50 51 52
86 89 90 92 93
66 67 68 71 72 75`;
}
