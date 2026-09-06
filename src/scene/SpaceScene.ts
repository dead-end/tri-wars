import { hexCornerUpdate } from '../hex/corner';
import { pixel2Hex } from '../hex/pixel2hex';
import { EMarker, TPoint } from '../types';
import { Background } from '../objects/Background';
import { Board } from './Board';
import { createCanvas } from './canvas';
import { IObject } from '../interfaces/IObject';
import { IScene } from '../interfaces/IScene';
import { Marker } from './Marker';
import { SceneManager } from './SceneManager';
import { Transform } from './Transform';

export class SpaceScene implements IScene {
  name = 'SpaceScene';

  ctx: CanvasRenderingContext2D;

  offsetSpeed: number = 20;
  lastKey: string | undefined = undefined;

  mouse: TPoint = { x: -1, y: -1 };

  board: Board;
  transform: Transform;

  objects: IObject[] = [];

  marker: Marker;

  /**
   * The constructor is called with the scene manager to be able to switch the
   * scene.
   */
  constructor(private sceneManager: SceneManager) {
    this.ctx = createCanvas('canvas', window.innerWidth, window.innerHeight);

    this.transform = new Transform(
      40,
      { x: 20, y: 10 },
      { x: this.ctx.canvas.width, y: this.ctx.canvas.height },
    );

    this.board = new Board(20, 10);
    this.marker = new Marker(this.board, this.transform);

    hexCornerUpdate(this.transform);

    this.objects.push(new Background(this.board, this.transform));
  }

  /**
   * The method initializes the scene. This means adding event listeners.
   */
  public create(): void {
    document.addEventListener('keydown', this.keydown);
    document.addEventListener('mousedown', this.mousedown);
  }

  /**
   * The method removes the event listeners.
   */
  public destroy(): void {
    document.removeEventListener('keydown', this.keydown);
    document.removeEventListener('mousedown', this.mousedown);
  }

  /**
   * The method processes arrow keys.
   */
  private boardUpdateOffset(key: string) {
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

  /**
   * The method processes the keyboard and mouse input from the listeners and
   * delegates the method call to its objects.
   */
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

      if (this.board.isOnBoard(hex)) {
        this.marker.removeAllMarker(EMarker.HIGHLIGHT);
        this.marker.addMarker(hex, EMarker.HIGHLIGHT);
      }

      this.mouse.x = -1;
      this.mouse.y = -1;
    }

    for (const obj of this.objects) {
      obj.update(deltaTime);
    }
  }

  /**
   * The method delegates the rendering to its objects.
   */
  public render(ctx: CanvasRenderingContext2D): void {
    for (const obj of this.objects) {
      obj.render(ctx);
    }

    this.marker.highlightFields(ctx);
  }

  /**
   *
   */
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

  /**
   *
   */
  private mousedown = (e: MouseEvent) => {
    this.mouse.x = e.x;
    this.mouse.y = e.y;
  };
}
