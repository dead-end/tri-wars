import { hexCorner } from './hex/corner';
import { fieldGetNeighbor } from './fields';
import { hexGetCenter } from './hex2';
import { TField, Point } from './types';

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
  field: TField,
  size: number
) => {
  const hexCenter = hexGetCenter(center, field.hex, size);

  for (let i = 0; i < 6; i++) {
    const neighbor = fieldGetNeighbor(field.hex, i);

    if (!neighbor) {
      const start = hexCorner(hexCenter, i, size);
      const end = hexCorner(hexCenter, i + 1, size);
      drawLine(ctx, start, end);
    }
  }
};

export const drawFieldLabel = (
  ctx: CanvasRenderingContext2D,
  center: Point,
  field: TField,
  size: number
) => {
  const hexCenter = hexGetCenter(center, field.hex, size);

  ctx.fillStyle = '#aa0099';
  ctx.font = '1em Arial';
  ctx.fillText(field.id, hexCenter.x - 10, hexCenter.y + 5);
};
