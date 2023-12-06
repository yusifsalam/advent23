import { extractNumbers } from "../utils/extractNumbers.ts";
import { input } from "./input.ts";

function main(input: string): number {
  let acc = 1;
  const parts = input.replace(/[^\S\n]+/g, "").split("\n");
  const t = extractNumbers(parts[0])[0];
  const d = extractNumbers(parts[1])[0];

  const discriminant = Math.pow(t, 2) - 4 * d;
  const x1 = (t + Math.sqrt(discriminant)) / 2;
  const x2 = (t - Math.sqrt(discriminant)) / 2;
  const rangeStart = Math.floor(x2 + 1);
  const rangeEnd = Math.ceil(x1 - 1);
  const range = rangeEnd - rangeStart + 1;

  return range;
}

const res = main(input);
console.log("result: ", res);
