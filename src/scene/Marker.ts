import { drawFill } from '../draw/base';
import { hexCornerGet } from '../hex/corner';
import { EMarker, TContext, TPoint } from '../types';
import { Board } from './Board';
import { Transform } from './Transform';

export class Marker {
  /**
   *
   */
  constructor(
    private board: Board,
    private transform: Transform,
  ) {}

  /**
   * The method checks if a field has a marker of a given type.
   */
  private hasMarker(hex: TPoint, marker: EMarker) {
    return this.board.fields[hex.x][hex.y].markers.includes(marker);
  }

  /**
   * The method adds a marker of a given type to the field.
   */
  public addMarker(hex: TPoint, marker: EMarker) {
    if (this.hasMarker(hex, marker)) {
      return;
    }
    this.board.fields[hex.x][hex.y].markers.push(marker);
  }

  /**
   * The method removes a marker of a given type from a field.
   */
  private removeMarker(hex: TPoint, marker: EMarker) {
    if (!this.hasMarker(hex, marker)) {
      return;
    }
    const field = this.board.fields[hex.x][hex.y];
    field.markers = field.markers.filter((m) => m !== marker);
  }

  /**
   * The method removes a marker from all fields of the board.
   */
  public removeAllMarker(marker: EMarker) {
    for (let x = 0; x < this.board.numX; x++) {
      for (let y = 0; y < this.board.numY; y++) {
        this.removeMarker({ x, y }, marker);
      }
    }
  }

  /**
   * The method highlights all fields that have to highlight marker.
   */
  public highlightFields(ctx: TContext) {
    for (let x = 0; x < this.board.numX; x++) {
      for (let y = 0; y < this.board.numY; y++) {
        const hex = { x, y };
        if (this.hasMarker(hex, EMarker.HIGHLIGHT)) {
          this.highlightField(ctx, hex);
        }
      }
    }
  }

  /**
   * The method highlights a field.
   */
  // TODO: add opacity
  // TODO: maybe an off screen image
  private highlightField = (ctx: TContext, hex: TPoint) => {
    const hexCenter = this.transform.getHexCenter(
      this.transform.getOriginOffset(),
      hex,
    );

    const points: TPoint[] = [];
    for (let i = 0; i < 6; i++) {
      points.push(hexCornerGet(hexCenter, i));
    }

    drawFill(ctx, points, '#aaaaaa');
  };
}
