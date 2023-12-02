import { input } from "./input.ts";

type Color = "red" | "blue" | "green";

function main(input: string): number {
  const games = input.split("\n");
  let acc = 0;
  for (const game of games) {
    acc += calculatePower(game);
  }

  return acc;
}

function calculatePower(input: string): number {
  const parts = input.split(":");
  const balls = new Map<Color, number>([
    ["red", 0],
    ["blue", 0],
    ["green", 0],
  ]);
  const subgames = parts[1].split(";");
  for (const game of subgames) {
    const colors = game.split(",").map((s) => s.trim());
    for (const color of colors) {
      const p = color.split(" ");
      const number = parseInt(p[0]);
      const ball = p[1] as Color;
      if (balls.get(ball)! < number) {
        balls.set(ball, number);
      }
    }
  }
  const power = [...balls.values()].reduce((acc, cur) => acc * cur, 1);
  return power;
}

const res = main(input);
console.log("result:", res);
