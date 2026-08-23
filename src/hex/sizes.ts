import { THexSizes } from '../types';

/**
 * size: The outer radius of the hex.
 *
 * vSpace: The distance between the centers of two vertical hexagons, which
 * means two hexagon on top of each other.
 *
 * hSpace: The distance between the centers of two horizontal hexagons. The
 * hexagons have an offset to the top or the bottom.
 *
 * width: The size from the left corner to the right corner.
 *
 * height: The size from the top to the bottom edge of the hex. This is also
 * the inner radius.
 */
export const hexSizesUpdate = (size: number) => {
  const result: THexSizes = {
    size,
    vSpace: Math.sqrt(3) * size,
    hSpace: (3 / 2) * size,
    width: 2 * size,
    height: Math.sqrt(3) * size,
  };

  console.log('sizes', JSON.stringify(result));

  return result;
};
