import { drawLine } from '../draw';
import { fieldCreate } from '../fields';
import { hexCenterGet } from '../hex/center';
import { hexCornerGet } from '../hex/corner';
import { hexNeighbor } from '../hex/neighbor';
import { hexGetId } from '../hex/utils';
import { TField, TPoint } from '../types';

const ROWS = 5;
const COLS = 5;

let board: TField[][] = [];

export const boardInit = () => {
  for (let c = 0; c < COLS; c++) {
    board.push([]);
  }
};

export const boardIsOn = (point: TPoint) => {
  return point.x >= 0 && point.x < COLS && point.y >= 0 && point.y < ROWS;
};

const boardFieldDraw = (
  ctx: CanvasRenderingContext2D,
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
      drawLine(ctx, start, end);
    }
  }
};

export const drawAreaFieldLabel = (
  ctx: CanvasRenderingContext2D,
  center: TPoint,
  field: TField,
  size: number
) => {
  const hexCenter = hexCenterGet(center, field.hex, size);

  ctx.fillStyle = '#aa0099';
  ctx.font = '1em Arial';
  ctx.fillText(hexGetId(field.hex), hexCenter.x - 10, hexCenter.y + 5);
};

export const boardDraw = (
  ctx: CanvasRenderingContext2D,
  origin: TPoint,
  size: number
) => {
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const field: TField = fieldCreate({ x: c, y: r });
      board[c][r] = field;

      // if ((c + 2) % 2) {
      boardFieldDraw(ctx, origin, field, size);
      //}

      drawAreaFieldLabel(ctx, origin, field, size);
    }
  }
};
