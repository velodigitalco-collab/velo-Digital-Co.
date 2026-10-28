import React, { useState, useRef } from 'react';
import { Phone, ArrowUpRight, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { calculatePerspectiveTilt, FADE_UP_VARIANTS } from '../utils/motion';

interface HeroProps {
  onSelectPackage?: (pkgId: string) => void;
}

export function Hero({ onSelectPackage }: HeroProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50, opacity: 0 });

  // Spring values for 3D card tilt
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const smoothTiltX = useSpring(tiltX, { stiffness: 220, damping: 20 });
  const smoothTiltY = useSpring(tiltY, { stiffness: 220, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const { rotateX, rotateY } = calculatePerspectiveTilt(rect, e.clientX, e.clientY, 5);

    tiltX.set(rotateX);
    tiltY.set(rotateY);

    const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
    const yPercent = ((e.clientY - rect.top) / rect.height) * 100;
    setGlarePosition({ x: xPercent, y: yPercent, opacity: 0.15 });
  };

  const handleMouseLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
    setGlarePosition((prev) => ({ ...prev, opacity: 0 }));
  };

  const scrollToEnquiry = () => {
    const el = document.getElementById('enquiry');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="pt-[64px] md:pt-[76px] w-full max-w-full relative overflow-hidden">
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-10 py-8 md:py-16">
        {/* Main title lockup with staggered entrance motion */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.12 },
            },
          }}
          className="w-full max-w-full"
        >
          <motion.div
            variants={FADE_UP_VARIANTS}
            custom={0}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card text-[10px] font-[700] tracking-[0.14em] uppercase text-[#162C6D] mb-5 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#162C6D] animate-spin" style={{ animationDuration: '6s' }} />
            <span>GLASSMORPHIC WEB STUDIO • BUILT TO SELL</span>
          </motion.div>

          <motion.h1
            variants={FADE_UP_VARIANTS}
            custom={1}
            className="w-full text-3d-matte text-[11vw] sm:text-[9vw] md:text-[6.8vw] leading-[0.88] tracking-[-0.05em] font-[700]"
          >
            Track the journey,
          </motion.h1>

          <motion.h1
            variants={FADE_UP_VARIANTS}
            custom={2}
            className="w-full text-silver-matte text-[11vw] sm:text-[9vw] md:text-[6.8vw] leading-[0.88] tracking-[-0.05em] font-[800]"
          >
            not just the days.
          </motion.h1>

          <motion.p
            variants={FADE_UP_VARIANTS}
            custom={3}
            className="mt-5 w-full max-w-[95%] md:max-w-[540px] text-[16px] md:text-[20px] leading-[1.45] tracking-[-0.01em] opacity-75 serif text-[#0E0E0E]"
          >
            We build premium glassmorphic websites that sell while you sleep. No templates. Just results.
          </motion.p>
        </motion.div>

        {/* Feature Grid with 3D Depth Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 md:mt-14 w-full max-w-full grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch"
        >
          {/* Main depth card with interactive tilt and dynamic sheen */}
          <div className="md:col-span-7 w-full max-w-full perspective-[1200px]">
            <motion.div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                rotateX: smoothTiltX,
                rotateY: smoothTiltY,
                transformStyle: 'preserve-3d',
              }}
              className="w-full h-full premium-depth-card p-6 md:p-10 rounded-[24px] md:rounded-[32px] relative overflow-hidden flex flex-col justify-between transition-shadow duration-300"
            >
              {/* Dynamic Glare Sheen that moves with mouse */}
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                style={{
                  background: `radial-gradient(550px circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,${glarePosition.opacity}), transparent 55%)`,
                }}
              />

              <div className="relative z-10 w-full">
                <div className="flex items-center justify-between">
                  <div className="text-[10px] tracking-[0.18em] text-white/50 font-[700] uppercase">
                    ACCOUNTABILITY, REDEFINED. — VELODIGITAL.CO
                  </div>
                  <span className="hidden sm:inline-flex items-center gap-1.5 text-[9px] font-[700] tracking-wider text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                    <ShieldCheck className="w-3 h-3" /> VERIFIED STUDIO
                  </span>
                </div>

                <h3 className="mt-5 w-full text-[26px] sm:text-[32px] md:text-[38px] leading-[0.95] tracking-[-0.03em] font-[700] text-card-silver-matte">
                  Premium sites that convert visitors into customers.
                </h3>

                <p className="mt-4 w-full text-[13px] md:text-[15px] leading-[1.6] text-white/65">
                  VELODIGITAL.CO builds structured accountability, precise tracking, and beautiful timelines. Work:
                  <strong className="text-white/90 font-medium"> Known Strangers</strong>,{' '}
                  <strong className="text-white/90 font-medium">Designer Monk</strong>,{' '}
                  <strong className="text-white/90 font-medium">ClutchGG</strong>.
                </p>

                {/* Value metrics list */}
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 text-[11px] text-white/80 border-t border-white/10 pt-5">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-300 shrink-0" />
                    <span>Sub-second Speed</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-300 shrink-0" />
                    <span>Custom Glass UI</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-300 shrink-0" />
                    <span>IT Act Compliant</span>
                  </div>
                </div>
              </div>

              <div className="relative z-10 mt-8 flex flex-wrap items-center gap-3 w-full">
                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  type="button"
                  onClick={scrollToEnquiry}
                  className="btn-modern-light px-7 py-3.5 rounded-full text-[11px] font-[800] tracking-[0.08em] flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <span>START PROJECT</span>
                  <span>—</span>
                </motion.button>
                <motion.a
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  href="tel:+917020674916"
                  className="btn-modern-dark px-6 py-3.5 rounded-full text-[11px] font-[700] tracking-[0.08em] flex items-center gap-2 shadow-md"
                >
                  <Phone className="w-3.5 h-3.5 text-white/70" />
                  <span>CONTACT US</span>
                </motion.a>
              </div>
            </motion.div>
          </div>

          {/* Right stat cards */}
          <div className="md:col-span-5 w-full max-w-full flex flex-col justify-between gap-3.5">
            {/* Quick stats pill card with micro-hover motion */}
            <motion.div
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              className="w-full glass-card p-4 md:p-5 rounded-[18px] md:rounded-[22px] flex justify-between items-center text-[11px] font-[700] tracking-[0.14em] text-[#0E0E0E]/80 shadow-sm"
            >
              <div className="flex flex-col">
                <span className="text-[9px] opacity-40 font-mono">LOCATION</span>
                <span className="font-[800]">BASE: INDIA</span>
              </div>
              <div className="h-6 w-px bg-black/10"></div>
              <div className="flex flex-col">
                <span className="text-[9px] opacity-40 font-mono">FOUNDED</span>
                <span className="font-[800]">EST: 2023</span>
              </div>
              <div className="h-6 w-px bg-black/10"></div>
              <div className="flex flex-col">
                <span className="text-[9px] opacity-40 font-mono">PORTFOLIO</span>
                <span className="font-[800] text-[#162C6D]">03 PROJECTS</span>
              </div>
            </motion.div>

            {/* Direct contact card */}
            <motion.div
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              className="w-full glass-card p-5 rounded-[18px] md:rounded-[22px] shadow-sm"
            >
              <div className="flex justify-between items-center">
                <div className="text-[10px] tracking-[0.18em] opacity-50 font-[700] uppercase">
                  DIRECT CHANNELS • EMAIL &amp; PHONE
                </div>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              </div>
              <div className="mt-3 flex flex-col gap-1">
                <a
                  href="mailto:velodigital.co@gmail.com"
                  className="text-[13px] md:text-[14px] font-[600] break-all leading-[1.3] hover:text-[#162C6D] transition-colors flex items-center justify-between group"
                >
                  <span>velodigital.co@gmail.com</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <a
                  href="tel:+917020674916"
                  className="text-[14px] md:text-[15px] font-[700] hover:text-[#162C6D] transition-colors flex items-center justify-between group"
                >
                  <span>+91 7020674916</span>
                  <span className="text-[10px] opacity-50 font-normal">Direct Call / WhatsApp</span>
                </a>
              </div>
            </motion.div>

            {/* Pricing teaser badge with pulse glow */}
            <motion.div
              whileHover={{ scale: 1.02, y: -3 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectPackage?.('business')}
              className="w-full glass-card p-5 md:p-6 rounded-[18px] md:rounded-[22px] bg-[#162C6D] text-white border-[#162C6D] cursor-pointer shadow-[0_20px_50px_rgba(22,44,109,0.4)] hover:shadow-[0_28px_65px_rgba(22,44,109,0.6)] transition-all group relative overflow-hidden"
            >
              <div className="absolute right-0 top-0 bottom-0 w-28 bg-gradient-to-l from-white/10 to-transparent pointer-events-none"></div>
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-[22px] md:text-[28px] font-[800] tracking-[-0.03em] leading-tight text-white">
                    ₹7,999 — ₹24,999+
                  </div>
                  <div className="text-[11px] opacity-85 mt-1.5 tracking-[0.06em] flex items-center gap-1.5">
                    <span className="inline-block w-2 h-2 bg-amber-400 rounded-full animate-ping"></span>
                    <span>20% OFF LIVE • 2 SLOTS LEFT • GLASS EDITION</span>
                  </div>
                </div>
                <span className="p-2 bg-white/10 rounded-full group-hover:bg-white group-hover:text-[#162C6D] transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
