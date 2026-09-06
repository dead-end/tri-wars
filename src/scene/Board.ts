import { fieldCreate } from '../libs/fields';
import { TField, TPoint } from '../types';

/**
 * currently not used.
 */
export class Board {
  fields: TField[][];

  constructor(public num: TPoint) {
    this.fields = [];

    for (let x = 0; x < num.x; x++) {
      this.fields[x] = [];
      for (let y = 0; y < num.y; y++) {
        this.fields[x][y] = fieldCreate({ x, y });
      }
    }
  }

  /**
   * The method checks if a hex coordinate is on the board.
   */
  public isOnBoard(hex: TPoint) {
    return hex.x >= 0 && hex.x < this.num.x && hex.y >= 0 && hex.y < this.num.x;
  }
}
