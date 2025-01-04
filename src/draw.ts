import { TPoint } from './types';

/**
 * Base function that draws a line.
 */
export const drawLine = (
  ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
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

export const drawFill = (
  ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
  points: TPoint[],
  style: string
) => {
  ctx.fillStyle = style;
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);

  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  ctx.closePath();
  ctx.fill();
};

/**
 * Base function that draws a circle.
 */
export const drawCricle = (
  ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
  center: TPoint,
  style: string
) => {
  ctx.strokeStyle = style;
  ctx.beginPath();
  ctx.arc(center.x, center.y, 10, 0, 2 * Math.PI);
  ctx.stroke();
};
