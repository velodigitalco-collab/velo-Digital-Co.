/**
 * Helpers for 60 FPS hardware accelerated transforms and transitions
 */

export type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'none';

export function computeInitialTransform(direction: RevealDirection, distancePx: number): string {
  switch (direction) {
    case 'up':
      return `translate3d(0, ${distancePx}px, 0)`;
    case 'down':
      return `translate3d(0, -${distancePx}px, 0)`;
    case 'left':
      return `translate3d(${distancePx}px, 0, 0)`;
    case 'right':
      return `translate3d(-${distancePx}px, 0, 0)`;
    case 'none':
    default:
      return 'translate3d(0, 0, 0)';
  }
}

export function computeRevealStyles(
  isVisible: boolean,
  direction: RevealDirection = 'up',
  distancePx = 30,
  delayMs = 0,
  durationMs = 700
): {
  opacity: number;
  transform: string;
  transition: string;
  willChange: string;
} {
  const initial = computeInitialTransform(direction, distancePx);

  return {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translate3d(0, 0, 0)' : initial,
    transition: `opacity ${durationMs}ms cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms, transform ${durationMs}ms cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms`,
    willChange: isVisible ? 'auto' : 'transform, opacity',
  };
}
