import { TPoint } from '../types';

export class Transform {
  //
  // The outer radius of the hex.
  //
  size: number;

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
  // All hex fields a computed relative to the center of the top left hex field.
  // The origin it the position of the center top left hex field.
  //
  // The origin is computed, in a way that the top edge and the left corner are
  // on the x- and y-axis.
  //
  // The origin depends on the hex size and it is not just the size.
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

    /**
     * All hex fields a computed relative to the center of the top left hex field.
     * The origin it the position of the center top left hex field.
     *
     * The origin is computed, in a way that the top edge and the left corner are
     * on the x- and y-axis.
     *
     * The origin depends on the hex size and it is not just the size.
     */
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

  /**
   * The function computes the center of a hexagon on the board, based on the
   * coordinates of the origin on the canvas.
   */
  public hexCenterGet = (origin: TPoint, hex: TPoint) => {
    const result: TPoint = {
      x: origin.x + hex.x * this.hSpace,
      y: origin.y + hex.y * this.vSpace + ((hex.x % 2) * this.vSpace) / 2,
    };
    return result;
  };
}
