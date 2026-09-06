/**
 * The interface describes an object on a field of the board.
 */
export interface IObject {
  update(deltaTime: number): void;
  render(ctx: CanvasRenderingContext2D): void;
}
