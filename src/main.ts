import './style.css';
import { drawCricle } from './draw';
import { TPoint } from './types';
import { pixel2FlatHex } from './hex/pixel';
import { boardDraw, boardInit } from './board/base';

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

const size = 40;

const origin = { x: 100, y: 100 };

boardInit(10, 7);

boardDraw(ctx, origin, size);

const mouse: TPoint = {
  x: -1,
  y: -1,
};

const draw = () => {
  //??
  ctx.globalCompositeOperation = 'destination-over';
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  boardDraw(ctx, origin, size);

  if (mouse.x >= 0 && mouse.y >= 0) {
    const center: TPoint = { x: mouse.x, y: mouse.y };
    drawCricle(ctx, center, '#1dfe60');
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
