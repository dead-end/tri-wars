import { boardDraw, boardInit } from '../board/base';
import { createOffscreenCanvas } from './canvas';
import { IObject } from './IObject';
import { Transform } from './Transform';

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
  transform: Transform;
  ctxOff: OffscreenCanvasRenderingContext2D;

  constructor(transform: Transform) {
    this.transform = transform;

    this.ctxOff = createOffscreenCanvas(
      this.transform.boardSize.x,
      this.transform.boardSize.y,
    );

    this.drawBackground(this.ctxOff);

    const stars = this.initStars(
      this.ctxOff,
      this.transform.hexNum.x * this.transform.hexNum.y,
    );
    this.drawStars(this.ctxOff, stars);

    // TODO: wrong place
    boardInit(this.transform.hexNum.x, this.transform.hexNum.x);

    // TODO: the drawing should be here. The rest needs an other place.
    boardDraw(this.ctxOff, this.transform);
  }

  /**
   * The method draws the background with a gradient.
   */
  drawBackground(ctx: OffscreenCanvasRenderingContext2D) {
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
  initStars(ctx: OffscreenCanvasRenderingContext2D, num: number) {
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
  drawStars(ctx: OffscreenCanvasRenderingContext2D, stars: Star[]) {
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
