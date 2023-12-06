import { extractNumbers } from "../utils/extractNumbers.ts";
import { input } from "./input.ts";

// const input = `Time:      7  15   30
// Distance:  9  40  200`;

function main(input: string): number {
  let acc = 1;
  const parts = input.split("\n");
  const times = extractNumbers(parts[0]);
  const distances = extractNumbers(parts[1]);
  times.map((t, i) => {
    const d = distances[i];
    const discriminant = Math.pow(t, 2) - 4 * d;
    const x1 = (t + Math.sqrt(discriminant)) / 2;
    const x2 = (t - Math.sqrt(discriminant)) / 2;
    const rangeStart = Math.floor(x2 + 1);
    const rangeEnd = Math.ceil(x1 - 1);
    const range = rangeEnd - rangeStart + 1;
    acc *= range;
  });

  return acc;
}

const res = main(input);
console.log("result: ", res);
