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
        // TODO: replace with createField? Board needs not to know details of the field.
        this.fields[x][y] = {
          hex: { x, y },
          markers: [],
        };
      }
    }
  }

  isOnBoard(hex: TPoint) {
    return hex.x >= 0 && hex.x < this.numX && hex.y >= 0 && hex.y < this.numY;
  }
}
