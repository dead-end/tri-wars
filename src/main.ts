import { cornerInit } from './corner';
import { drawField, drawLine } from './draw';
import { Point } from './types';
import './style.css';
import { fieldCreate } from './fields';
import { hexGetNeighbor } from './hex';

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

const drawCricle = (center: Point) => {
  ctx.beginPath();
  ctx.arc(center.x, center.y, 10, 0, 2 * Math.PI);
  ctx.stroke();
};

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

const hexGetCricle = (radius: number) => {
  const results: Point[] = [];

  let hex: Point = {
    x: -1 * radius,
    y: 1 * radius,
  };

  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < radius; j++) {
      results.push(hex);
      hex = hexGetNeighbor(hex, i);
    }
  }

  console.log(results);

  return results;
};

const drawHexCircle = (center: Point, radius: number, size: number) => {
  let field;
  const circle = hexGetCricle(radius);
  for (let hex of circle) {
    field = fieldCreate(hex);
    drawField(ctx, center, field, size);
  }
};

const drawFields = (center: Point, max: number, size: number) => {
  let field = fieldCreate({ x: 0, y: 0 });
  drawField(ctx, center, field, size);

  for (let radius = 1; radius < max; radius++) {
    drawHexCircle(center, radius, size);
  }
};

const size = 40;

cornerInit();

//let field;

const center: Point = { x: 600, y: 600 };

drawLine(ctx, { x: center.x, y: 0 }, { x: center.x, y: 2 * center.y });
drawLine(ctx, { x: 0, y: center.y }, { x: 2 * center.x, y: center.y });

drawFields(center, 3, size);

/*
drawHexCircle(center, 2, size);

let field = fieldCreate({ x: 0, y: 0 });
drawField(ctx, center, field, size);
*/

/*

field = fieldCreate({ x: 0, y: -1 });
drawField(ctx, center, field, size);

field = fieldCreate({ x: 1, y: -1 });
drawField(ctx, center, field, size);

field = fieldCreate({ x: -1, y: 1 });
drawField(ctx, center, field, size);
*/
