import { input } from "./input.ts";

function main(input: string): number {
  const lines = input.split("\n");
  let acc = 0;
  for (const line of lines) {
    const digit = getDigitFromLine(line);
    if (digit === -1) throw new Error(`no digits found on line:\n ${line}`);
    acc += digit;
  }
  return acc;
}

function getDigitFromLine(input: string): number {
  try {
    const firstDigit = input.match(/\d/)?.[0];
    const lastDigit = input.split("").reverse().join("").match(/\d/)?.[0];
    if (!firstDigit || !lastDigit) throw new Error("invalid strings!");
    const finalDigit = parseInt(firstDigit + lastDigit);
    return finalDigit;
  } catch (err) {
    console.error(err);
    return -1;
  }
}

const res = main(input);
console.log("result", res);
