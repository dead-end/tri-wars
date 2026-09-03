import { drawFill, drawLine } from '../draw/base';
import { fieldCreate } from '../fields';
import { hexCornerGet } from '../hex/corner';
import { hexNeighbor } from '../hex/neighbor';
import { hexGetId } from '../hex/utils';
import { Transform } from '../scene/Transform';
import { EMarker, TContext, TField, TPoint } from '../types';

let rows = 0;
let cols = 0;

let board: TField[][] = [];

const fieldDraw = (ctx: TContext, transform: Transform, field: TField) => {
  const hexCenter = transform.hexCenterGet(transform.origin, field.hex);

  for (let i = 0; i < 6; i++) {
    const hex = hexNeighbor(field.hex, i);
    const hasNeighbor = boardIsOn(hex) && board[hex.x][hex.y] !== undefined;

    if (!hasNeighbor) {
      const start = hexCornerGet(hexCenter, i);
      const end = hexCornerGet(hexCenter, i + 1);
      drawLine(ctx, start, end, '#aaaaaa');
    }
  }
};

const fieldLabelDraw = (ctx: TContext, transform: Transform, field: TField) => {
  const hexCenter = transform.hexCenterGet(transform.origin, field.hex);

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

export const boardDraw = (ctx: TContext, transform: Transform) => {
  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < rows; r++) {
      const field: TField = fieldCreate({ x: c, y: r });
      board[c][r] = field;

      fieldDraw(ctx, transform, field);
      fieldLabelDraw(ctx, transform, field);
    }
  }
};

export const boardHighlightField = (
  ctx: TContext,
  transform: Transform,
  hex: TPoint,
) => {
  const hexCenter = transform.hexCenterGet(transform.getOriginOffset(), hex);

  const points: TPoint[] = [];
  for (let i = 0; i < 6; i++) {
    points.push(hexCornerGet(hexCenter, i));
  }

  drawFill(ctx, points, '#aaaaaa');
};

export const boardHighlightFields = (ctx: TContext, transform: Transform) => {
  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < rows; r++) {
      const hex = { x: r, y: c };
      if (boardHasMarker(hex, EMarker.HIGHLIGHT)) {
        boardHighlightField(ctx, transform, hex);
      }
    }
  }
};

const boardHasMarker = (hex: TPoint, marker: EMarker) => {
  return board[hex.x][hex.y].markers.includes(marker);
};

export const boardAddMarker = (hex: TPoint, marker: EMarker) => {
  if (boardHasMarker(hex, marker)) {
    return;
  }
  board[hex.x][hex.y].markers.push(marker);
};

const boardRemoveMarker = (hex: TPoint, marker: EMarker) => {
  if (!boardHasMarker(hex, marker)) {
    return;
  }
  const field = board[hex.x][hex.y];
  field.markers = field.markers.filter((m) => m !== marker);
};

export const boardRemoveAllMarker = (marker: EMarker) => {
  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < rows; r++) {
      boardRemoveMarker({ x: r, y: c }, marker);
    }
  }
};
