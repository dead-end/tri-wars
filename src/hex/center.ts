import { TPoint } from '../types';
import { SQR_3 } from '../utils';

/**
 * The function computes the center of a hexagon, based on the coodinates of
 * the origin on the canvas.
 */
export const hexCenterGet = (origin: TPoint, hex: TPoint, size: number) => {
  const result: TPoint = {
    x: origin.x + hex.x * size * (3 / 2),
    y: origin.y + hex.y * size * SQR_3 + ((hex.x % 2) * size * SQR_3) / 2,
  };
  return result;
};
