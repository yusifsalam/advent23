import { input } from "./input.ts";

type RegexMatch = {
  value: number;
  indices: number[];
};

function range(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, index) => index + start);
}

function main(input: string): number {
  const rows = input.split("\n");
  const rowLength = rows[0].length;
  const cleanInput = input.replace(/\s|\n/g, "").trim();
  let acc = 0;
  const numbers: RegexMatch[] = [];
  const regex = /\b\d+\b/dg;
  let match;
  while ((match = regex.exec(cleanInput)) !== null) {
    numbers.push({ value: parseInt(match[0]), indices: match.indices[0] });
  }
  for (const num of numbers) {
    const rowNumber = Math.floor(num.indices[0] / rowLength);
    const startIndex = num.indices[0];
    const endIndex = num.indices[1] - 1;
    const startIndexWithinRow = startIndex % rowLength;
    const endIddexWithinRow = endIndex % rowLength;
    const neighborStart = startIndexWithinRow === 0 ? 0 : -1;
    const neighborEnd = endIddexWithinRow === rowLength - 1 ? 0 : 1;
    const neighborsAboveIndices =
      rowNumber === 0
        ? []
        : range(
            startIndex - rowLength + neighborStart,
            endIndex - rowLength + neighborEnd
          );
    const neighborsBelowIndices =
      rowNumber === rows.length - 1
        ? []
        : range(
            startIndex + neighborStart + rowLength,
            endIndex + neighborEnd + rowLength
          );
    const neighborsToSidesIndices = [
      startIndexWithinRow === 0 ? null : startIndex - 1,
      endIddexWithinRow === rowLength - 1 ? null : endIndex + 1,
    ].filter((n) => n !== null) as number[];
    const allNeighborIndices = neighborsAboveIndices
      .concat(neighborsToSidesIndices)
      .concat(neighborsBelowIndices);
    const allNeighbors = allNeighborIndices
      .map((i) => cleanInput[i])
      .filter((n) => n !== ".");
    if (allNeighbors.length !== 0) acc += num.value;
  }

  return acc;
}

const res = main(input);
console.log("result: ", res);
