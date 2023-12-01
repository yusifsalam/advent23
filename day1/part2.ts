import { input } from "./input.ts";

const digits = new Map<string, string>([
  ["one", "1"],
  ["two", "2"],
  ["three", "3"],
  ["four", "4"],
  ["five", "5"],
  ["six", "6"],
  ["seven", "7"],
  ["eight", "8"],
  ["nine", "9"],
]);

const digitKeys = [...digits.keys()];

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
    const firstAsString = input.match(
      /(one|two|three|four|five|six|seven|eight|nine)|\d/
    )?.[0];
    const lastAsString = [
      ...input.matchAll(
        /(?=(one|two|three|four|five|six|seven|eight|nine|\d))/g
      ),
    ].pop()?.[1];

    if (!firstAsString || !lastAsString) throw new Error("invalid strings!");
    const firstDigit = digitKeys.includes(firstAsString)
      ? digits.get(firstAsString)!
      : firstAsString;
    const lastDigit = digitKeys.includes(lastAsString)
      ? digits.get(lastAsString)!
      : lastAsString;
    const finalDigit = parseInt(firstDigit + lastDigit);
    console.log(finalDigit);
    return finalDigit;
  } catch (err) {
    console.error(err);
    return -1;
  }
}

const res = main(input);
console.log("result", res);
