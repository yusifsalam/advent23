import { input as input2 } from "./input.ts";

const input = `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`;

function main(input: string): number {
  const parts = input.trim().split(":");
  const seeds = extractNumbers(parts[1]);
  const maps = parts.slice(2);
  const parsedMaps = maps.map((_m, i) =>
    parseSourceDestinations(extractNumbers(parts[i + 2]))
  );
  const locations = seeds.map((s) => {
    let i = 0;
    let mapResult = getTargetNumber(s, parsedMaps[i]);
    while (i < 6) {
      mapResult = getTargetNumber(mapResult, parsedMaps[++i]);
    }
    return mapResult;
  });

  return Math.min(...locations);
}

function extractNumbers(s: string): number[] {
  return s.match(/\b\d+\b/dg)?.map((n) => parseInt(n)) ?? [];
}

function parseSourceDestinations(array: number[]): number[][] {
  return Array.from({ length: Math.ceil(array.length / 3) }, (_, index) =>
    array.slice(index * 3, index * 3 + 3)
  );
}

function getTargetNumber(n: number, array: number[][]): number {
  for (const arr of array) {
    if (n >= arr[1] && n < arr[1] + arr[2]) {
      return n + arr[0] - arr[1];
    }
  }

  return n;
}

const res = main(input2);
console.log("result: ", res);
