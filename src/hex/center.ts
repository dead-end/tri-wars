import { THexSizes, TPoint } from '../types';

/**
 * The function computes the center of a hexagon, based on the coodinates of
 * the origin on the canvas.
 */
export const hexCenterGet = (
  origin: TPoint,
  hex: TPoint,
  hexSizes: THexSizes
) => {
  const result: TPoint = {
    x: origin.x + hex.x * hexSizes.hSpace,
    y: origin.y + hex.y * hexSizes.vSpace + ((hex.x % 2) * hexSizes.vSpace) / 2,
  };
  return result;
};

/**
 * The origin depends on the hex size and it is not just the size.
 */
export const hexGetOrigin = (hexSizes: THexSizes) => {
  const result: TPoint = {
    x: hexSizes.width / 2,
    y: hexSizes.height / 2,
  };
  return result;
};
