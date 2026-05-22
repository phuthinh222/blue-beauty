import { LIPS_OUTER, LM, LEFT_EYEBROW, RIGHT_EYEBROW } from "./face-landmarks";

interface LM2D { x: number; y: number }

function hexRgb(hex: string) {
  return {
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16),
  };
}

function pt(lm: LM2D[], i: number, W: number, H: number) {
  return { x: lm[i].x * W, y: lm[i].y * H };
}

export function drawLips(
  ctx: CanvasRenderingContext2D,
  lm: LM2D[],
  W: number, H: number,
  hex: string,
  opacity: number,
) {
  const { r, g, b } = hexRgb(hex);
  ctx.save();
  ctx.filter = "blur(0.5px)";
  ctx.globalCompositeOperation = "multiply";
  ctx.globalAlpha = opacity;
  ctx.fillStyle = `rgb(${r},${g},${b})`;
  ctx.beginPath();
  const start = pt(lm, LIPS_OUTER[0], W, H);
  ctx.moveTo(start.x, start.y);
  for (let i = 1; i < LIPS_OUTER.length; i++) {
    const p = pt(lm, LIPS_OUTER[i], W, H);
    ctx.lineTo(p.x, p.y);
  }
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

export function drawBlush(
  ctx: CanvasRenderingContext2D,
  lm: LM2D[],
  W: number, H: number,
  hex: string,
  opacity: number,
  size: number,
) {
  const { r, g, b } = hexRgb(hex);
  const drawCheek = (cx: number, cy: number) => {
    const rx = W * 0.09 * size, ry = H * 0.06 * size;
    const g2 = ctx.createRadialGradient(cx, cy, 0, cx, cy, rx);
    g2.addColorStop(0, `rgba(${r},${g},${b},${opacity * 0.55})`);
    g2.addColorStop(1, `rgba(${r},${g},${b},0)`);
    ctx.save();
    ctx.filter = "blur(3px)";
    ctx.globalCompositeOperation = "multiply";
    ctx.fillStyle = g2;
    ctx.beginPath();
    ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  const lo  = pt(lm, LM.leftEyeOuter,   W, H);
  const lm2 = pt(lm, LM.lipLeftCorner,  W, H);
  const ro  = pt(lm, LM.rightEyeOuter,  W, H);
  const rm  = pt(lm, LM.lipRightCorner, W, H);
  drawCheek(lo.x * 0.55 + lm2.x * 0.45, lo.y * 0.38 + lm2.y * 0.62);
  drawCheek(ro.x * 0.55 + rm.x  * 0.45, ro.y * 0.38 + rm.y  * 0.62);
}

export function drawEyeshadow(
  ctx: CanvasRenderingContext2D,
  lm: LM2D[],
  W: number, H: number,
  hex: string,
  opacity: number,
) {
  const { r, g, b } = hexRgb(hex);
  const drawEye = (innerI: number, outerI: number, topI: number, browI: number) => {
    const inner = pt(lm, innerI, W, H);
    const outer = pt(lm, outerI, W, H);
    const top   = pt(lm, topI,   W, H);
    const brow  = pt(lm, browI,  W, H);
    const cx  = (inner.x + outer.x) / 2;
    const rx  = Math.abs(outer.x - inner.x) / 2;
    const eyeH = Math.abs(top.y - brow.y);
    const shadowTop = brow.y + eyeH * 0.2;
    const shadowBot = top.y  + eyeH * 0.35;
    const cy = (shadowTop + shadowBot) / 2;
    const ry = Math.abs(shadowBot - shadowTop) / 2;
    const grad = ctx.createLinearGradient(cx, shadowTop, cx, shadowBot);
    grad.addColorStop(0, `rgba(${r},${g},${b},0)`);
    grad.addColorStop(1, `rgba(${r},${g},${b},${opacity * 0.65})`);
    ctx.save();
    ctx.filter = "blur(2px)";
    ctx.globalCompositeOperation = "multiply";
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.ellipse(cx, cy, rx * 0.88, ry, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };
  drawEye(LM.leftEyeInner,  LM.leftEyeOuter,  LM.leftEyeTop,  LM.leftBrow);
  drawEye(LM.rightEyeInner, LM.rightEyeOuter, LM.rightEyeTop, LM.rightBrow);
}

export function drawEyebrows(
  ctx: CanvasRenderingContext2D,
  lm: LM2D[],
  W: number, H: number,
  hex: string,
  opacity: number,
) {
  const { r, g, b } = hexRgb(hex);
  const drawBrow = (indices: number[]) => {
    ctx.save();
    ctx.filter = "blur(2px)";
    ctx.globalCompositeOperation = "multiply";
    ctx.globalAlpha = opacity;
    ctx.fillStyle = `rgb(${r},${g},${b})`;
    ctx.beginPath();
    const start = pt(lm, indices[0], W, H);
    ctx.moveTo(start.x, start.y);
    for (let i = 1; i < indices.length; i++) {
      const p = pt(lm, indices[i], W, H);
      ctx.lineTo(p.x, p.y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  };
  drawBrow(LEFT_EYEBROW);
  drawBrow(RIGHT_EYEBROW);
}
