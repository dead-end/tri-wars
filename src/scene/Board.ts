import { fieldCreate } from '../fields';
import { TField, TPoint } from '../types';

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

  isOnBoard(hex: TPoint) {
    return hex.x >= 0 && hex.x < this.numX && hex.y >= 0 && hex.y < this.numY;
  }
}
