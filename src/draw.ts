import { Point } from './types';

export const drawLine = (
  ctx: CanvasRenderingContext2D,
  start: Point,
  end: Point
) => {
  ctx.strokeStyle = '#aaaaaa';

  ctx.beginPath();
  ctx.moveTo(start.x, start.y);
  ctx.lineTo(end.x, end.y);
  ctx.stroke();
};

export const drawCricle = (ctx: CanvasRenderingContext2D, center: Point) => {
  ctx.beginPath();
  ctx.arc(center.x, center.y, 10, 0, 2 * Math.PI);
  ctx.stroke();
};
