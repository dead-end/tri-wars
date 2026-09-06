/**
 * Compute a modulo value that is positive.
 */
export const mod = (n: number, m: number) => ((n % m) + m) % m;
