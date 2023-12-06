export function extractNumbers(s: string): number[] {
  return s.match(/\b\d+\b/dg)?.map((n) => parseInt(n)) ?? [];
}
