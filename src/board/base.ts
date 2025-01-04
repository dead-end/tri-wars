import { drawFill, drawLine } from '../draw';
import { fieldCreate } from '../fields';
import { hexCenterGet } from '../hex/center';
import { hexCornerGet } from '../hex/corner';
import { hexNeighbor } from '../hex/neighbor';
import { hexGetId } from '../hex/utils';
import { TContext, TField, TPoint } from '../types';

let rows = 5;
let cols = 5;

let board: TField[][] = [];

const fieldDraw = (
  ctx: TContext,
  center: TPoint,
  field: TField,
  size: number
) => {
  const hexCenter = hexCenterGet(center, field.hex, size);

  for (let i = 0; i < 6; i++) {
    const hex = hexNeighbor(field.hex, i);
    const hasNeighbor = boardIsOn(hex) && board[hex.x][hex.y] !== undefined;

    if (!hasNeighbor) {
      const start = hexCornerGet(hexCenter, i, size);
      const end = hexCornerGet(hexCenter, i + 1, size);
      drawLine(ctx, start, end, '#aaaaaa');
    }
  }
};

export const fieldHighlight = (
  ctx: TContext,
  center: TPoint,
  hex: TPoint,
  size: number
) => {
  const hexCenter = hexCenterGet(center, hex, size);

  const points: TPoint[] = [];
  for (let i = 0; i < 6; i++) {
    points.push(hexCornerGet(hexCenter, i, size));
  }

  drawFill(ctx, points, '#aaaaaa');
};

const fieldLabelDraw = (
  ctx: TContext,
  center: TPoint,
  field: TField,
  size: number
) => {
  const hexCenter = hexCenterGet(center, field.hex, size);

  ctx.fillStyle = '#aa0099';
  ctx.font = '1em Arial';
  ctx.fillText(hexGetId(field.hex), hexCenter.x - 10, hexCenter.y + 5);
};

export const boardInit = (iCols: number, iRows: number) => {
  cols = iCols;
  rows = iRows;
  for (let c = 0; c < cols; c++) {
    board.push([]);
  }
};

export const boardIsOn = (point: TPoint) => {
  return point.x >= 0 && point.x < cols && point.y >= 0 && point.y < rows;
};

export const boardDraw = (ctx: TContext, origin: TPoint, size: number) => {
  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < rows; r++) {
      const field: TField = fieldCreate({ x: c, y: r });
      board[c][r] = field;

      fieldDraw(ctx, origin, field, size);
      fieldLabelDraw(ctx, origin, field, size);
    }
  }
};
