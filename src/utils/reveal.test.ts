import test from 'node:test';
import assert from 'node:assert/strict';
import { computeInitialTransform, computeRevealStyles } from './reveal';

test('computeInitialTransform calculates 3D hardware-accelerated offsets', () => {
  assert.equal(computeInitialTransform('up', 40), 'translate3d(0, 40px, 0)');
  assert.equal(computeInitialTransform('down', 25), 'translate3d(0, -25px, 0)');
  assert.equal(computeInitialTransform('left', 30), 'translate3d(30px, 0, 0)');
  assert.equal(computeInitialTransform('right', 30), 'translate3d(-30px, 0, 0)');
  assert.equal(computeInitialTransform('none', 30), 'translate3d(0, 0, 0)');
});

test('computeRevealStyles returns hidden state when isVisible is false', () => {
  const styles = computeRevealStyles(false, 'up', 32, 100, 600);
  assert.equal(styles.opacity, 0);
  assert.equal(styles.transform, 'translate3d(0, 32px, 0)');
  assert.equal(styles.willChange, 'transform, opacity');
  assert.ok(styles.transition.includes('600ms'));
  assert.ok(styles.transition.includes('100ms'));
});

test('computeRevealStyles returns visible state when isVisible is true', () => {
  const styles = computeRevealStyles(true, 'up', 32, 0, 700);
  assert.equal(styles.opacity, 1);
  assert.equal(styles.transform, 'translate3d(0, 0, 0)');
  assert.equal(styles.willChange, 'auto');
});
