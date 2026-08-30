import { createCanvas } from './canvas';
import { SceneManager } from './SceneManager';

export class Game {
  private ctx: CanvasRenderingContext2D;
  private sceneManager: SceneManager;
  private lastTime: number = 0;
  private isRunning: boolean = false;

  constructor(canvasId: string, sceneManager: SceneManager) {
    this.sceneManager = sceneManager;

    this.ctx = createCanvas(canvasId, window.innerWidth, window.innerHeight);

    document.addEventListener('keydown', this.keydown);
  }

  /**
   * The function is starting the game.
   */
  public start(): void {
    if (this.isRunning) {
      return;
    }

    this.isRunning = true;

    // prise time in milliseconds
    this.lastTime = performance.now();

    // starting the main loop
    requestAnimationFrame((timestamp) => this.loop(timestamp));
  }

  /**
   * The function implements the main loop of the game.
   */
  private loop(timestamp: number): void {
    if (!this.isRunning) {
      return;
    }

    // 1. compute delta time (time diff in seconds)
    let deltaTime = (timestamp - this.lastTime) / 1000;
    this.lastTime = timestamp;

    // FPS protection: limits the delta time
    if (deltaTime > 0.1) {
      deltaTime = 0.1;
    }

    // 2. update the current scene
    this.sceneManager.update(deltaTime);

    // 3. render the current scene after we cleared the canvas.
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.sceneManager.render(this.ctx);

    // 4. request next frame
    requestAnimationFrame((timestamp) => this.loop(timestamp));
  }

  /**
   * The function is pausing the game.
   */
  public stop(): void {
    this.isRunning = false;
  }

  private keydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      this.stop();
    }
  };
}
