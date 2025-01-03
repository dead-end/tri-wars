import './style.css';
import { hexCornerGet } from './hex/corner';
import { drawLine } from './draw';
import { Point, TField } from './types';
import { fieldCreate } from './fields';
import { hexNeighbor } from './hex/neighbor';
import { hexCenterGet } from './hex/center';
import { pixel2FlatHex } from './hex/pixel';

const canvas = document.querySelector('#canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

/*
ctx.fillStyle = '#ffffff';
ctx.font = '2em Arial';
ctx.fillText('hello world', 50, 50);
*/

// ----------------

const ROWS = 5;
const COLS = 5;

const size = 40;

const origin = { x: 100, y: 100 };

let area: TField[][] = [];

const areaInit = () => {
  for (let c = 0; c < COLS; c++) {
    area.push([]);
  }
};

const areaInside = (point: Point) => {
  return point.x >= 0 && point.x < COLS && point.y >= 0 && point.y < ROWS;
};

const drawAreadField = (
  ctx: CanvasRenderingContext2D,
  center: Point,
  field: TField,
  size: number
) => {
  const hexCenter = hexCenterGet(center, field.hex, size);

  for (let i = 0; i < 6; i++) {
    const hex = hexNeighbor(field.hex, i);
    const hasNeighbor = areaInside(hex) && area[hex.x][hex.y] !== undefined;

    if (!hasNeighbor) {
      const start = hexCornerGet(hexCenter, i, size);
      const end = hexCornerGet(hexCenter, i + 1, size);
      drawLine(ctx, start, end);
    }
  }
};

export const drawAreaFieldLabel = (
  ctx: CanvasRenderingContext2D,
  center: Point,
  field: TField,
  size: number
) => {
  const hexCenter = hexCenterGet(center, field.hex, size);

  ctx.fillStyle = '#aa0099';
  ctx.font = '1em Arial';
  ctx.fillText(field.id, hexCenter.x - 10, hexCenter.y + 5);
};

const areaDraw = () => {
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const field: TField = fieldCreate({ x: c, y: r });
      area[c][r] = field;

      // if ((c + 2) % 2) {
      drawAreadField(ctx, origin, field, size);
      //}

      drawAreaFieldLabel(ctx, origin, field, size);
    }
  }
};

areaInit();

areaDraw();

// ------

const mouse: Point = {
  x: -1,
  y: -1,
};

const drawCricle = (center: Point) => {
  ctx.beginPath();
  ctx.arc(center.x, center.y, 10, 0, 2 * Math.PI);
  ctx.stroke();
};

const draw = () => {
  //??
  ctx.globalCompositeOperation = 'destination-over';
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  areaDraw();

  if (mouse.x >= 0 && mouse.y >= 0) {
    const center: Point = { x: mouse.x, y: mouse.y };
    drawCricle(center);
    const coords = pixel2FlatHex(center, size, origin);
    console.log(coords);
  }

  window.requestAnimationFrame(draw);
};

window.addEventListener('mousedown', (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

draw();
