// const input = `32T3K 765
// T55J5 684
// KK677 28
// KTJJT 220
// QQQJA 483`;

import { input } from "./input.ts";

const deck = [
  "A",
  "K",
  "Q",
  "J",
  "T",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
] as const;

type Card = (typeof deck)[number];

type Hand = {
  hand: string;
  bid: number;
  charMap: [
    "A" | "K" | "Q" | "J" | "T" | "9" | "8" | "7" | "6" | "5" | "4" | "3" | "2",
    number
  ][];
};

function main(input: string): number {
  const handsWithBids = input.split("\n");
  const winnings = handsWithBids
    .map((h) => {
      const parts = h.split(" ");
      const hand = parts[0];
      const bid = parseInt(parts[1]);
      const charsRanked = [...characterOccurrence(hand)].sort(
        (a, b) => b[1] - a[1]
      );
      return { hand, bid, charMap: charsRanked };
    })
    .sort(compareHands)
    .map((h, i) => ({
      hand: h,
      rank: handsWithBids.length - i,
      total: h.bid * (handsWithBids.length - i),
    }))
    .reduce((acc, h) => (acc += h.total), 0);

  return winnings;
}

function compareHands(a: Hand, b: Hand): number {
  let i = 0;
  while (i < a.charMap.length) {
    if (a.charMap[i][1] > b.charMap[i][1]) return -1;
    else if (a.charMap[i][1] < b.charMap[i][1]) return 1;
    else i++;
  }
  return compareRawHand(a.hand, b.hand);
}

function compareRawHand(a: string, b: string): number {
  const aChar = a.split("");
  const bChar = b.split("");
  let i = 0;
  while (i < aChar.length) {
    if (deck.indexOf(aChar[i] as Card) < deck.indexOf(bChar[i] as Card))
      return -1;
    else if (deck.indexOf(aChar[i] as Card) > deck.indexOf(bChar[i] as Card))
      return 1;
    else i++;
  }
  return 0;
}

function characterOccurrence(input: string) {
  const charMap = new Map<Card, number>([]);

  input.split("").forEach((c) => {
    const charInMap = charMap.get(c as Card);
    charMap.set(c as Card, charInMap ? charInMap + 1 : 1);
  });
  return charMap;
}

const res = main(input);
console.log("result: ", res);
