import { useState, useEffect } from 'react';
import { Loader } from './components/Loader';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { SelectedWork } from './components/SelectedWork';
import { Pricing } from './components/Pricing';
import { EnquirySection } from './components/EnquirySection';
import { RulesModal } from './components/RulesModal';
import { MotionBackground } from './components/MotionBackground';
import { FloatingContact } from './components/FloatingContact';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [rulesOpen, setRulesOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState('Business - Rs 14,999');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Check ?autostart=1 in URL to skip intro immediately (supports Ultra mode / headless testing)
  const isAutostart =
    typeof window !== 'undefined' &&
    new URLSearchParams(window.location.search).get('autostart') === '1';

  useEffect(() => {
    if (isAutostart) {
      setLoading(false);
    }
  }, [isAutostart]);

  return (
    <div className="min-h-screen bg-[#FFFEF9] text-[#0E0E0E] relative overflow-x-hidden selection:bg-[#162C6D] selection:text-white">
      {/* Film grain subtle texture overlay */}
      <div className="film-grain"></div>

      {/* Hardware-Accelerated Ambient Motion Graphics (Touch & Desktop Compatible) */}
      <MotionBackground />

      {/* Cinematic Brand Intro Loader */}
      {loading && (
        <Loader
          onComplete={() => setLoading(false)}
          autostart={isAutostart}
        />
      )}

      {/* Main Studio Web Content */}
      <div className={`relative z-10 ${loading ? 'opacity-0' : 'opacity-100 transition-opacity duration-700'}`}>
        <Navbar onOpenRules={() => setRulesOpen(true)} />

        <main>
          <Hero
            onSelectPackage={(pkg) =>
              setSelectedPackage(
                pkg === 'starter'
                  ? 'Starter - Rs 7,999'
                  : pkg === 'premium'
                  ? 'Premium - Rs 24,999+'
                  : 'Business - Rs 14,999'
              )
            }
          />
          <Marquee />
          <SelectedWork />
          <Pricing onSelectPackage={(pkgVal) => setSelectedPackage(pkgVal)} />
          <EnquirySection
            selectedPackage={selectedPackage}
            onSelectPackage={setSelectedPackage}
            agreedToTerms={agreedToTerms}
            setAgreedToTerms={setAgreedToTerms}
            onOpenRules={() => setRulesOpen(true)}
          />
        </main>
      </div>

      {/* Universal Floating Speed Dial for Quick Contact (appears on scroll) */}
      <FloatingContact />

      {/* Dedicated Rules & Regulations IT Act 2000 Modal */}
      <RulesModal
        isOpen={rulesOpen}
        onClose={() => setRulesOpen(false)}
        onAccept={() => setAgreedToTerms(true)}
      />
    </div>
  );
}
