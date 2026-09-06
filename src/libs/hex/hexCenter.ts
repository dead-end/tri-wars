import { Transform } from '../../scene/Transform';
import { TPoint } from '../../types';

/**
 * The function computes the center of a hexagon on the board, based on the
 * coordinates of the origin on the canvas.
 */
export const hexCenter = (
  transform: Transform,
  hex: TPoint,
  offset: boolean,
) => {
  const origin = offset ? transform.getOriginOffset() : transform.origin;

  const result: TPoint = {
    x: origin.x + hex.x * transform.hSpace,
    y:
      origin.y +
      hex.y * transform.vSpace +
      ((hex.x % 2) * transform.vSpace) / 2,
  };
  return result;
};
