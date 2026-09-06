import { Transform } from '../../scene/Transform';
import { TPoint } from '../../types';
import { mod } from '../utils';

const CORNERS = [
  { x: -0.25, y: -0.5 },
  { x: +0.25, y: -0.5 },
  { x: +0.5, y: 0 },
  { x: +0.25, y: +0.5 },
  { x: -0.25, y: +0.5 },
  { x: -0.5, y: 0 },
];

/**
 * The function is called with the center of a hex and computes the corner.
 */
export const hexCorner = (transform: Transform, center: TPoint, i: number) => {
  const idx = mod(i, 6);

  const result: TPoint = {
    x: center.x + CORNERS[idx].x * transform.width,
    y: center.y + CORNERS[idx].y * transform.height,
  };
  return result;
};
