import { cornerGet } from './corner';
import { fieldGetNeighbor } from './fields';
import { hexGetCenter } from './hex';
import { Field, Point } from './types';

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

export const drawField = (
  ctx: CanvasRenderingContext2D,
  center: Point,
  field: Field,
  size: number
) => {
  const fieldCenter = hexGetCenter(center, field.hex, size);

  for (let i = 0; i < 6; i++) {
    const neighbor = fieldGetNeighbor(field.hex, i);

    if (!neighbor) {
      const start = cornerGet(fieldCenter, i, size);
      const end = cornerGet(fieldCenter, i + 1, size);
      drawLine(ctx, start, end);
    }
  }

  ctx.fillStyle = '#aa0099';
  ctx.font = '1em Arial';
  ctx.fillText(
    `${field.hex.x}:${field.hex.y}`,
    fieldCenter.x - 10,
    fieldCenter.y + 5
  );
};
