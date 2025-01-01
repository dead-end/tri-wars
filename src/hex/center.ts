import { Point } from '../types';

const SQR_3 = Math.sqrt(3);

// TODO: not used and only corret for cube coords
export const hexCenter = (origin: Point, hex: Point, size: number): Point => {
  return {
    x: origin.x + hex.x * size * (3 / 2),
    y: origin.y + hex.y * size * SQR_3 + (hex.x * size * SQR_3) / 2,
  };
};
