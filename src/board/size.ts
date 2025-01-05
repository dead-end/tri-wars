import { THexSizes, TPoint } from '../types';

export const boardSizeGet = (hexNum: TPoint, hexSizes: THexSizes) => {
  const x = 2 * hexSizes.size + (hexNum.x - 1) * hexSizes.hSpace;
  const y = hexNum.y * hexSizes.vSpace + hexSizes.vSpace / 2;

  const result: TPoint = {
    x: Math.ceil(x),
    y: Math.ceil(y),
  };
  return result;
};
