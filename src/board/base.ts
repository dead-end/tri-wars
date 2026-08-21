import { drawFill, drawLine } from '../draw/base';
import { fieldCreate } from '../fields';
import { hexCenterGet } from '../hex/center';
import { hexCornerGet } from '../hex/corner';
import { hexNeighbor } from '../hex/neighbor';
import { hexGetId } from '../hex/utils';
import { TContext, TField, THexSizes, TPoint } from '../types';

let rows = 0;
let cols = 0;

let board: TField[][] = [];

const fieldDraw = (
  ctx: TContext,
  origin: TPoint,
  field: TField,
  hexSizes: THexSizes,
) => {
  const hexCenter = hexCenterGet(origin, field.hex, hexSizes);

  for (let i = 0; i < 6; i++) {
    const hex = hexNeighbor(field.hex, i);
    const hasNeighbor = boardIsOn(hex) && board[hex.x][hex.y] !== undefined;

    if (!hasNeighbor) {
      const start = hexCornerGet(hexCenter, i);
      const end = hexCornerGet(hexCenter, i + 1);
      drawLine(ctx, start, end, '#aaaaaa');

      //console.log('start', start);
    }
  }
};

const fieldLabelDraw = (
  ctx: TContext,
  origin: TPoint,
  field: TField,
  hexSizes: THexSizes,
) => {
  const hexCenter = hexCenterGet(origin, field.hex, hexSizes);

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

/**
 * The function checks if a hex/field is on the board. For example, when we
 * compute neighbors for a hex at the edge of the board, then a potential
 * neighbor may be outside.
 */
export const boardIsOn = (hex: TPoint) => {
  return hex.x >= 0 && hex.x < cols && hex.y >= 0 && hex.y < rows;
};

export const boardDraw = (
  ctx: TContext,
  origin: TPoint,
  hexSizes: THexSizes,
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
  hexSizes: THexSizes,
) => {
  const hexCenter = hexCenterGet(center, hex, hexSizes);

  const points: TPoint[] = [];
  for (let i = 0; i < 6; i++) {
    points.push(hexCornerGet(hexCenter, i));
  }

  drawFill(ctx, points, '#aaaaaa');
};
