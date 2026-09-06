/*

import { drawLine } from '../draw/base';
import { fieldCreate } from '../fields';
import { hexCornerGet } from '../hex/corner';
import { hexNeighbor } from '../hex/neighbor';
import { hexGetId } from '../hex/utils';
import { Transform } from '../scene/Transform';
import { TContext, TField, TPoint } from '../types';

let numX = 0;
let numY = 0;

let board: TField[][] = [];
*/
/*
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
};*/
/*
const fieldLabelDraw = (ctx: TContext, transform: Transform, field: TField) => {
  const hexCenter = transform.hexCenterGet(transform.origin, field.hex);

  const text = `${Math.round(hexCenter.x)}:${Math.round(hexCenter.y)}`;

  ctx.fillStyle = '#aa0099';
  ctx.font = '0.5em Arial';
  ctx.fillText(hexGetId(field.hex), hexCenter.x - 10, hexCenter.y + 5);
  ctx.fillText(text, hexCenter.x - 10, hexCenter.y + 15);
};
*/
/**
 * The function initializes the board. This has to be done before we draw the
 * board, because we check neighbors. We cannot initialize the complete board,
 * because it is of type TField and does not allow undefined, which is
 * necessary to draw the board.
 */
/*
const boardInit = (bx: number, by: number) => {
  numX = bx;
  numY = by;

  for (let x = 0; x < numX; x++) {
    board[x] = [];
    for (let y = 0; y < numY; y++) {
      const field: TField = fieldCreate({ x, y });
      board[x][y] = field;
    }
  }
};*/

/**
 * The function checks if a hex/field is on the board. For example, when we
 * compute neighbors for a hex at the edge of the board, then a potential
 * neighbor may be outside.
 */
/*
const boardIsOn = (hex: TPoint) => {
  return hex.x >= 0 && hex.x < numX && hex.y >= 0 && hex.y < numY;
};*/

/**
 * The fields are added to the board, while we are drawing the board. The
 * fieldDraw method relies on the incremental creation. An edge is part of two
 * hexagons. The first draws the edge. The second sees the first hexagon and
 * assumes that it already draws the edge.
 */
// TODO: Maybe we can use a temp shadow array for the drawing.
// TODO: not used
/*
const boardDraw = (ctx: TContext, transform: Transform) => {
  for (let x = 0; x < numX; x++) {
    for (let y = 0; y < numY; y++) {
      const field: TField = fieldCreate({ x, y });
      board[x][y] = field;

      //  fieldDraw(ctx, transform, field);
      // fieldLabelDraw(ctx, transform, field);
    }
  }
};*/

/*
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
  for (let x = 0; x < numX; x++) {
    for (let y = 0; y < numY; y++) {
      const hex = { x, y };
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
  for (let x = 0; x < numX; x++) {
    for (let y = 0; y < numY; y++) {
      boardRemoveMarker({ x, y }, marker);
    }
  }
};
*/
