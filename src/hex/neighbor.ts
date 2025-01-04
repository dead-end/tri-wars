import { TPoint } from '../types';
import { mod } from '../utils';

// odd-q
const NEIGHBOR_EVEN: TPoint[] = [
  { x: +0, y: -1 },
  { x: +1, y: -1 },
  { x: +1, y: +0 },
  { x: +0, y: +1 },
  { x: -1, y: +0 },
  { x: -1, y: -1 },
];

const NEIGHBOR_ODD: TPoint[] = [
  { x: +0, y: -1 },
  { x: +1, y: +0 },
  { x: +1, y: +1 },
  { x: +0, y: +1 },
  { x: -1, y: +1 },
  { x: -1, y: -0 },
];

const HEX_NEIGHBOR: TPoint[][] = [NEIGHBOR_EVEN, NEIGHBOR_ODD];

/**
 * The function returns the neibhbor of a hexagon in a given direction.
 */
export const hexNeighbor = (hex: TPoint, i: number) => {
  const neighbor = HEX_NEIGHBOR[mod(hex.x, 2)][mod(i, 6)];
  const result: TPoint = {
    x: hex.x + neighbor.x,
    y: hex.y + neighbor.y,
  };
  return result;
};
