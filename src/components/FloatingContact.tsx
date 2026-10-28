import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, MessageCircle, ArrowUp } from 'lucide-react';

export function FloatingContact() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > 350) {
            setVisible(true);
          } else {
            setVisible(false);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 15, scale: 0.9 }}
          transition={{ type: 'spring', damping: 22, stiffness: 280 }}
          className="fixed bottom-5 right-4 sm:right-6 z-40 flex items-center gap-2 transform-gpu"
          role="region"
          aria-label="Quick contact controls"
        >
          {/* Scroll to Top */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-[#0E0E0E] shadow-lg border border-black/10 hover:bg-white cursor-pointer transition-colors"
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>

          {/* Quick WhatsApp Pill */}
          <motion.a
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.94 }}
            href="https://wa.me/917020674916?text=Hello%20team%20velo%20digital%20!!%20%2C%20I%20intrested%20in%20work%20with%20you"
            target="_blank"
            rel="noreferrer"
            aria-label="Chat on WhatsApp with VeloDigital studio"
            className="flex items-center gap-2 bg-[#0E0E0E] text-white px-3.5 py-2.5 rounded-full text-[11px] font-[700] tracking-wider shadow-xl hover:bg-[#162C6D] transition-colors border border-white/10"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span className="hidden sm:inline">WhatsApp Us</span>
            <span className="sm:hidden">WhatsApp</span>
          </motion.a>

          {/* Quick Call */}
          <motion.a
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            href="tel:+917020674916"
            aria-label="Direct call to +91 7020674916"
            className="w-10 h-10 rounded-full bg-[#162C6D] text-white flex items-center justify-center shadow-lg hover:bg-blue-800 transition-colors"
          >
            <Phone className="w-4 h-4" />
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
