export interface PackageTier {
  id: 'starter' | 'business' | 'premium' | 'custom';
  name: string;
  price: number;
  label: string;
  tag?: string;
  popular?: boolean;
  pages: string;
  timeline: string;
  features: string[];
}

export const PACKAGES: PackageTier[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: 7999,
    label: 'Starter — ₹7,999',
    pages: 'Up to 3 Pages',
    timeline: '3 - 5 Days',
    features: [
      'Up to 3 Pages Custom Design',
      'Custom Logo + Glass UI',
      'Mobile Responsive + Cinematic Theme',
      'Basic SEO Optimization',
      '30 Days Priority Support',
      'Domain & Hosting Setup Assistance',
    ],
  },
  {
    id: 'business',
    name: 'Business',
    price: 14999,
    label: 'Business — ₹14,999',
    tag: 'MOST POPULAR',
    popular: true,
    pages: 'Up to 7 Pages',
    timeline: '7 - 10 Days',
    features: [
      'Up to 7 Pages High-Conversion Layout',
      'Complete Brand Kit & Typography',
      'Cinematic Glass Theme & Micro-Interactions',
      'Advanced SEO + Google Analytics 4',
      'Interactive Contact & WhatsApp Lead Funnel',
      '60 Days Priority Support & Revisions',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 24999,
    label: 'Premium — ₹24,999+',
    pages: 'Up to 15+ Pages',
    timeline: '14 - 20 Days',
    features: [
      'Up to 15+ Bespoke Pages',
      'Full Digital Branding & Visual Direction',
      'Ecommerce / CMS Headless Ready',
      'Full Glass Morphism + Fluid GSAP Motion',
      'Lead Generation & Speed Performance Score 95+',
      '90 Days Maintenance & Dedicated Account Lead',
    ],
  },
];

export interface AddonOption {
  id: string;
  name: string;
  price: number;
  description: string;
}

export const ADDONS: AddonOption[] = [
  { id: 'cms', name: 'CMS Blog / Admin Panel', price: 4999, description: 'Easy content updates without code' },
  { id: 'ecommerce', name: 'Razorpay / Payment Gateway', price: 5999, description: 'Sell products & take live payments' },
  { id: 'speed', name: 'Sub-second Speed Turbo (98+ PageSpeed)', price: 2999, description: 'Ultra-fast asset CDN compression' },
  { id: 'multilingual', name: 'Multi-language (Hindi + English)', price: 3499, description: 'Localized landing experience' },
];

export function calculateProjectEstimate(
  packageId: string,
  selectedAddonIds: string[] = [],
  discountPercent = 20
): { subtotal: number; discount: number; total: number } {
  const selectedPkg = PACKAGES.find((p) => p.id === packageId) || PACKAGES[1]; // default business
  const addonsTotal = selectedAddonIds.reduce((sum, id) => {
    const addon = ADDONS.find((a) => a.id === id);
    return sum + (addon ? addon.price : 0);
  }, 0);

  const subtotal = selectedPkg.price + addonsTotal;
  const discount = Math.round((subtotal * discountPercent) / 100);
  const total = subtotal - discount;

  return { subtotal, discount, total };
}

export function formatINR(val: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);
}

export function generateWhatsAppUrl(data: {
  name: string;
  whatsapp?: string;
  packageName: string;
  message?: string;
  estimatedTotal?: number;
}): string {
  const phone = '917020674916';
  const nameText = data.name.trim() || 'Prospective Client';
  const pkgText = data.packageName || 'Business (₹14,999)';
  const msgDetails = data.message?.trim() ? `\n\n*Project Details:* ${data.message.trim()}` : '';
  const priceDetails = data.estimatedTotal ? `\n*Est. Investment:* ₹${data.estimatedTotal.toLocaleString('en-IN')}` : '';

  const rawText = `Hello team VeloDigital! I'm ${nameText}. I am interested in building a website with you.\n\n*Selected Package:* ${pkgText}${priceDetails}${msgDetails}\n\nPlease share the timeline and next steps!`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(rawText)}`;
}

export interface EnquiryFormInput {
  name: string;
  whatsapp: string;
  package: string;
  message?: string;
  agreedToTerms: boolean;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export function validateEnquiryForm(form: EnquiryFormInput): ValidationResult {
  const errors: Record<string, string> = {};

  if (!form.name || form.name.trim().length < 2) {
    errors.name = 'Please provide your full name (minimum 2 characters).';
  }

  const cleanPhone = form.whatsapp.replace(/\D/g, '');
  if (!cleanPhone || cleanPhone.length < 10) {
    errors.whatsapp = 'Please provide a valid 10-digit WhatsApp number.';
  }

  if (!form.package) {
    errors.package = 'Please select a package tier.';
  }

  if (!form.agreedToTerms) {
    errors.agreedToTerms = 'You must agree to the Terms & Regulations under the IT Act 2000.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
