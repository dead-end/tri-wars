import { THexSizes, TPoint } from '../types';

/**
 * All hex fields a computed relative to the center of the top left hex field.
 * The origin it the position of the center top left hex field.
 *
 * The origin is computed, in a way that the top edge and the left corner are
 * on the x- and y-axis.
 *
 * The origin depends on the hex size and it is not just the size.
 */
export const hexOriginGet = (hexSizes: THexSizes) => {
  const result: TPoint = {
    x: hexSizes.width / 2,
    y: hexSizes.height / 2,
  };
  return result;
};

/**
 * The function computes the center of a hexagon on the board, based on the
 * coordinates of the origin on the canvas.
 */
export const hexCenterGet = (
  origin: TPoint,
  hex: TPoint,
  hexSizes: THexSizes,
) => {
  const result: TPoint = {
    x: origin.x + hex.x * hexSizes.hSpace,
    y: origin.y + hex.y * hexSizes.vSpace + ((hex.x % 2) * hexSizes.vSpace) / 2,
  };
  return result;
};
