import { TSizes, TPoint } from '../types';
import { mod } from '../utils';

let corners: TPoint[];

export const hexCornerUpdate = (sizes: TSizes) => {
  const result: TPoint[] = [];

  result.push(
    {
      x: -sizes.width / 4,
      y: -sizes.height / 2,
    },
    {
      x: +sizes.width / 4,
      y: -sizes.height / 2,
    },
    {
      x: +sizes.width / 2,
      y: 0,
    },
    {
      x: +sizes.width / 4,
      y: +sizes.height / 2,
    },
    {
      x: -sizes.width / 4,
      y: +sizes.height / 2,
    },
    {
      x: -sizes.width / 2,
      y: 0,
    }
  );

  corners = result;
};

export const hexCornerGet = (center: TPoint, i: number) => {
  const idx = mod(i, 6);
  const result: TPoint = {
    x: center.x + corners[idx].x,
    y: center.y + corners[idx].y,
  };
  return result;
};
