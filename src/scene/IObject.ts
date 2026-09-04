import { Transform } from './Transform';

// TODO: change the name
export interface IObject {
  transform: Transform;
  update(deltaTime: number): void;
  render(ctx: CanvasRenderingContext2D): void;
}
