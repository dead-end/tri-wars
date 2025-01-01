import { Point } from '../types';
import { mod } from '../utils';

// odd-q
const NEIGHBOR_EVEN: Point[] = [
  { x: +0, y: -1 },
  { x: +1, y: -1 },
  { x: +1, y: +0 },
  { x: +0, y: +1 },
  { x: -1, y: +0 },
  { x: -1, y: -1 },
];

const NEIGHBOR_ODD: Point[] = [
  { x: +0, y: -1 },
  { x: +1, y: +0 },
  { x: +1, y: +1 },
  { x: +0, y: +1 },
  { x: -1, y: +1 },
  { x: -1, y: -0 },
];

const HEX_NEIGHBOR: Point[][] = [NEIGHBOR_EVEN, NEIGHBOR_ODD];

export const hexNeighbor = (point: Point, i: number): Point => {
  const neighbor = HEX_NEIGHBOR[mod(point.x, 2)][mod(i, 6)];
  return {
    x: point.x + neighbor.x,
    y: point.y + neighbor.y,
  };
};
