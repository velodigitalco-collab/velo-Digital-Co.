/**
 * Universal motion configurations and helper utilities
 * Designed for 60-120fps hardware-accelerated fluid motion
 * with full fallback and device compatibility.
 */

import type { Variants } from 'motion/react';

export const TRANSITION_SPRING = {
  type: 'spring',
  stiffness: 260,
  damping: 25,
} as const;

export const LUXURY_EASE = [0.16, 1, 0.3, 1] as const;

export const TRANSITION_SMOOTH = {
  duration: 0.7,
  ease: LUXURY_EASE,
};

export const FADE_UP_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      delay: custom * 0.12,
      ease: LUXURY_EASE,
    },
  }),
};

export const CARD_HOVER_MOTION = {
  rest: { y: 0, scale: 1, transition: { duration: 0.3, ease: 'easeOut' } },
  hover: { y: -6, scale: 1.01, transition: { duration: 0.3, ease: 'easeOut' } },
  tap: { scale: 0.98, transition: { duration: 0.15 } },
};

/**
 * Calculates a subtle, bounded 3D perspective tilt from mouse coordinates.
 * Clamped strictly to maxDegrees to prevent awkward distortions on any device.
 */
export function calculatePerspectiveTilt(
  rect: { left: number; top: number; width: number; height: number },
  clientX: number,
  clientY: number,
  maxDegrees = 6
): { rotateX: number; rotateY: number } {
  if (rect.width <= 0 || rect.height <= 0) {
    return { rotateX: 0, rotateY: 0 };
  }

  const x = clientX - rect.left;
  const y = clientY - rect.top;

  const normalizedX = (x / rect.width) * 2 - 1; // -1 to 1
  const normalizedY = (y / rect.height) * 2 - 1; // -1 to 1

  const rawRotateY = Math.max(-maxDegrees, Math.min(maxDegrees, normalizedX * maxDegrees));
  const rawRotateX = Math.max(-maxDegrees, Math.min(maxDegrees, -normalizedY * maxDegrees));

  const rotateX = Math.abs(rawRotateX) < 1e-6 ? 0 : rawRotateX;
  const rotateY = Math.abs(rawRotateY) < 1e-6 ? 0 : rawRotateY;

  return { rotateX, rotateY };
}
