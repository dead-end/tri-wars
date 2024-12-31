import { Point } from './types';
import { mod } from './utils';

const SQR_3 = Math.sqrt(3);

const HEX_NEIGHBOR: Point[] = [
  { x: 0, y: -1 },
  { x: 1, y: -1 },
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: -1, y: 1 },
  { x: -1, y: 0 },
];

export const hexGetId = (point: Point) => {
  return `${point.x},${point.y}`;
};

export const hexGetNeighbor = (point: Point, i: number): Point => {
  const neighbor = HEX_NEIGHBOR[mod(i, 6)];
  return {
    x: point.x + neighbor.x,
    y: point.y + neighbor.y,
  };
};

export const hexGetCenter = (
  center: Point,
  hex: Point,
  size: number
): Point => {
  return {
    x: center.x + hex.x * size * (3 / 2),
    y: center.y + hex.y * size * SQR_3 + (hex.x * size * SQR_3) / 2,
  };
};

export const hexGetCricle = (radius: number) => {
  const results: Point[] = [];

  let hex: Point = {
    x: -1 * radius,
    y: radius,
  };

  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < radius; j++) {
      results.push(hex);
      hex = hexGetNeighbor(hex, i);
    }
  }

  return results;
};
