import { motion, useScroll, useSpring } from 'motion/react';

interface NavbarProps {
  onOpenRules: () => void;
}

export function Navbar({ onOpenRules }: NavbarProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 w-full max-w-full z-50 glass flex justify-between items-center px-4 md:px-8 h-[44px] md:h-[48px] transition-all"
    >
      <div className="flex items-center gap-2 shrink-0">
        <a href="#" className="flex items-center gap-2 group" aria-label="VeloDigital Home">
          <div className="relative flex items-center justify-center">
            <div className="w-[14px] h-[14px] md:w-[16px] md:h-[16px] bg-[#162C6D] rounded-full shadow-[0_0_20px_rgba(22,44,109,0.5)] group-hover:scale-110 transition-transform"></div>
            <span className="absolute w-[22px] h-[22px] rounded-full border border-[#162C6D]/40 animate-ping pointer-events-none"></span>
          </div>
          <span className="font-[800] text-[11px] md:text-[13px] tracking-[-0.03em] whitespace-nowrap text-[#0E0E0E]">
            VELODIGITAL<span className="text-[#162C6D]">.</span>CO
          </span>
        </a>
      </div>

      <div className="hidden sm:flex items-center gap-6 text-[10px] md:text-[11px] font-[700] tracking-[0.1em] text-[#0E0E0E]/70">
        <a href="#work" className="hover:text-[#162C6D] transition-colors relative py-1">
          WORK
        </a>
        <a href="#pricing" className="hover:text-[#162C6D] transition-colors relative py-1">
          PRICING
        </a>
        <button
          type="button"
          onClick={onOpenRules}
          className="hover:text-[#162C6D] transition-colors cursor-pointer flex items-center gap-1.5 py-1"
        >
          <span>LEGAL &amp; IT ACT</span>
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
          </span>
        </button>
      </div>

      <div className="flex items-center gap-2">
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="tel:+917020674916"
          className="shrink-0 bg-[#0E0E0E] text-white px-3 md:px-4 py-1.5 text-[8px] md:text-[9px] font-[700] tracking-[0.08em] rounded-full whitespace-nowrap hover:bg-[#162C6D] transition-colors shadow-sm"
          title="Direct phone line: +91 7020674916"
        >
          CONTACT US —
        </motion.a>
      </div>

      {/* Smooth Spring Scroll Progress Bar */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#162C6D] origin-left"
        style={{ scaleX }}
      />
    </motion.nav>
  );
}
