import { TPoint } from './types';

/**
 * Base function that draws a line.
 */
export const drawLine = (
  ctx: CanvasRenderingContext2D,
  start: TPoint,
  end: TPoint,
  style: string
) => {
  ctx.strokeStyle = style;
  ctx.beginPath();
  ctx.moveTo(start.x, start.y);
  ctx.lineTo(end.x, end.y);
  ctx.stroke();
};

/**
 * Base function that draws a circle.
 */
export const drawCricle = (
  ctx: CanvasRenderingContext2D,
  center: TPoint,
  style: string
) => {
  ctx.strokeStyle = style;
  ctx.beginPath();
  ctx.arc(center.x, center.y, 10, 0, 2 * Math.PI);
  ctx.stroke();
};
