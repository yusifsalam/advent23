import { input } from "./input.ts";

function main(input: string) {
  const parts = input.split(",");
  const sum = parts.map((p) => hash(p)).reduce((p, c) => p + c, 0);
  return sum;
}

function hash(s: string): number {
  const value = s
    .split("")
    .reduce((prev, cur) => ((prev + cur.charCodeAt(0)) * 17) % 256, 0);
  return value;
}

const res = main(input);
console.log("result:", res);
