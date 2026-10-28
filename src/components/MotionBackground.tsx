import { useEffect, useState } from 'react';
import { motion, useSpring } from 'motion/react';

export function MotionBackground() {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Mouse spring coordinates for interactive ambient glow (desktop only)
  const springConfig = { damping: 30, stiffness: 120 };
  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);

  useEffect(() => {
    // Detect touch / mobile devices for battery and performance optimization
    const touchCheck =
      'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth < 768;
    setIsTouchDevice(touchCheck);

    if (!touchCheck) {
      const handleMouseMove = (e: MouseEvent) => {
        // Center-relative coordinates
        const x = e.clientX - window.innerWidth / 2;
        const y = e.clientY - window.innerHeight / 2;
        mouseX.set(x * 0.04);
        mouseY.set(y * 0.04);
      };

      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Dynamic Grid Background with CSS mask */}
      <div className="bg-grid-theme absolute inset-0 w-full opacity-60"></div>

      {/* Floating Orb 1: Deep Navy/Cobalt */}
      <motion.div
        className="absolute top-[8%] left-[6%] w-[320px] md:w-[460px] h-[320px] md:h-[460px] rounded-full bg-[#162C6D]/16 blur-[90px] md:blur-[120px]"
        style={{
          x: isTouchDevice ? 0 : mouseX,
          y: isTouchDevice ? 0 : mouseY,
        }}
        animate={{
          scale: [1, 1.08, 0.95, 1],
          opacity: [0.14, 0.22, 0.16, 0.14],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Floating Orb 2: Warm Amber Accent */}
      <motion.div
        className="absolute bottom-[15%] right-[6%] w-[280px] md:w-[420px] h-[280px] md:h-[420px] rounded-full bg-[#FFD600]/10 blur-[80px] md:blur-[110px]"
        style={{
          x: isTouchDevice ? 0 : mouseX,
          y: isTouchDevice ? 0 : mouseY,
        }}
        animate={{
          scale: [0.95, 1.06, 0.98, 0.95],
          opacity: [0.08, 0.15, 0.09, 0.08],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />

      {/* Floating Orb 3: Center Mid Azure Aura */}
      <motion.div
        className="absolute top-[48%] left-[42%] -translate-x-1/2 -translate-y-1/2 w-[340px] md:w-[500px] h-[340px] md:h-[500px] rounded-full bg-blue-600/6 blur-[100px]"
        animate={{
          x: [-20, 20, -20],
          y: [-15, 15, -15],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
}
