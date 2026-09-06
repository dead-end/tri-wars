import { IScene } from '../interfaces/IScene';
import { SceneManager } from './SceneManager';

export class StartScene implements IScene {
  public name = 'StartScene';

  private x: number = 0;
  private y: number = 0;
  private speed: number = 30;
  private direction: number = 1;

  constructor(private sceneManager: SceneManager) {}

  public create(): void {
    this.x = 10;
    this.y = 10;

    document.addEventListener('keydown', this.keydown);
  }

  public destroy(): void {
    document.removeEventListener('keydown', this.keydown);
  }

  public update(deltaTime: number): void {
    if (this.x > 200) {
      this.direction = -1;
    }
    if (this.x < 10) {
      this.direction = 1;
    }
    this.x += this.speed * deltaTime * this.direction;
    this.y += this.speed * deltaTime * this.direction;
  }

  public render(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = 'red';
    ctx.fillText('Start', this.x, this.y);
  }

  private keydown = (e: KeyboardEvent) => {
    if (e.key === ' ') {
      this.sceneManager.changeTo('SpaceScene');
    }
  };
}
