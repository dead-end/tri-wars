import { TPoint } from '../types';
import { mod } from '../utils';

/**
 * 0: -120 degree (top left)
 * 1: -60 degree (top right)
 * 2: 0 degree (right)
 * ...
 */
const init = () => {
  const result: TPoint[] = [];
  for (let i = -2; i < 4; i++) {
    const degree = 60 * i;
    const rad = (Math.PI / 180) * degree;

    result.push({
      x: Math.cos(rad),
      y: Math.sin(rad),
    });
  }
  return result;
};

const corners: TPoint[] = init();

export const hexCornerGet = (
  center: TPoint,
  i: number,
  size: number
): TPoint => {
  const idx = mod(i, 6);
  return {
    x: center.x + size * corners[idx].x,
    y: center.y + size * corners[idx].y,
  };
};
