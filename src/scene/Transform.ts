import { TPoint } from '../types';

export class Transform {
  //
  // The outer radius of the hex.
  //
  private size: number;

  //
  // The distance between the centers of two vertical hexagons, which means two
  // hexagon on top of each other.
  //
  private vSpace: number;

  //
  // The distance between the centers of two horizontal hexagons. The hexagons
  // have an offset to the top or the bottom.
  //
  private hSpace: number;

  //
  // The size from the left corner to the right corner.
  //
  width: number;

  //
  // The size from the top to the bottom edge of the hex. This is also the
  // inner radius.
  //
  height: number;

  //
  // The center of the upper left hex.
  //
  origin: TPoint;

  //
  // The offset FROM the origin (>=0)
  //
  offset: TPoint = { x: 0, y: 0 };

  //
  // The number of hexagons (rows - x and cols - y)
  //
  hexNum: TPoint;

  //
  // The size of the board, which may be greater than the visible part.
  //
  boardSize: TPoint;

  //
  // The size of the canvas, which is the visible size.
  //
  private canvasSize: TPoint;

  constructor(size: number, hexNum: TPoint, canvasSize: TPoint) {
    this.size = size;

    this.vSpace = Math.sqrt(3) * size;

    this.hSpace = (3 / 2) * size;

    this.width = 2 * size;

    this.height = Math.sqrt(3) * size;

    this.origin = {
      x: this.width / 2,
      y: this.height / 2,
    };

    this.hexNum = hexNum;

    //
    // Compute board sizes
    //
    const x = 2 * this.size + (this.hexNum.x - 1) * this.hSpace;
    const y = this.hexNum.y * this.vSpace + this.vSpace / 2;
    this.boardSize = {
      x: Math.ceil(x),
      y: Math.ceil(y),
    };

    this.canvasSize = canvasSize;
  }

  public addOffset(x: number, y: number) {
    this.offset.x += x;

    if (this.offset.x < 0) {
      this.offset.x = 0;
    } else if (this.offset.x > this.boardSize.x - this.canvasSize.x) {
      this.offset.x = this.boardSize.x - this.canvasSize.x;
    }

    this.offset.y += y;

    if (this.offset.y < 0) {
      this.offset.y = 0;
    } else if (this.offset.y > this.boardSize.y - this.canvasSize.y) {
      this.offset.y = this.boardSize.y - this.canvasSize.y;
    }
  }

  public getOriginOffset() {
    return {
      x: this.origin.x - this.offset.x,
      y: this.origin.y - this.offset.y,
    } as TPoint;
  }
}
