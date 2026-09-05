import {
  boardAddMarker,
  boardHighlightFields,
  boardIsOn,
  boardRemoveAllMarker,
} from '../board/base';
import { hexCornerUpdate } from '../hex/corner';
import { pixel2Hex } from '../hex/pixel2hex';
import { EMarker, TPoint } from '../types';
import { Background } from './Background';
import { createCanvas } from './canvas';
import { IObject } from './IObject';
import { IScene } from './IScene';
import { SceneManager } from './SceneManager';
import { Transform } from './Transform';

export class SpaceScene implements IScene {
  name = 'SpaceScene';

  sceneManager: SceneManager;
  ctx: CanvasRenderingContext2D;

  offsetSpeed: number = 20;
  lastKey: string | undefined = undefined;

  mouse: TPoint = { x: -1, y: -1 };

  transform: Transform;

  objects: IObject[] = [];

  constructor(sceneManager: SceneManager) {
    this.sceneManager = sceneManager;
    this.ctx = createCanvas('canvas', window.innerWidth, window.innerHeight);

    this.transform = new Transform(
      40,
      { x: 20, y: 10 },
      { x: this.ctx.canvas.width, y: this.ctx.canvas.height },
    );

    hexCornerUpdate(this.transform);

    this.objects.push(new Background(this.transform));
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
    switch (key) {
      case 'ArrowLeft':
        this.transform.addOffset(-this.offsetSpeed, 0);
        break;
      case 'ArrowRight':
        this.transform.addOffset(this.offsetSpeed, 0);
        break;
      case 'ArrowUp':
        this.transform.addOffset(0, -this.offsetSpeed);
        break;
      case 'ArrowDown':
        this.transform.addOffset(0, this.offsetSpeed);
        break;
    }
  }

  public update(deltaTime: number): void {
    if (this.lastKey) {
      this.boardUpdateOffset(this.lastKey);
      this.lastKey = undefined;
    }

    if (this.mouse.x >= 0 && this.mouse.y >= 0) {
      const pixel: TPoint = { x: this.mouse.x, y: this.mouse.y };
      const hex = pixel2Hex(
        pixel,
        this.transform.size,
        this.transform.getOriginOffset(),
      );

      if (boardIsOn(hex)) {
        boardRemoveAllMarker(EMarker.HIGHLIGHT);
        boardAddMarker(hex, EMarker.HIGHLIGHT);
      }

      this.mouse.x = -1;
      this.mouse.y = -1;
    }

    for (const obj of this.objects) {
      obj.update(deltaTime);
    }
  }

  public render(ctx: CanvasRenderingContext2D): void {
    for (const obj of this.objects) {
      obj.render(ctx);
    }

    boardHighlightFields(ctx, this.transform);
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
