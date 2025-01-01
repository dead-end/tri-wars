import { hexCorner } from './hex/corner';
import { drawField, drawFieldLabel, drawLine } from './draw';
import { Point, TField } from './types';
import './style.css';
import { fieldCreate } from './fields';
import { hexGetCenter, hexGetCricle } from './hex2';
import { hexNeighbor } from './hex/neighbor';

const canvas = document.querySelector('#canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.fillStyle = '#ffffff';
ctx.font = '2em Arial';
ctx.fillText('hello world', 50, 50);
/*
const centerStart: Point = {
  x: 100,
  y: 100,
};

const mouse: Point = {
  x: -1,
  y: -1,
};


const drawHexField = () => {
  let center: Point = { x: 0, y: 0 };

  for (let j = 0; j < 5; j++) {
    const offset = (j % 2) * sqr3 * (hexSize / 2);
    for (let i = 0; i < 10; i++) {
      center.x = centerStart.x + i * hexSize * sqr3 + offset;
      center.y = centerStart.y + j * hexSize * (3 / 2);
      drawHex(center);
    }
  }
};

const drawHex = (center: Point) => {
  for (let i = 0; i < 6; i++) {
    const start = cornerGet(center, i, hexSize);
    const end = cornerGet(center, i + 1, hexSize);
    drawLine(ctx, start, end);
  }
};

const sqr3 = Math.sqrt(3);
const hexSize = 40;
*/

/*
const drawCricle = (center: Point) => {
  ctx.beginPath();
  ctx.arc(center.x, center.y, 10, 0, 2 * Math.PI);
  ctx.stroke();
};
*/
/*
const draw = () => {
  //??
  ctx.globalCompositeOperation = 'destination-over';
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawHexField();

  if (mouse.x >= 0 && mouse.y >= 0) {
    drawCricle({ x: mouse.x, y: mouse.y });
  }

  window.requestAnimationFrame(draw);
};

window.addEventListener('mousedown', (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});



draw();
*/

const drawHexCircle = (center: Point, radius: number, size: number) => {
  let field;
  const circle = hexGetCricle(radius);
  for (let hex of circle) {
    field = fieldCreate(hex);
    drawField(ctx, center, field, size);
    drawFieldLabel(ctx, center, field, size);
  }
};

const drawFields = (center: Point, max: number, size: number) => {
  let field = fieldCreate({ x: 0, y: 0 });
  drawField(ctx, center, field, size);
  drawFieldLabel(ctx, center, field, size);

  for (let radius = 1; radius < max; radius++) {
    drawHexCircle(center, radius, size);
  }
};

const size = 40;

//let field;

const center: Point = { x: 600, y: 600 };
drawLine(ctx, { x: center.x, y: 0 }, { x: center.x, y: 2 * center.y });
drawLine(ctx, { x: 0, y: center.y }, { x: 2 * center.x, y: center.y });

drawFields(center, 3, size);

const radius = 2;

let area: TField[][] = [];

/*
for (let x = -radius; x <= radius; x++) {
  const row: TField[] = [];
  for (let y = -radius; y < radius; y++) {}
}
*/

const areaInit = () => {
  for (let x = -radius; x <= radius; x++) {
    area.push([]);
  }

  console.log('init', area);
};

const areaHas = (hex: Point) => {
  const x = hex.x + radius;
  const y = hex.y + radius;

  if (x < 0 || y < 0) {
    return false;
  }

  if (x > 2 * radius || y > 2 * radius) {
    return false;
  }

  return area[x][y] !== undefined;
};

const areaGet = (hex: Point) => {
  return area[hex.x + radius][hex.y + radius];
};

const areaSet = (field: TField, hex: Point) => {
  area[hex.x + radius][hex.y + radius] = field;
};

const drawAreadField = (
  ctx: CanvasRenderingContext2D,
  center: Point,
  field: TField,
  size: number
) => {
  const hexCenter = hexGetCenter(center, field.hex, size);

  for (let i = 0; i < 6; i++) {
    const hex = hexNeighbor(field.hex, i);
    const neighbor = areaHas(hex);

    if (!neighbor) {
      const start = hexCorner(hexCenter, i, size);
      const end = hexCorner(hexCenter, i + 1, size);
      drawLine(ctx, start, end);
    }
  }
};

const drawArea = () => {
  const center: Point = { x: 200, y: 600 };
  drawLine(ctx, { x: center.x, y: 0 }, { x: center.x, y: 2 * center.y });
  drawLine(ctx, { x: 0, y: center.y }, { x: 2 * center.x, y: center.y });

  for (let x = -radius; x <= radius; x++) {
    for (let y = -radius; y <= radius; y++) {
      const field = fieldCreate({ x, y });
      console.log(field);
      areaSet(field, { x, y });
      drawAreadField(ctx, center, field, size);
      drawFieldLabel(ctx, center, field, size);
    }
  }
};

areaInit();

drawArea();
