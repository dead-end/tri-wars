import './style.css';
import { EMarker, TPoint } from './types';
import { pixel2Hex } from './hex/pixel2hex';
import {
  boardDraw,
  boardInit,
  boardIsOn,
  boardRemoveAllMarker,
  boardAddMarker,
  boardHighlightFields,
} from './board/base';
import { boardSizeGet } from './board/size';
import { hexSizesUpdate } from './hex/sizes';
import { hexCornerUpdate } from './hex/corner';
import { hexOriginGet } from './hex/center';
import { createCanvas, createOffscreenCanvas } from './scene/canvas';

/*
const canvas = document.querySelector('#canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

if (ctx == null) {
  throw new Error('Unable to get context!');
}*/

const ctx = createCanvas('canvas', window.innerWidth, window.innerHeight);

// --------------

// outer circle radius
///const hexSize = 40;

// Number of hex on the board
const hexNum: TPoint = { x: 20, y: 20 };

const hexSizes = hexSizesUpdate(40);
//hexCornerUpdate(hexSizes);
const origin = hexOriginGet(hexSizes);
const boardSize = boardSizeGet(hexNum, hexSizes);

//const canvasOff = new OffscreenCanvas(boardSize.x, boardSize.y);
//const ctxOff = canvasOff.getContext('2d');

//if (ctxOff == null) {
//  throw new Error('Unable to get context!');
//}

const ctxOff = createOffscreenCanvas(boardSize.x, boardSize.y);

/*
ctx.fillStyle = '#ffffff';
ctx.font = '2em Arial';
ctx.fillText('hello world', 50, 50);
*/

// ----------------

// If the board is greater than the canvas, then the origin can be pushed to
// the left and to the top. This can be achieved with the arrow keys.
const offset: TPoint = { x: 0, y: 0 };
let lastKey: string | undefined;
const mouse: TPoint = { x: -1, y: -1 };
const offsetSpeed = 20;

boardInit(hexNum.x, hexNum.x);

//boardDraw(ctxOff, origin, hexSizes);

// console.log('w', canvas.width, 'h', canvas.height, 'off', offset);

const boardUpdateOffset = (key: string) => {
  console.log('key', key, 'offset', offset);
  switch (key) {
    case 'ArrowLeft':
      offset.x -= offsetSpeed;
      if (offset.x < 0) {
        offset.x = 0;
      }
      break;
    case 'ArrowRight':
      offset.x += offsetSpeed;
      if (offset.x > boardSize.x - ctx.canvas.width) {
        offset.x = boardSize.x - ctx.canvas.width;
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
      if (offset.y > boardSize.y - ctx.canvas.height) {
        offset.y = boardSize.y - ctx.canvas.height;
      }
      break;
  }
};

const draw = () => {
  //??
  // ctx.globalCompositeOperation = 'destination-over';

  if (lastKey) {
    boardUpdateOffset(lastKey);
    lastKey = undefined;
  }

  const originOffset: TPoint = {
    x: origin.x - offset.x,
    y: origin.y - offset.y,
  };

  if (mouse.x >= 0 && mouse.y >= 0) {
    const pixel: TPoint = { x: mouse.x, y: mouse.y };
    const hex = pixel2Hex(pixel, hexSizes.size, originOffset);

    if (boardIsOn(hex)) {
      boardRemoveAllMarker(EMarker.HIGHLIGHT);
      boardAddMarker(hex, EMarker.HIGHLIGHT);
    }

    mouse.x = -1;
    mouse.y = -1;
  }

  //  render
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  ctx.drawImage(
    ctxOff.canvas,
    offset.x,
    offset.y,
    ctx.canvas.width,
    ctx.canvas.height,
    0,
    0,
    ctx.canvas.width,
    ctx.canvas.height,
  );

  //boardHighlightFields(ctx, originOffset, hexSizes);

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
