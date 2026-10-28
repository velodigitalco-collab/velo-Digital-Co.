import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface CinematicRevealProps {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
  durationMs?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distancePx?: number;
  threshold?: number;
  rootMargin?: string;
  as?: keyof React.JSX.IntrinsicElements;
}

/**
 * 60 FPS hardware-accelerated cinematic reveal element.
 * Powered by native IntersectionObserver and CSS transform3d,
 * guaranteeing smooth compositor-thread execution across mobile, tablet, and desktop.
 */
export function CinematicReveal({
  children,
  className = '',
  delayMs = 0,
  durationMs = 700,
  direction = 'up',
  distancePx = 32,
  threshold = 0.12,
  rootMargin = '0px 0px -50px 0px',
  as: Component = 'div',
}: CinematicRevealProps) {
  const { ref, isVisible } = useIntersectionObserver<HTMLDivElement>({
    threshold,
    rootMargin,
    triggerOnce: true,
  });

  // Calculate transform offsets based on direction
  let initialTransform = 'translate3d(0, 0, 0)';
  if (direction === 'up') {
    initialTransform = `translate3d(0, ${distancePx}px, 0)`;
  } else if (direction === 'down') {
    initialTransform = `translate3d(0, -${distancePx}px, 0)`;
  } else if (direction === 'left') {
    initialTransform = `translate3d(${distancePx}px, 0, 0)`;
  } else if (direction === 'right') {
    initialTransform = `translate3d(-${distancePx}px, 0, 0)`;
  }

  const Tag = Component as any;

  return (
    <Tag
      ref={ref}
      className={`cinematic-fade-node ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate3d(0, 0, 0)' : initialTransform,
        transitionProperty: 'opacity, transform',
        transitionDuration: `${durationMs}ms`,
        transitionDelay: `${delayMs}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: isVisible ? 'auto' : 'transform, opacity',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
      }}
    >
      {children}
    </Tag>
  );
}
