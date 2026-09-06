import { drawFill } from '../libs/draw';
import { TPoint } from '../types';
import { Transform } from './Transform';

// TODO: not used
export class HighlightHex {
  private offscreen: OffscreenCanvas;

  constructor(
    private transform: Transform,
    width: number,
    height: number,
  ) {
    this.offscreen = new OffscreenCanvas(width, height);
    const ctx = this.offscreen.getContext('2d');

    if (!ctx) {
      throw new Error('mist');
    }
    this.drawGameGraphics(ctx);
  }

  private drawGameGraphics(ctx: OffscreenCanvasRenderingContext2D) {
    const hexCenter = this.transform.getHexCenter(
      { x: 0, y: 0 },
      { x: 0, y: 0 },
    );

    const points: TPoint[] = [];
    for (let i = 0; i < 6; i++) {
      points.push(this.transform.getHexCorner(hexCenter, i));
    }

    drawFill(ctx, points, '#aaaaaa');
  }
}
