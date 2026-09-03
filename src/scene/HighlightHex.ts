import { drawFill } from '../draw/base';
import { hexCenterGet } from '../hex/center';
import { hexCornerGet } from '../hex/corner';
import { THexSizes, TPoint } from '../types';

export class HighlightHex {
  private offscreen: OffscreenCanvas;

  constructor(width: number, height: number, hexSizes: THexSizes) {
    this.offscreen = new OffscreenCanvas(width, height);
    const ctx = this.offscreen.getContext('2d');

    if (!ctx) {
      throw new Error('mist');
    }
    this.drawGameGraphics(ctx, hexSizes);
  }

  private drawGameGraphics(
    ctx: OffscreenCanvasRenderingContext2D,
    hexSizes: THexSizes,
  ) {
    const hexCenter = hexCenterGet({ x: 0, y: 0 }, { x: 0, y: 0 }, hexSizes);

    const points: TPoint[] = [];
    for (let i = 0; i < 6; i++) {
      points.push(hexCornerGet(hexCenter, i));
    }

    drawFill(ctx, points, '#aaaaaa');
  }
}
