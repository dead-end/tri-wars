import { TPoint } from '../types';
import { SQR_3 } from '../utils';

// TODO: not used and only corret for cube coords
export const hexCenterGet = (
  origin: TPoint,
  hex: TPoint,
  size: number
): TPoint => {
  return {
    x: origin.x + hex.x * size * (3 / 2),
    y: origin.y + hex.y * size * SQR_3 + ((hex.x % 2) * size * SQR_3) / 2,
  };
};
