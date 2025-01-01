import { Point } from '../types';
import { mod } from '../utils';

const HEX_NEIGHBOR: Point[] = [
  { x: 0, y: -1 },
  { x: 1, y: -1 },
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: -1, y: 1 },
  { x: -1, y: 0 },
];

export const hexNeighbor = (point: Point, i: number): Point => {
  const neighbor = HEX_NEIGHBOR[mod(i, 6)];
  return {
    x: point.x + neighbor.x,
    y: point.y + neighbor.y,
  };
};
