// mulberry32 — seeded PRNG for deterministic session ordering
// Returns a function that produces floats in [0, 1) for the given seed

export function mulberry32(seed: number): () => number {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Derive numeric seed from UUID string
export function seedFromSessionId(sessionId: string): number {
  return parseInt(sessionId.replace(/-/g, '').slice(0, 8), 16);
}

// Fisher-Yates shuffle using seeded PRNG
export function seededShuffle<T>(array: T[], prng: () => number): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(prng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
