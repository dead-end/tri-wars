import { TPoint } from './types';

export const drawLine = (
  ctx: CanvasRenderingContext2D,
  start: TPoint,
  end: TPoint
) => {
  ctx.strokeStyle = '#aaaaaa';

  ctx.beginPath();
  ctx.moveTo(start.x, start.y);
  ctx.lineTo(end.x, end.y);
  ctx.stroke();
};

export const drawCricle = (ctx: CanvasRenderingContext2D, center: TPoint) => {
  ctx.beginPath();
  ctx.arc(center.x, center.y, 10, 0, 2 * Math.PI);
  ctx.stroke();
};
