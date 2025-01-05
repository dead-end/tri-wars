import { drawFill, drawLine } from '../draw/base';
import { fieldCreate } from '../fields';
import { hexCenterGet } from '../hex/center';
import { hexCornerGet } from '../hex/corner';
import { hexNeighbor } from '../hex/neighbor';
import { hexGetId } from '../hex/utils';
import { TContext, TField, THexSizes, TPoint } from '../types';

let rows = 5;
let cols = 5;

let board: TField[][] = [];

const fieldDraw = (
  ctx: TContext,
  center: TPoint,
  field: TField,
  hexSizes: THexSizes
) => {
  const hexCenter = hexCenterGet(center, field.hex, hexSizes);

  for (let i = 0; i < 6; i++) {
    const hex = hexNeighbor(field.hex, i);
    const hasNeighbor = boardIsOn(hex) && board[hex.x][hex.y] !== undefined;

    if (!hasNeighbor) {
      const start = hexCornerGet(hexCenter, i);
      const end = hexCornerGet(hexCenter, i + 1);
      drawLine(ctx, start, end, '#aaaaaa');

      console.log('start', start);
    }
  }
};

const fieldLabelDraw = (
  ctx: TContext,
  center: TPoint,
  field: TField,
  hexSizes: THexSizes
) => {
  const hexCenter = hexCenterGet(center, field.hex, hexSizes);

  const text = `${Math.round(hexCenter.x)}:${Math.round(hexCenter.y)}`;

  ctx.fillStyle = '#aa0099';
  ctx.font = '0.5em Arial';
  ctx.fillText(hexGetId(field.hex), hexCenter.x - 10, hexCenter.y + 5);
  ctx.fillText(text, hexCenter.x - 10, hexCenter.y + 15);
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

export const boardDraw = (
  ctx: TContext,
  origin: TPoint,
  hexSizes: THexSizes
) => {
  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < rows; r++) {
      const field: TField = fieldCreate({ x: c, y: r });
      board[c][r] = field;

      fieldDraw(ctx, origin, field, hexSizes);
      fieldLabelDraw(ctx, origin, field, hexSizes);
    }
  }
};

export const boardHighlightField = (
  ctx: TContext,
  center: TPoint,
  hex: TPoint,
  hexSizes: THexSizes
) => {
  const hexCenter = hexCenterGet(center, hex, hexSizes);

  const points: TPoint[] = [];
  for (let i = 0; i < 6; i++) {
    points.push(hexCornerGet(hexCenter, i));
  }

  drawFill(ctx, points, '#aaaaaa');
};
