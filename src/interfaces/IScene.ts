export interface IScene {
  /**
   * The name of the scene, which is used to register the scene in the scene manager.
   */
  name: string;
  /**
   * Prepare the scene, for example add event listener.
   */
  create(): void;
  /**
   * Game loop (logic per frame)
   */
  update(deltaTime: number): void;
  /**
   * The rendering of the scene.
   */
  render(ctx: CanvasRenderingContext2D): void;
  /**
   * Cleanup code, especially remove event listener.
   */
  destroy(): void;
}
