// const input = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
// Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
// Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
// Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
// Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
// Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`;

import { input } from "./input.ts";
const regex = /\b\d+\b/dg;

function main(input: string): number {
  const cards = input.split("\n");
  let acc = 0;
  for (const card of cards) {
    const parts = card.split("|");
    const winningNums = new Set(
      parts[0]
        .split(":")[1]
        .match(regex)
        ?.map((n) => parseInt(n))
    );
    const myNums = new Set(parts[1].match(regex)?.map((n) => parseInt(n)));
    const count = [...new Set([...winningNums].filter((n) => myNums.has(n)))]
      .length;
    const value = count === 0 ? 0 : Math.pow(2, count - 1);
    acc += value;
  }
  return acc;
}

const res = main(input);
console.log("result: ", res);
