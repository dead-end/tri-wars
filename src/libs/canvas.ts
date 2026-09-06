/**
 * The function returns a 2d canvas context for a canvas with a given id in the
 * html page. It sets the canvas size.
 */
export const createCanvas = (
  canvasId: string,
  width: number,
  height: number,
) => {
  const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
  if (!canvas) {
    throw new Error(`Unable to find canvas with id: ${canvasId}`);
  }
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('2D Context konnte nicht geladen werden.');
  }
  return ctx;
};

/**
 * The function creates an offscreen canvas with a given size.
 */
export const createOffscreenCanvas = (width: number, height: number) => {
  const canvasOff = new OffscreenCanvas(width, height);
  const ctxOff = canvasOff.getContext('2d');

  if (ctxOff == null) {
    throw new Error('Unable to get context!');
  }

  return ctxOff;
};
