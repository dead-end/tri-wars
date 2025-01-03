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

export const hexNeighbor = (point: TPoint, i: number): TPoint => {
  const neighbor = HEX_NEIGHBOR[mod(point.x, 2)][mod(i, 6)];
  return {
    x: point.x + neighbor.x,
    y: point.y + neighbor.y,
  };
};
