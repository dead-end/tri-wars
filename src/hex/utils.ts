import { Point } from '../types';

export const hexGetId = (point: Point) => {
  return `${point.x},${point.y}`;
};
