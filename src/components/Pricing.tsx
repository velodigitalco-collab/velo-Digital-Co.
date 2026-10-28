import { useState } from 'react';
import { Check, Flame, Sliders } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PACKAGES, ADDONS, calculateProjectEstimate, formatINR } from '../utils/pricing';
import { CinematicReveal } from './CinematicReveal';

interface PricingProps {
  onSelectPackage: (packageValue: string) => void;
}

export function Pricing({ onSelectPackage }: PricingProps) {
  const [showCalculator, setShowCalculator] = useState(false);
  const [calcPackage, setCalcPackage] = useState('business');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  const handleSelect = (pkgOption: string) => {
    onSelectPackage(pkgOption);
    const enquiryEl = document.getElementById('enquiry');
    if (enquiryEl) {
      enquiryEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleAddon = (addonId: string) => {
    setSelectedAddons((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]
    );
  };

  const calcResult = calculateProjectEstimate(calcPackage, selectedAddons, 20);

  return (
    <section id="pricing" className="w-full max-w-full px-4 md:px-10 py-14 md:py-24 bg-[#0E0E0E] text-[#FFFEF9] relative overflow-hidden">
      {/* Background radial atmosphere */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] max-w-full bg-[#162C6D]/25 rounded-full blur-[130px] pointer-events-none transform-gpu"></div>
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] max-w-full bg-blue-500/10 rounded-full blur-[110px] pointer-events-none transform-gpu"></div>

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        {/* Header banner with IntersectionObserver */}
        <CinematicReveal direction="up" distancePx={30} durationMs={750} threshold={0.1}>
          <div className="w-full flex flex-wrap justify-between items-start gap-6 mb-12">
            <div>
              <div className="text-[10px] tracking-[0.2em] font-[700] uppercase text-blue-400 mb-2">
                TRANSPARENT CLIENT PRICING
              </div>
              <h2 className="text-[11vw] sm:text-[8vw] md:text-[6.5vw] leading-[0.85] tracking-[-0.05em] font-[800]">
                PRICING THAT WORKS.
              </h2>
            </div>

            <div className="bg-white/10 backdrop-blur-2xl border border-white/15 p-5 md:p-6 rounded-[22px] max-w-full md:max-w-[340px] w-full text-white shadow-xl">
              <p className="serif text-[16px] md:text-[18px] leading-[1.35] text-white/90">
                20% OFF for first 3 customers. Glass morphism + cinematic theme included.
              </p>
              <div className="mt-4 flex items-center justify-between">
                <div className="text-[10px] tracking-[0.16em] font-[800] text-amber-300 flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 fill-amber-300 text-amber-300 animate-bounce" />
                  <span>2 SLOTS LEFT</span>
                </div>
                <span className="text-[9px] opacity-60 tracking-wider font-mono">Q1 2026 COHORT</span>
              </div>
            </div>
          </div>
        </CinematicReveal>

        {/* 3 Main Pricing Cards with Staggered IntersectionObserver Fade-ins */}
        <div className="w-full max-w-full grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Starter */}
          <CinematicReveal direction="up" distancePx={35} delayMs={100} durationMs={750} threshold={0.1} className="h-full flex">
            <div className="w-full bg-white/[0.06] backdrop-blur-2xl border border-white/10 p-6 md:p-8 rounded-[22px] md:rounded-[28px] flex flex-col justify-between hover:border-white/25 transition-all shadow-xl hover:-translate-y-1.5 duration-300">
              <div>
                <div className="flex justify-between items-center text-[10px] tracking-[0.2em] text-white/50 font-[700]">
                  <span>STARTER / 01</span>
                  <span>3 - 5 DAYS</span>
                </div>

                <div className="mt-6 text-[36px] md:text-[44px] font-[800] tracking-[-0.03em] text-white">
                  ₹7,999
                </div>
                <p className="text-[12px] text-white/70 mt-1 font-medium">
                  Small businesses, personal brands &amp; portfolios
                </p>

                <div className="mt-6 pt-5 border-t border-white/10">
                  <ul className="space-y-3 text-[12px] text-white/80 leading-[1.45]">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Up to 3 Custom Pages</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Custom Logo + Glass UI Concept</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Mobile Responsive + Cinematic Theme</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Basic SEO • 30 Days Technical Support</span>
                    </li>
                  </ul>
                </div>
              </div>

              <motion.button
                whileTap={{ scale: 0.96 }}
                type="button"
                onClick={() => handleSelect('Starter - Rs 7,999')}
                className="mt-8 w-full border border-white/20 hover:border-white hover:bg-white hover:text-black py-3.5 text-center text-[11px] font-[700] tracking-wider rounded-full transition-all cursor-pointer"
              >
                CHOOSE STARTER
              </motion.button>
            </div>
          </CinematicReveal>

          {/* Card 2: Business (Most Popular) */}
          <CinematicReveal direction="up" distancePx={35} delayMs={200} durationMs={750} threshold={0.1} className="h-full flex">
            <div className="w-full bg-[#162C6D] backdrop-blur-2xl border border-white/20 p-6 md:p-8 rounded-[22px] md:rounded-[28px] flex flex-col justify-between shadow-[0_20px_60px_rgba(22,44,109,0.7)] scale-100 md:scale-[1.02] z-20 relative hover:-translate-y-2 transition-all duration-300">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="text-[10px] bg-white text-black px-4 py-1 rounded-full font-[800] tracking-wider shadow-md inline-block whitespace-nowrap">
                  MOST POPULAR / 02
                </span>
              </div>

              <div>
                <div className="flex justify-between items-center text-[10px] tracking-[0.2em] text-white/70 font-[700] pt-2">
                  <span>BUSINESS TIER</span>
                  <span>7 - 10 DAYS</span>
                </div>

                <div className="mt-6 text-[36px] md:text-[44px] font-[800] tracking-[-0.03em] text-white">
                  ₹14,999
                </div>
                <p className="text-[12px] text-white/85 mt-1 font-medium">
                  Growing brands, studios &amp; modern companies
                </p>

                <div className="mt-6 pt-5 border-t border-white/20">
                  <ul className="space-y-3 text-[12px] leading-[1.45] text-white">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                      <span>Up to 7 Pages • Brand Kit • Glass Theme</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                      <span>Advanced SEO + Google Analytics 4</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                      <span>Contact Forms • Cinematic Animations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                      <span>60 Days Priority Support &amp; Speed Setup</span>
                    </li>
                  </ul>
                </div>
              </div>

              <motion.button
                whileTap={{ scale: 0.96 }}
                type="button"
                onClick={() => handleSelect('Business - Rs 14,999')}
                className="mt-8 w-full bg-white hover:bg-slate-100 text-black py-4 text-center text-[11px] font-[800] tracking-[0.1em] rounded-full shadow-lg transition-transform hover:scale-[1.02] cursor-pointer"
              >
                CHOOSE BUSINESS —
              </motion.button>
            </div>
          </CinematicReveal>

          {/* Card 3: Premium */}
          <CinematicReveal direction="up" distancePx={35} delayMs={300} durationMs={750} threshold={0.1} className="h-full flex">
            <div className="w-full bg-white/[0.06] backdrop-blur-2xl border border-white/10 p-6 md:p-8 rounded-[22px] md:rounded-[28px] flex flex-col justify-between hover:border-white/25 transition-all shadow-xl hover:-translate-y-1.5 duration-300">
              <div>
                <div className="flex justify-between items-center text-[10px] tracking-[0.2em] text-white/50 font-[700]">
                  <span>PREMIUM / 03</span>
                  <span>14 - 20 DAYS</span>
                </div>

                <div className="mt-6 text-[36px] md:text-[44px] font-[800] tracking-[-0.03em] text-white">
                  ₹24,999+
                </div>
                <p className="text-[12px] text-white/70 mt-1 font-medium">
                  Established enterprises &amp; ecommerce leaders
                </p>

                <div className="mt-6 pt-5 border-t border-white/10">
                  <ul className="space-y-3 text-[12px] text-white/80 leading-[1.45]">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Up to 15+ Pages • Full Branding Identity</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Ecommerce / CMS Headless Ready</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Full Glass Morphism + Fluid GSAP Motion</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>90 Days Support + Continuous Maintenance</span>
                    </li>
                  </ul>
                </div>
              </div>

              <motion.button
                whileTap={{ scale: 0.96 }}
                type="button"
                onClick={() => handleSelect('Premium - Rs 24,999+')}
                className="mt-8 w-full border border-white/20 hover:border-white hover:bg-white hover:text-black py-3.5 text-center text-[11px] font-[700] tracking-wider rounded-full transition-all cursor-pointer"
              >
                CHOOSE PREMIUM
              </motion.button>
            </div>
          </CinematicReveal>
        </div>

        {/* Custom Cost Estimator Toggle */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col items-center">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            type="button"
            onClick={() => setShowCalculator(!showCalculator)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-[11px] font-[700] tracking-wider transition-colors cursor-pointer"
          >
            <Sliders className="w-3.5 h-3.5 text-blue-300" />
            <span>{showCalculator ? 'Hide Custom Add-on Estimator' : 'Customize with Add-ons & Calculator →'}</span>
          </motion.button>

          <AnimatePresence>
            {showCalculator && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -10 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="mt-6 w-full max-w-3xl overflow-hidden"
              >
                <div className="bg-white/[0.06] backdrop-blur-2xl border border-white/15 p-6 md:p-8 rounded-[24px] text-white">
                  <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-6">
                    <div>
                      <h3 className="text-[18px] font-[800]">Instant Investment Calculator</h3>
                      <p className="text-[11px] opacity-60">Pick your baseline and optional add-on capabilities</p>
                    </div>
                    <span className="text-[10px] tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full font-[700]">
                      20% DISCOUNT APPLIED
                    </span>
                  </div>

                  {/* Tier selector */}
                  <div className="grid grid-cols-3 gap-2 mb-6">
                    {PACKAGES.map((pkg) => (
                      <motion.button
                        key={pkg.id}
                        whileTap={{ scale: 0.96 }}
                        type="button"
                        onClick={() => setCalcPackage(pkg.id)}
                        className={`py-2.5 px-3 rounded-xl text-center text-[11px] font-[700] transition-all cursor-pointer ${
                          calcPackage === pkg.id
                            ? 'bg-[#162C6D] border border-white/30 text-white shadow-md'
                            : 'bg-white/5 border border-white/10 text-white/60 hover:text-white'
                        }`}
                      >
                        <div>{pkg.name}</div>
                        <div className="text-[10px] opacity-70 font-mono">₹{pkg.price.toLocaleString('en-IN')}</div>
                      </motion.button>
                    ))}
                  </div>

                  {/* Addons toggle */}
                  <div className="space-y-2 mb-6">
                    <div className="text-[10px] uppercase tracking-wider opacity-50 font-[700]">SELECT ADD-ONS:</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {ADDONS.map((addon) => {
                        const active = selectedAddons.includes(addon.id);
                        return (
                          <motion.div
                            key={addon.id}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => toggleAddon(addon.id)}
                            className={`p-3 rounded-xl border text-left cursor-pointer transition-all flex justify-between items-center ${
                              active
                                ? 'bg-blue-950/70 border-blue-400 text-white shadow-sm'
                                : 'bg-white/[0.03] border-white/10 text-white/70 hover:bg-white/[0.06]'
                            }`}
                          >
                            <div>
                              <div className="text-[12px] font-[700]">{addon.name}</div>
                              <div className="text-[10px] opacity-50">{addon.description}</div>
                            </div>
                            <span className="font-mono text-[11px] font-[700] ml-2 text-blue-300">
                              +{formatINR(addon.price)}
                            </span>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Summary Bar */}
                  <div className="bg-black/50 border border-white/10 rounded-2xl p-4 flex flex-wrap justify-between items-center gap-4">
                    <div>
                      <div className="text-[10px] opacity-50 font-mono">ESTIMATED INVESTMENT:</div>
                      <div className="flex items-baseline gap-2">
                        <motion.span
                          key={calcResult.total}
                          initial={{ scale: 1.1, color: '#6ee7b7' }}
                          animate={{ scale: 1, color: '#6ee7b7' }}
                          className="text-[26px] font-[800]"
                        >
                          {formatINR(calcResult.total)}
                        </motion.span>
                        <span className="text-[12px] line-through opacity-40">{formatINR(calcResult.subtotal)}</span>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      type="button"
                      onClick={() => {
                        const chosen = PACKAGES.find((p) => p.id === calcPackage);
                        handleSelect(chosen ? chosen.label : 'Business - Rs 14,999');
                      }}
                      className="btn-modern-light px-6 py-3 rounded-full text-[11px] font-[800] tracking-wider cursor-pointer"
                    >
                      LOCK THIS ESTIMATE →
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
