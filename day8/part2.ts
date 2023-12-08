// const input = `LR

// 11A = (11B, XXX)
// 11B = (XXX, 11Z)
// 11Z = (11B, XXX)
// 22A = (22B, XXX)
// 22B = (22C, 22C)
// 22C = (22Z, 22Z)
// 22Z = (22B, 22B)
// XXX = (XXX, XXX)`;
import { input } from "./input.ts";

type INode = {
  value: string;
  left: string;
  right: string;
};

function main(input: string): number {
  const parts = input.split("\n");
  const directions = parts[0];

  const nodes: INode[] = parts.slice(2).map((row) => ({
    value: row.slice(0, 3),
    left: row.slice(7, 10),
    right: row.slice(12, 15),
  }));
  const nodeMap = new Map<string, INode>(nodes.map((n) => [n.value, n]));

  let currentNodes: string[] = nodes
    .filter((n) => n.value.charAt(2) === "A")
    .map((n) => n.value);
  let finished = false;

  const steps = currentNodes.map((n) => {
    let current = n;
    let step = 0;
    let nextDirectionIndex = 0;
    while (current.charAt(2) !== "Z") {
      if (nextDirectionIndex > directions.length - 1) {
        nextDirectionIndex = 0;
      }
      const nextDirection = directions[nextDirectionIndex];
      current =
        nextDirection === "L"
          ? nodeMap.get(current)!.left
          : nodeMap.get(current)!.right;
      step += 1;
      nextDirectionIndex += 1;
    }
    return step;
  });
  return calculateLCM(steps);
}

function calculateLCM(arr: number[]): number {
  let lcm = arr[0];

  for (let i = 1; i < arr.length; i++) {
    lcm = calculateLCMForTwo(lcm, arr[i]);
  }

  return lcm;
}

function calculateLCMForTwo(num1: number, num2: number): number {
  const maxNum = Math.max(num1, num2);
  let lcm = maxNum;

  while (true) {
    if (lcm % num1 === 0 && lcm % num2 === 0) {
      break;
    }
    lcm += maxNum;
  }

  return lcm;
}

const res = main(input);
console.log("result: ", res);
