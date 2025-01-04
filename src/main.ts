import './style.css';
import { TPoint } from './types';
import { pixel2Hex } from './hex/pixel2hex';
import {
  boardDraw,
  boardInit,
  boardIsOn,
  boardHighlightField,
} from './board/base';

const canvas = document.querySelector('#canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const canvasOff = new OffscreenCanvas(1000, 1000);
const ctxOff = canvasOff.getContext('2d');

if (ctx == null || ctxOff == null) {
  throw new Error('Unable to get context!');
}

/*
ctx.fillStyle = '#ffffff';
ctx.font = '2em Arial';
ctx.fillText('hello world', 50, 50);
*/

// ----------------

const size = 40;

const origin = { x: 100, y: 100 };

boardInit(10, 7);

boardDraw(ctxOff, origin, size);

const mouse: TPoint = {
  x: -1,
  y: -1,
};

const draw = () => {
  //??
  ctx.globalCompositeOperation = 'destination-over';
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.drawImage(
    canvasOff,
    0,
    0,
    canvas.width,
    canvas.height,
    0,
    0,
    canvas.width,
    canvas.height
  );

  if (mouse.x >= 0 && mouse.y >= 0) {
    const center: TPoint = { x: mouse.x, y: mouse.y };
    const coords = pixel2Hex(center, size, origin);
    // console.log(coords);

    if (boardIsOn(coords)) {
      boardHighlightField(ctx, origin, coords, size);
    }
  }

  window.requestAnimationFrame(draw);
};

window.addEventListener('mousedown', (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

draw();
