import { drawLine } from '../libs/draw';
import { TField } from '../types';
import { Board } from '../scene/Board';
import { createOffscreenCanvas } from '../libs/canvas';
import { IObject } from '../interfaces/IObject';
import { Transform } from '../scene/Transform';
import { hexCorner } from '../libs/hex/hexCorner';
import { hexCenter } from '../libs/hex/hexCenter';

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  color: string;
}

const STAR_COLORS = [
  '#ffffff',
  '#ffffff',
  '#eaf2ff',
  '#fff5ea',
  '#ffeedb',
  '#ffccd5',
];

export class Background implements IObject {
  ctxOff: OffscreenCanvasRenderingContext2D;

  /**
   *
   */
  constructor(
    private board: Board,
    private transform: Transform,
  ) {
    this.ctxOff = createOffscreenCanvas(
      this.transform.boardSize.x,
      this.transform.boardSize.y,
    );

    this.drawBackground(this.ctxOff);

    const stars = this.initStars(
      this.ctxOff,
      this.board.num.x * this.board.num.y,
    );
    this.drawStars(this.ctxOff, stars);

    this.drawBoard(this.ctxOff);
  }

  /**
   * The method draws the background with a gradient.
   */
  private drawBackground(ctx: OffscreenCanvasRenderingContext2D) {
    const gradient = ctx.createLinearGradient(
      0,
      0,
      ctx.canvas.width,
      ctx.canvas.height,
    );

    gradient.addColorStop(0, '#050b14');
    gradient.addColorStop(0.5, '#0b091a');
    gradient.addColorStop(1, '#1a103c');

    ctx.fillStyle = gradient;

    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }

  /**
   * The method initializes the stars.
   */
  private initStars(ctx: OffscreenCanvasRenderingContext2D, num: number) {
    const stars: Star[] = [];
    for (let i = 0; i < num; i++) {
      const randomColor =
        STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)];

      stars.push({
        x: Math.random() * ctx.canvas.width,
        y: Math.random() * ctx.canvas.height,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random(),
        color: randomColor,
      });
    }
    return stars;
  }

  /**
   * The method draws the stars to the canvas.
   */
  private drawStars(ctx: OffscreenCanvasRenderingContext2D, stars: Star[]) {
    stars.forEach((star) => {
      ctx.beginPath();
      ctx.globalAlpha = star.opacity;
      ctx.fillStyle = star.color;

      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fill();
    });

    // IMPORTANT: reset the globalAlpha to 1.0
    ctx.globalAlpha = 1.0;
  }

  /**
   * Two hexagons share an edge. This edge will be drawn by the hexagon that
   * was first created. So we need to keep track of all initialized hexagons.
   */
  private drawBoard(ctx: OffscreenCanvasRenderingContext2D) {
    //
    // A temporary array for the initialize status.
    //
    const isInit: boolean[][] = [];
    for (let x = 0; x < this.board.num.x; x++) {
      isInit[x] = [];
      for (let y = 0; y < this.board.num.y; y++) {
        isInit[x][y] = false;
      }
    }

    for (let x = 0; x < this.board.num.x; x++) {
      for (let y = 0; y < this.board.num.y; y++) {
        const field = this.board.fields[x][y];

        this.drawField(ctx, field, isInit);
        isInit[x][y] = true;
      }
    }
  }

  /**
   * The method draws a field. If draws edges only if it has a neighbor and the
   * neighbor is not initialized.
   */
  private drawField(
    ctx: OffscreenCanvasRenderingContext2D,
    field: TField,
    isInit: boolean[][],
  ) {
    const center = hexCenter(this.transform, field.hex, false);

    for (let i = 0; i < 6; i++) {
      const hex = this.board.getHexNeighbor(field.hex, i);
      const hasNeighbor = this.board.isOnBoard(hex) && isInit[hex.x][hex.y];

      if (!hasNeighbor) {
        const start = hexCorner(this.transform, center, i);
        const end = hexCorner(this.transform, center, i + 1);
        drawLine(ctx, start, end, '#aaaaaa');
      }
    }
  }

  /**
   * Currently the update method has nothing to, because we have no animation for the background.
   */
  update(_deltaTime: number): void {}

  /**
   * The render method copies a part of the background from the off screen canvas to the canvas.
   */
  render(ctx: CanvasRenderingContext2D): void {
    ctx.drawImage(
      this.ctxOff.canvas,
      this.transform.offset.x,
      this.transform.offset.y,
      ctx.canvas.width,
      ctx.canvas.height,
      0,
      0,
      ctx.canvas.width,
      ctx.canvas.height,
    );
  }
}
