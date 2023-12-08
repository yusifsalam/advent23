// const input = `LLR

// AAA = (BBB, BBB)
// BBB = (AAA, ZZZ)
// ZZZ = (ZZZ, ZZZ)`;
import { input } from "./input.ts";

type INode = {
  value: string;
  left: string;
  right: string;
};

function main(input: string): number {
  let current = "AAA";
  const end = "ZZZ";
  let steps = 0;
  const parts = input.split("\n");
  const directions = parts[0];
  let nextDirectionIndex = 0;
  const nodes: INode[] = parts.slice(2).map((row) => ({
    value: row.slice(0, 3),
    left: row.slice(7, 10),
    right: row.slice(12, 15),
  }));
  const nodeMap = new Map<string, INode>(nodes.map((n) => [n.value, n]));
  while (current !== end) {
    if (nextDirectionIndex > directions.length - 1) {
      nextDirectionIndex = 0;
    }
    const nextDirection = directions[nextDirectionIndex];
    current =
      nextDirection === "L"
        ? nodeMap.get(current)!.left
        : nodeMap.get(current)!.right;
    steps += 1;
    nextDirectionIndex += 1;
  }

  return steps;
}

const res = main(input);
console.log("result: ", res);
