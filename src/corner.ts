import { Point } from './types';
import { mod } from './utils';

const corners: Point[] = [];

/**
 * 0: -120 degree (top left)
 * 1: -60 degree (top right)
 * 2: 0 degree (right)
 * ...
 */
export const cornerInit = () => {
  for (let i = -2; i < 4; i++) {
    const degree = 60 * i;
    const rad = (Math.PI / 180) * degree;

    corners.push({
      x: Math.cos(rad),
      y: Math.sin(rad),
    });
  }
};

export const cornerGet = (center: Point, i: number, size: number): Point => {
  const idx = mod(i, 6);
  return {
    x: center.x + size * corners[idx].x,
    y: center.y + size * corners[idx].y,
  };
};
