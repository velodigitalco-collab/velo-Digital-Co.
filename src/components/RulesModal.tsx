import { X, ShieldAlert, CheckCircle, Scale, FileText, Lock } from 'lucide-react';

interface RulesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
}

export function RulesModal({ isOpen, onClose, onAccept }: RulesModalProps) {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="rules-modal-title"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        className="w-full max-w-3xl bg-[#FFFEF9] text-[#0E0E0E] rounded-[24px] md:rounded-[32px] overflow-hidden shadow-2xl border border-black/15 max-h-[92vh] flex flex-col relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 md:p-8 bg-[#0E0E0E] text-white flex justify-between items-start">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#162C6D] flex items-center justify-center shrink-0 text-white">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] tracking-[0.2em] font-[700] uppercase text-blue-300">
                STATUTORY LEGAL DISCLOSURE &amp; CLIENT CODE
              </div>
              <h2 id="rules-modal-title" className="text-[20px] md:text-[26px] font-[800] tracking-tight mt-0.5">
                Rules &amp; Regulations — IT Act 2000
              </h2>
              <p className="text-[11px] opacity-70 mt-1">
                VeloDigital.co Web Studio Operating Terms &amp; Indian Cyber Law Safeguards
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close rules and regulations"
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-6 text-[13px] leading-[1.6] text-black/80">
          {/* Warning Banner */}
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex items-start gap-3 text-amber-900">
            <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <div className="font-[800] text-[12px] uppercase tracking-wider">
                LEGAL WARNING: ZERO-TOLERANCE FRAUD POLICY
              </div>
              <p className="text-[12px] mt-1 leading-[1.5]">
                Any impersonation, forged payment receipts, unauthorized system breach, or fraudulent chargeback attempts are strictly punishable offenses under <strong>Section 43, 66, and 66D of the Information Technology Act, 2000</strong> and the Indian Penal Code (IPC).
              </p>
            </div>
          </div>

          {/* Section 1 */}
          <div className="space-y-2">
            <h3 className="font-[800] text-[14px] text-black flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#162C6D]" />
              <span>1. Electronic Agreement &amp; Validity (IT Act Section 10A)</span>
            </h3>
            <p>
              Submission of the project enquiry form, digital acceptance of proposal quotes, or confirmation via WhatsApp / email constitutes a legally binding contract under Section 10A of the Information Technology Act, 2000. Physical signatures are not required to enforce reciprocal commercial covenants.
            </p>
          </div>

          {/* Section 2 */}
          <div className="space-y-2">
            <h3 className="font-[800] text-[14px] text-black flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#162C6D]" />
              <span>2. Intellectual Property &amp; Source Code Rights</span>
            </h3>
            <p>
              Upon receipt of full and final contractual settlement, complete ownership rights of the client-specific custom frontend codebase, tailored UI components, and uploaded graphic assets are transferred unconditionally to the client. VeloDigital.co retains the right to display the design as part of its studio portfolio.
            </p>
          </div>

          {/* Section 3 */}
          <div className="space-y-2">
            <h3 className="font-[800] text-[14px] text-black flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#162C6D]" />
              <span>3. Milestone Deliverables &amp; Support Guarantee</span>
            </h3>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong>Starter Tier (₹7,999):</strong> 3-5 working days delivery, up to 3 bespoke pages, 30 days post-launch priority bug warranty.</li>
              <li><strong>Business Tier (₹14,999):</strong> 7-10 working days delivery, brand kit + glass UI, advanced SEO, 60 days dedicated support.</li>
              <li><strong>Premium Tier (₹24,999+):</strong> 14-20 working days delivery, custom CMS/ecommerce, 90 days SLA support &amp; maintenance.</li>
              <li>Client must provide required branding assets, copywriting, or credentials within 7 calendar days of deposit.</li>
            </ul>
          </div>

          {/* Section 4 */}
          <div className="space-y-2">
            <h3 className="font-[800] text-[14px] text-black flex items-center gap-2">
              <Scale className="w-4 h-4 text-[#162C6D]" />
              <span>4. Payment Terms &amp; Fair Refund Policy</span>
            </h3>
            <p>
              A 50% initiation advance is standard prior to project commencement, with the remaining 50% due upon staging server review and domain signoff. Cancellation requests initiated after design sprint phase are non-refundable to cover expended engineering hours.
            </p>
          </div>

          {/* Section 5 */}
          <div className="space-y-2 border-t border-black/10 pt-4">
            <h3 className="font-[800] text-[14px] text-black">5. Legal Jurisdiction</h3>
            <p className="text-[12px] opacity-75">
              All commercial dealings, website hosting compliance, and service provisions are governed by the substantive laws of India. Any disputes arising hereunder shall be subject to the exclusive jurisdiction of the competent courts in India.
            </p>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 md:p-6 bg-black/5 border-t border-black/10 flex flex-wrap items-center justify-between gap-3">
          <div className="text-[11px] opacity-60 font-mono">
            UPDATED: OCTOBER 2026 • IT ACT 2000 CERTIFIED
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-full border border-black/20 text-[11px] font-[700] hover:bg-black/5 transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                onAccept();
                onClose();
              }}
              className="btn-modern-dark px-6 py-2.5 rounded-full text-[11px] font-[800] tracking-wider flex items-center gap-1.5 cursor-pointer"
            >
              <span>I AGREE &amp; ACCEPT ALL TERMS</span>
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
