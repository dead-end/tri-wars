import './style.css';
import { TPoint } from './types';
import { pixel2Hex } from './hex/pixel2hex';
import {
  boardDraw,
  boardInit,
  boardIsOn,
  boardHighlightField,
} from './board/base';
import { boardSizeGet } from './board/size';
import { hexSizesUpdate } from './hex/sizes';
import { hexCornerUpdate } from './hex/corner';
import { hexGetOrigin } from './hex/center';

const hexSize = 40;
const hexNum: TPoint = { x: 20, y: 20 };

const hexSizes = hexSizesUpdate(hexSize);
hexCornerUpdate(hexSizes);
const origin = hexGetOrigin(hexSizes);
const boardSize = boardSizeGet(hexNum, hexSizes);

const canvas = document.querySelector('#canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const canvasOff = new OffscreenCanvas(boardSize.x, boardSize.y);
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

const offset: TPoint = {
  x: 0,
  y: 0,
};

let lastKey: string | undefined;

boardInit(hexNum.x, hexNum.x);

boardDraw(ctxOff, origin, hexSizes);

const mouse: TPoint = {
  x: -1,
  y: -1,
};

const offsetSpeed = 10;

console.log('w', canvas.width, 'h', canvas.height, 'off', offset);

const boardUpdateOffset = (key: string) => {
  console.log(key, offset);
  switch (key) {
    case 'ArrowLeft':
      offset.x -= offsetSpeed;
      if (offset.x < 0) {
        offset.x = 0;
      }
      break;
    case 'ArrowRight':
      offset.x += offsetSpeed;
      if (offset.x > boardSize.x - canvas.width) {
        offset.x = boardSize.x - canvas.width;
      }
      break;
    case 'ArrowUp':
      offset.y -= offsetSpeed;
      if (offset.y < 0) {
        offset.y = 0;
      }
      break;
    case 'ArrowDown':
      offset.y += offsetSpeed;
      if (offset.y > boardSize.y - canvas.height) {
        offset.y = boardSize.y - canvas.height;
      }
      break;
  }
};

const draw = () => {
  //??
  ctx.globalCompositeOperation = 'destination-over';
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (lastKey) {
    boardUpdateOffset(lastKey);
    lastKey = undefined;
  }

  ctx.drawImage(
    canvasOff,
    offset.x,
    offset.y,
    canvas.width,
    canvas.height,
    0,
    0,
    canvas.width,
    canvas.height
  );

  if (mouse.x >= 0 && mouse.y >= 0) {
    const center: TPoint = { x: mouse.x, y: mouse.y };
    const coords = pixel2Hex(center, hexSizes.size, origin);
    // console.log(coords);

    if (boardIsOn(coords)) {
      const originOffset: TPoint = {
        x: origin.x - offset.x,
        y: origin.y - offset.y,
      };
      boardHighlightField(ctx, originOffset, coords, hexSizes);
    }
  }

  window.requestAnimationFrame(draw);
};

window.addEventListener('mousedown', (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

window.addEventListener('keydown', (e) => {
  if (
    e.key === 'ArrowLeft' ||
    e.key === 'ArrowRight' ||
    e.key === 'ArrowUp' ||
    e.key === 'ArrowDown'
  ) {
    lastKey = e.key;
  }
});

draw();
