export type TPoint = {
  x: number;
  y: number;
};

export type TField = {
  hex: TPoint;
};

export type TContext =
  | CanvasRenderingContext2D
  | OffscreenCanvasRenderingContext2D;

export type TSizes = {
  size: number;
  width: number;
  height: number;
  vSpace: number;
  hSpace: number;
};
