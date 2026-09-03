import { Transform } from '../scene/Transform';
import { TPoint } from '../types';
import { mod } from '../utils';

let corners: TPoint[];

/**
 * The corners of a hex with the center of the hex in (0, 0) depend only on
 * the width and height of the hex. This can be precomputed when the size
 * changes.
 */
export const hexCornerUpdate = (transform: Transform) => {
  const result: TPoint[] = [];

  result.push(
    {
      x: -transform.width / 4,
      y: -transform.height / 2,
    },
    {
      x: +transform.width / 4,
      y: -transform.height / 2,
    },
    {
      x: +transform.width / 2,
      y: 0,
    },
    {
      x: +transform.width / 4,
      y: +transform.height / 2,
    },
    {
      x: -transform.width / 4,
      y: +transform.height / 2,
    },
    {
      x: -transform.width / 2,
      y: 0,
    },
  );

  corners = result;
};

/**
 * The function is called with the center of a hex and we only have to add the
 * precomputed corner offset.
 */
export const hexCornerGet = (center: TPoint, i: number) => {
  const idx = mod(i, 6);
  const result: TPoint = {
    x: center.x + corners[idx].x,
    y: center.y + corners[idx].y,
  };
  return result;
};
