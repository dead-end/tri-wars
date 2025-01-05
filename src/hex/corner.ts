import { THexSizes, TPoint } from '../types';
import { mod } from '../utils';

let corners: TPoint[];

export const hexCornerUpdate = (hexSizes: THexSizes) => {
  const result: TPoint[] = [];

  result.push(
    {
      x: -hexSizes.width / 4,
      y: -hexSizes.height / 2,
    },
    {
      x: +hexSizes.width / 4,
      y: -hexSizes.height / 2,
    },
    {
      x: +hexSizes.width / 2,
      y: 0,
    },
    {
      x: +hexSizes.width / 4,
      y: +hexSizes.height / 2,
    },
    {
      x: -hexSizes.width / 4,
      y: +hexSizes.height / 2,
    },
    {
      x: -hexSizes.width / 2,
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
