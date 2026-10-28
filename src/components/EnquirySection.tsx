import React, { useState } from 'react';
import { Phone, MessageSquare, CheckCircle2, Copy } from 'lucide-react';
import { generateWhatsAppUrl, validateEnquiryForm } from '../utils/pricing';
import { CinematicReveal } from './CinematicReveal';

interface EnquirySectionProps {
  selectedPackage: string;
  onSelectPackage: (pkg: string) => void;
  agreedToTerms: boolean;
  setAgreedToTerms: (agreed: boolean) => void;
  onOpenRules: () => void;
}

export function EnquirySection({
  selectedPackage,
  onSelectPackage,
  agreedToTerms,
  setAgreedToTerms,
  onOpenRules,
}: EnquirySectionProps) {
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateEnquiryForm({
      name,
      whatsapp,
      package: selectedPackage,
      message,
      agreedToTerms,
    });

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setSubmitted(true);
  };

  const dynamicWhatsAppLink = generateWhatsAppUrl({
    name,
    whatsapp,
    packageName: selectedPackage,
    message,
  });

  const handleCopySummary = () => {
    const summary = `VeloDigital Project Enquiry\nName: ${name}\nWhatsApp: ${whatsapp}\nPackage: ${selectedPackage}\nDetails: ${message || 'Standard package requested'}`;
    navigator.clipboard?.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="enquiry" className="w-full max-w-full px-4 md:px-10 py-12 md:py-24 relative overflow-hidden">
      {/* Ambient background bloom with GPU acceleration */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] max-w-full bg-[#162C6D]/12 rounded-full blur-[110px] pointer-events-none transform-gpu"></div>

      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
        {/* Left Column: Brand Statement & Contact Details with IntersectionObserver */}
        <CinematicReveal
          direction="up"
          distancePx={30}
          durationMs={750}
          threshold={0.1}
          className="md:col-span-7 w-full max-w-full flex flex-col justify-between"
        >
          <div>
            <h2 className="w-full text-[12vw] md:text-[6.5vw] leading-[0.88] tracking-[-0.04em] font-[800] text-[#0E0E0E]">
              LET&apos;S MAKE<br />
              <span className="serif italic font-[400]">you famous.</span>
            </h2>

            <div className="mt-8 w-full flex flex-wrap gap-8 text-[11px] font-[700] tracking-[0.08em]">
              <div className="min-w-0">
                <div className="opacity-40 uppercase text-[10px]">EMAIL</div>
                <a
                  href="mailto:velodigital.co@gmail.com"
                  className="mt-1.5 text-[14px] lowercase break-all leading-[1.3] block hover:text-[#162C6D] transition-colors"
                >
                  velodigital.co@gmail.com
                </a>
              </div>
              <div>
                <div className="opacity-40 uppercase text-[10px]">PHONE</div>
                <a
                  href="tel:+917020674916"
                  className="mt-1.5 text-[14px] block hover:text-[#162C6D] transition-colors font-[700]"
                >
                  +91 7020674916
                </a>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={onOpenRules}
                className="inline-flex items-center gap-1.5 glass-card px-4 py-2.5 rounded-full text-[10px] font-[700] tracking-[0.08em] hover:bg-white transition-all cursor-pointer shadow-sm text-[#0E0E0E]"
              >
                <span>📜 RULES &amp; REGULATIONS — IT ACT 2000</span>
              </button>
            </div>
          </div>

          <div className="mt-8">
            <div className="w-full glass-card p-5 rounded-[20px] max-w-full md:max-w-[400px] flex items-center gap-4">
              <div className="w-11 h-11 bg-[#162C6D] rounded-full shrink-0 shadow-[0_0_15px_rgba(22,44,109,0.4)] flex items-center justify-center text-white font-[800] text-[13px]">
                VD
              </div>
              <div className="min-w-0">
                <div className="font-[800] text-[15px] text-[#0E0E0E]">VELODIGITAL.CO</div>
                <div className="text-[10px] opacity-50 tracking-[0.12em] uppercase truncate font-mono">
                  PREMIUM WEB STUDIO • GLASS EDITION
                </div>
              </div>
            </div>
          </div>
        </CinematicReveal>

        {/* Right Column: 2-Minute Project Form with IntersectionObserver */}
        <CinematicReveal
          direction="up"
          distancePx={35}
          delayMs={140}
          durationMs={750}
          threshold={0.1}
          className="md:col-span-5 w-full max-w-full"
        >
          <div className="w-full glass-card p-5 md:p-8 rounded-[22px] md:rounded-[32px] shadow-xl">
            <div className="flex justify-between items-center mb-5 w-full">
              <div className="text-[11px] tracking-[0.18em] font-[800] uppercase text-[#0E0E0E]">
                START A PROJECT — 2 MIN FORM
              </div>
              <span className="text-[9px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-[700]">
                2 SLOTS LEFT
              </span>
            </div>

            {!submitted ? (
              <form
                action="https://formsubmit.co/velodigital.co@gmail.com"
                method="POST"
                onSubmit={handleSubmit}
                className="space-y-4 w-full max-w-full"
              >
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_subject" value="New Enquiry - VeloDigital.co - Premium" />
                <input type="hidden" name="_template" value="table" />
                <input
                  type="hidden"
                  name="_autoresponse"
                  value="Thanks for contacting VeloDigital.co! We will contact you soon on 7020674916"
                />

                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="sr-only">
                    Your Name *
                  </label>
                  <input
                    name="name"
                    id="name"
                    required
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                    }}
                    placeholder="Your Name *"
                    className={`w-full max-w-full border-b py-3 bg-transparent text-[13px] outline-none transition-colors ${
                      errors.name ? 'border-red-500 text-red-900' : 'border-black/15 focus:border-[#162C6D]'
                    }`}
                  />
                  {errors.name && <p className="text-red-500 text-[10px] mt-1 font-medium">{errors.name}</p>}
                </div>

                {/* WhatsApp Field */}
                <div>
                  <label htmlFor="phone" className="sr-only">
                    WhatsApp Number *
                  </label>
                  <input
                    name="whatsapp"
                    id="phone"
                    required
                    type="tel"
                    value={whatsapp}
                    onChange={(e) => {
                      setWhatsapp(e.target.value);
                      if (errors.whatsapp) setErrors((prev) => ({ ...prev, whatsapp: '' }));
                    }}
                    placeholder="WhatsApp Number *"
                    className={`w-full max-w-full border-b py-3 bg-transparent text-[13px] outline-none transition-colors ${
                      errors.whatsapp ? 'border-red-500 text-red-900' : 'border-black/15 focus:border-[#162C6D]'
                    }`}
                  />
                  {errors.whatsapp && <p className="text-red-500 text-[10px] mt-1 font-medium">{errors.whatsapp}</p>}
                </div>

                {/* Package Select */}
                <div>
                  <label htmlFor="pkg" className="sr-only">
                    Select Package *
                  </label>
                  <select
                    name="package"
                    id="pkg"
                    required
                    value={selectedPackage}
                    onChange={(e) => {
                      onSelectPackage(e.target.value);
                      if (errors.package) setErrors((prev) => ({ ...prev, package: '' }));
                    }}
                    className={`w-full max-w-full border-b py-3 bg-transparent text-[13px] outline-none transition-colors ${
                      errors.package ? 'border-red-500' : 'border-black/15 focus:border-[#162C6D]'
                    }`}
                  >
                    <option value="">Select Package *</option>
                    <option value="Starter - Rs 7,999">Starter - Rs 7,999</option>
                    <option value="Business - Rs 14,999">Business - Rs 14,999 (Most Popular)</option>
                    <option value="Premium - Rs 24,999+">Premium - Rs 24,999+</option>
                  </select>
                  {errors.package && <p className="text-red-500 text-[10px] mt-1 font-medium">{errors.package}</p>}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="msg" className="sr-only">
                    Tell us about your project...
                  </label>
                  <textarea
                    name="message"
                    id="msg"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your project..."
                    className="w-full max-w-full border-b border-black/15 py-3 bg-transparent text-[13px] h-[75px] outline-none resize-none focus:border-[#162C6D]"
                  />
                </div>

                {/* Terms Checkbox */}
                <div className="pt-2">
                  <div className="flex gap-2.5 items-start">
                    <input
                      type="checkbox"
                      id="terms"
                      required
                      checked={agreedToTerms}
                      onChange={(e) => {
                        setAgreedToTerms(e.target.checked);
                        if (errors.agreedToTerms) setErrors((prev) => ({ ...prev, agreedToTerms: '' }));
                      }}
                      className="mt-1 w-[15px] h-[15px] accent-[#162C6D] shrink-0 cursor-pointer"
                    />
                    <label htmlFor="terms" className="text-[10px] leading-[1.45] opacity-75 cursor-pointer">
                      I agree to all{' '}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          onOpenRules();
                        }}
                        className="text-[#162C6D] font-[700] underline hover:opacity-80"
                      >
                        Terms &amp; Conditions, Rules &amp; Regulations as per IT Act 2000
                      </button>
                      . Any fraud/scam is punishable under Section 43/66. <span className="text-red-500">*</span>
                    </label>
                  </div>
                  {errors.agreedToTerms && (
                    <p className="text-red-500 text-[10px] mt-1 font-medium">{errors.agreedToTerms}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full max-w-full bg-[#0E0E0E] hover:bg-[#162C6D] text-white py-4 text-[11px] font-[800] tracking-[0.1em] rounded-full transition-colors cursor-pointer shadow-md"
                >
                  SEND ENQUIRY —
                </button>
              </form>
            ) : (
              /* Success Feedback State */
              <div className="py-6 text-center space-y-4 animate-in fade-in zoom-in-95">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-7 h-7" />
                </div>

                <div>
                  <h3 className="text-[18px] font-[800] text-[#0E0E0E]">Enquiry Recorded!</h3>
                  <p className="text-[12px] opacity-70 mt-1 max-w-xs mx-auto">
                    Thank you, <strong>{name}</strong>! Team VeloDigital will contact you on WhatsApp (
                    <strong>{whatsapp}</strong>) within 2 business hours.
                  </p>
                </div>

                <div className="bg-black/5 p-4 rounded-2xl text-left text-[11px] space-y-1">
                  <div className="font-semibold text-black/60 uppercase text-[9px]">ENQUIRY SUMMARY:</div>
                  <div><strong>Package:</strong> {selectedPackage}</div>
                  <div><strong>IT Act Compliance:</strong> Verified &amp; Accepted</div>
                </div>

                <div className="space-y-2 pt-2">
                  <a
                    href={dynamicWhatsAppLink}
                    target="_blank"
                    rel="noreferrer"
                    className="block w-full bg-[#162C6D] hover:bg-[#1d398f] text-white py-3.5 rounded-full text-[11px] font-[800] tracking-wider transition-colors shadow-md"
                  >
                    🚀 OPEN PRE-FILLED WHATSAPP NOW
                  </a>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={handleCopySummary}
                      className="flex-1 py-2.5 rounded-full border border-black/15 text-[10px] font-[700] hover:bg-black/5 flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Copy className="w-3 h-3" />
                      <span>{copied ? 'Copied to Clipboard!' : 'Copy Summary'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="px-4 py-2.5 rounded-full border border-black/15 text-[10px] font-[700] hover:bg-black/5 cursor-pointer"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Action Buttons */}
            <div className="w-full max-w-full mt-5 space-y-2.5 pt-4 border-t border-black/10">
              <a
                href="tel:+917020674916"
                className="block w-full max-w-full bg-[#162C6D] hover:bg-[#1a3482] text-white py-3.5 text-center text-[11px] font-[800] tracking-[0.12em] rounded-full shadow-[0_12px_32px_rgba(22,44,109,0.4)] transition-transform hover:scale-[1.01]"
              >
                📞 CONTACT US — CALL NOW
              </a>
              <a
                href="https://wa.me/917020674916?text=Hello%20team%20velo%20digital%20!!%20%2C%20I%20intrested%20in%20work%20with%20you"
                target="_blank"
                rel="noreferrer"
                className="block w-full max-w-full bg-[#0E0E0E] hover:bg-black text-white py-3 text-center text-[10px] font-[700] tracking-[0.1em] rounded-full transition-transform hover:scale-[1.01]"
              >
                💬 WHATSAPP — 7020674916
              </a>
              <p className="text-[9px] text-center opacity-40 tracking-[0.05em] w-full font-mono">
                DIRECT REDIRECT TO +91 7020674916
              </p>
            </div>
          </div>
        </CinematicReveal>
      </div>

      {/* Footer lockup */}
      <div className="mt-14 w-full max-w-7xl mx-auto border-t border-black/10 pt-6 flex flex-wrap justify-between items-center gap-3 text-[10px] font-[600] opacity-60">
        <span className="break-all">
          ©2026 VELODIGITAL.CO •{' '}
          <button
            type="button"
            onClick={onOpenRules}
            className="underline hover:text-[#162C6D] cursor-pointer"
          >
            Rules &amp; Regulations - IT Act 2000
          </button>{' '}
          • velodigital.co@gmail.com
        </span>
        <span className="font-mono tracking-wider">BUILT FOR GROWTH • STUDIO GRADE</span>
      </div>
    </section>
  );
}
