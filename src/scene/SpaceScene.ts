import {
  boardAddMarker,
  boardDraw,
  boardHighlightFields,
  boardInit,
  boardIsOn,
  boardRemoveAllMarker,
} from '../board/base';
import { boardSizeGet } from '../board/size';
import { hexOriginGet } from '../hex/center';
import { hexCornerUpdate } from '../hex/corner';
import { pixel2Hex } from '../hex/pixel2hex';
import { hexSizesUpdate } from '../hex/sizes';
import { EMarker, THexSizes, TPoint } from '../types';
import { createCanvas, createOffscreenCanvas } from './canvas';
import { IScene } from './IScene';
import { SceneManager } from './SceneManager';

export class SpaceScene implements IScene {
  public name = 'SpaceScene';

  private ctx: CanvasRenderingContext2D;
  private hexNum: TPoint = { x: 20, y: 20 };
  private hexSizes: THexSizes;
  private ctxOff: OffscreenCanvasRenderingContext2D;
  private origin: TPoint;
  private boardSize: TPoint;

  private offsetSpeed: number = 20;
  private lastKey: string | undefined = undefined;

  private mouse: TPoint = { x: -1, y: -1 };
  private offset: TPoint = { x: 0, y: 0 };
  private originOffset: TPoint = { x: -1, y: -1 };

  constructor(private sceneManager: SceneManager) {
    this.ctx = createCanvas('canvas', window.innerWidth, window.innerHeight);

    this.hexSizes = hexSizesUpdate(40);
    hexCornerUpdate(this.hexSizes);
    this.origin = hexOriginGet(this.hexSizes);
    this.boardSize = boardSizeGet(this.hexNum, this.hexSizes);

    this.ctxOff = createOffscreenCanvas(this.boardSize.x, this.boardSize.y);

    boardInit(this.hexNum.x, this.hexNum.x);

    boardDraw(this.ctxOff, this.origin, this.hexSizes);
  }

  public create(): void {
    document.addEventListener('keydown', this.keydown);
    document.addEventListener('mousedown', this.mousedown);
  }

  public destroy(): void {
    document.removeEventListener('keydown', this.keydown);
    document.removeEventListener('mousedown', this.mousedown);
  }

  boardUpdateOffset(key: string) {
    console.log('key', key, 'offset', this.offset);
    switch (key) {
      case 'ArrowLeft':
        this.offset.x -= this.offsetSpeed;
        if (this.offset.x < 0) {
          this.offset.x = 0;
        }
        break;
      case 'ArrowRight':
        this.offset.x += this.offsetSpeed;
        if (this.offset.x > this.boardSize.x - this.ctx.canvas.width) {
          this.offset.x = this.boardSize.x - this.ctx.canvas.width;
        }
        break;
      case 'ArrowUp':
        this.offset.y -= this.offsetSpeed;
        if (this.offset.y < 0) {
          this.offset.y = 0;
        }
        break;
      case 'ArrowDown':
        this.offset.y += this.offsetSpeed;
        if (this.offset.y > this.boardSize.y - this.ctx.canvas.height) {
          this.offset.y = this.boardSize.y - this.ctx.canvas.height;
        }
        break;
    }
  }

  public update(deltaTime: number): void {
    if (this.lastKey) {
      this.boardUpdateOffset(this.lastKey);
      this.lastKey = undefined;
    }

    this.originOffset = {
      x: this.origin.x - this.offset.x,
      y: this.origin.y - this.offset.y,
    };

    if (this.mouse.x >= 0 && this.mouse.y >= 0) {
      const pixel: TPoint = { x: this.mouse.x, y: this.mouse.y };
      const hex = pixel2Hex(pixel, this.hexSizes.size, this.originOffset);

      if (boardIsOn(hex)) {
        boardRemoveAllMarker(EMarker.HIGHLIGHT);
        boardAddMarker(hex, EMarker.HIGHLIGHT);
      }

      this.mouse.x = -1;
      this.mouse.y = -1;
    }
  }

  public render(ctx: CanvasRenderingContext2D): void {
    ctx.drawImage(
      this.ctxOff.canvas,
      this.offset.x,
      this.offset.y,
      ctx.canvas.width,
      ctx.canvas.height,
      0,
      0,
      ctx.canvas.width,
      ctx.canvas.height,
    );

    boardHighlightFields(ctx, this.originOffset, this.hexSizes);
  }

  private keydown = (e: KeyboardEvent) => {
    if (
      e.key === 'ArrowLeft' ||
      e.key === 'ArrowRight' ||
      e.key === 'ArrowUp' ||
      e.key === 'ArrowDown'
    ) {
      this.lastKey = e.key;
    }

    if (e.key === ' ') {
      this.sceneManager.changeTo('StartScene');
    }
  };

  private mousedown = (e: MouseEvent) => {
    this.mouse.x = e.x;
    this.mouse.y = e.y;
  };
}
