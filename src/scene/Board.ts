import { fieldCreate } from '../fields';
import { TField, TPoint } from '../types';
import { mod } from '../utils';

/**
 * We are using a odd-q hex model as described in:
 * https://www.redblobgames.com/grids/hexagons/
 */
const NEIGHBOR_EVEN: TPoint[] = [
  { x: +0, y: -1 },
  { x: +1, y: -1 },
  { x: +1, y: +0 },
  { x: +0, y: +1 },
  { x: -1, y: +0 },
  { x: -1, y: -1 },
];

const NEIGHBOR_ODD: TPoint[] = [
  { x: +0, y: -1 },
  { x: +1, y: +0 },
  { x: +1, y: +1 },
  { x: +0, y: +1 },
  { x: -1, y: +1 },
  { x: -1, y: -0 },
];

const HEX_NEIGHBOR: TPoint[][] = [NEIGHBOR_EVEN, NEIGHBOR_ODD];

/**
 * currently not used.
 */
export class Board {
  numX: number;
  numY: number;
  fields: TField[][];

  constructor(numX: number, numY: number) {
    this.numX = numX;
    this.numY = numY;

    this.fields = [];

    for (let x = 0; x < numX; x++) {
      this.fields[x] = [];
      for (let y = 0; y < numY; y++) {
        this.fields[x][y] = fieldCreate({ x, y });
      }
    }
  }

  /**
   * The method checks if a hex coordinate is on the board.
   */
  public isOnBoard(hex: TPoint) {
    return hex.x >= 0 && hex.x < this.numX && hex.y >= 0 && hex.y < this.numY;
  }

  /**
   * The function returns the neighbor of a hexagon in a given direction.
   */
  public getHexNeighbor(hex: TPoint, i: number) {
    const neighbor = HEX_NEIGHBOR[mod(hex.x, 2)][mod(i, 6)];
    const result: TPoint = {
      x: hex.x + neighbor.x,
      y: hex.y + neighbor.y,
    };
    return result;
  }
}
