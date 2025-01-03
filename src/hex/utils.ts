import { TPoint } from '../types';

export const hexGetId = (point: TPoint) => {
  return `${point.x},${point.y}`;
};
