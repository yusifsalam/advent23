import { input } from "./input.ts";

const count = new Map<string, number>([
  ["red", 12],
  ["green", 13],
  ["blue", 14],
]);

function main(input: string): number {
  const games = input.split("\n");
  let acc = 0;
  for (const game of games) {
    acc += parseGame(game);
  }

  return acc;
}

function parseGame(input: string): number {
  const parts = input.split(":");
  const id = parseInt(parts[0].substring(4));
  const subgames = parts[1].split(";");
  let isPossible = true;
  for (const game of subgames) {
    const colors = game.split(",").map((s) => s.trim());
    for (const color of colors) {
      const p = color.split(" ");
      const number = parseInt(p[0]);
      const ball = p[1];
      const isValid = number <= count.get(ball)!;
      isPossible = isValid && isPossible;
    }
  }
  if (isPossible) return id;
  return 0;
}

const res = main(input);
console.log("result:", res);
