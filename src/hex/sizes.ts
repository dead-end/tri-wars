import { THexSizes } from '../types';

export const hexSizesUpdate = (size: number) => {
  const result: THexSizes = {
    size,
    vSpace: Math.sqrt(3) * size,
    hSpace: (3 / 2) * size,
    width: 2 * size,
    height: Math.sqrt(3) * size,
  };

  return result;
};
