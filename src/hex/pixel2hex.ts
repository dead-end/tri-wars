import { TPoint } from '../types';
import { SQR_3 } from '../utils';

/**
 * Cube coordinates of a hex point.
 */
type TCube = {
  q: number;
  r: number;
  s: number;
};

/**
 * axial coordinates to offset coordinates
 */
const axial2Off = (hex: TPoint): TPoint => {
  return {
    x: hex.x,
    y: hex.y + (hex.x - (hex.x % 2)) / 2,
  };
};

/**
 * cube coordinates to axial coordinates
 */
const cube2Axial = (cube: TCube): TPoint => {
  return {
    x: cube.q,
    y: cube.r,
  };
};

/**
 * axial coordinates to cube coordinates
 */
const axial2Cube = (axial: TPoint): TCube => {
  return {
    q: axial.x,
    r: axial.y,
    s: -axial.x - axial.y,
  };
};

/**
 * Round cube coordinates to the next
 */
const cubeRound = (frac: TCube): TCube => {
  let q = Math.round(frac.q);
  let r = Math.round(frac.r);
  let s = Math.round(frac.s);

  let q_diff = Math.abs(q - frac.q);
  let r_diff = Math.abs(r - frac.r);
  let s_diff = Math.abs(s - frac.s);

  if (q_diff > r_diff && q_diff > s_diff) {
    q = -r - s;
  } else if (r_diff > s_diff) {
    r = -q - s;
  } else {
    s = -q - r;
  }

  return { q, r, s };
};

const axialRound = (axial: TPoint) => {
  return cube2Axial(cubeRound(axial2Cube(axial)));
};

/**
 * The functiom computes for a given point on the canvas, which hex it is
 * pointing to. The origin is the center of the (0, 0) hexagon and size is
 * the size of the hexagon.
 *
 * See: https://www.redblobgames.com/grids/hexagons/
 */
export const pixel2Hex = (point: TPoint, size: number, origin: TPoint) => {
  point.x -= origin.x;
  point.y -= origin.y;

  const axialFrac: TPoint = {
    x: ((2 / 3) * point.x) / size,
    y: ((-1 / 3) * point.x + (SQR_3 / 3) * point.y) / size,
  };

  return axial2Off(axialRound(axialFrac));
};
