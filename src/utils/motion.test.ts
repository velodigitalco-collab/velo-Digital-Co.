import test from 'node:test';
import assert from 'node:assert/strict';
import { calculatePerspectiveTilt, FADE_UP_VARIANTS } from './motion';

test('calculatePerspectiveTilt returns 0 at exact center', () => {
  const rect = { left: 100, top: 100, width: 400, height: 200 };
  const clientX = 300; // center X
  const clientY = 200; // center Y

  const { rotateX, rotateY } = calculatePerspectiveTilt(rect, clientX, clientY, 6);
  assert.equal(Math.round(rotateX), 0);
  assert.equal(Math.round(rotateY), 0);
});

test('calculatePerspectiveTilt clamps within maxDegrees at boundaries', () => {
  const rect = { left: 0, top: 0, width: 500, height: 500 };

  // Pointer far to the right and bottom
  const { rotateX, rotateY } = calculatePerspectiveTilt(rect, 2000, 2000, 8);
  assert.equal(rotateY, 8);
  assert.equal(rotateX, -8);

  // Pointer far to the top-left
  const resTopLeft = calculatePerspectiveTilt(rect, -1000, -1000, 8);
  assert.equal(resTopLeft.rotateY, -8);
  assert.equal(resTopLeft.rotateX, 8);
});

test('calculatePerspectiveTilt handles zero dimension gracefully', () => {
  const rect = { left: 0, top: 0, width: 0, height: 0 };
  const res = calculatePerspectiveTilt(rect, 100, 100, 6);
  assert.equal(res.rotateX, 0);
  assert.equal(res.rotateY, 0);
});

test('FADE_UP_VARIANTS provides incremental delay for staggered children', () => {
  const visibleFn = FADE_UP_VARIANTS.visible as (c?: number) => { opacity: number; y: number; transition: { delay: number } };
  const child0 = visibleFn(0);
  const child2 = visibleFn(2);

  assert.equal(child0.transition.delay, 0);
  assert.equal(child2.transition.delay, 0.24);
  assert.equal(child0.opacity, 1);
  assert.equal(child0.y, 0);
});
