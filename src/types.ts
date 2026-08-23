export type TPoint = {
  x: number;
  y: number;
};

export enum EMarker {
  HIGHLIGHT,
}

export type TField = {
  hex: TPoint;
  markers: EMarker[];
};

export type TContext =
  | CanvasRenderingContext2D
  | OffscreenCanvasRenderingContext2D;

export type THexSizes = {
  size: number;
  width: number;
  height: number;
  vSpace: number;
  hSpace: number;
};
