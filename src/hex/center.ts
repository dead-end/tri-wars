import { Point } from '../types';
import { SQR_3 } from '../utils';

// TODO: not used and only corret for cube coords
export const hexCenterGet = (
  origin: Point,
  hex: Point,
  size: number
): Point => {
  return {
    x: origin.x + hex.x * size * (3 / 2),
    y: origin.y + hex.y * size * SQR_3 + ((hex.x % 2) * size * SQR_3) / 2,
  };
};
