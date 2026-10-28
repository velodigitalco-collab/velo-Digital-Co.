export function Marquee() {
  const content = '★ PREMIUM WEBSITES ★ GLASSMORPHISM ★ CINEMATIC THEME ★ BRAND KIT ★ ECOMMERCE ★ SEO ★ PERFORMANCE ★ NO TEMPLATES ★ IT ACT 2000 COMPLIANT ★ 24/7 ACCOUNTABILITY ★ &nbsp;';

  return (
    <div className="marquee py-3 md:py-4 w-full max-w-full glass-dark text-white select-none">
      <div className="marquee-track text-[11px] md:text-[13px] font-[700] tracking-[0.2em] uppercase">
        <span dangerouslySetInnerHTML={{ __html: content }} />
        <span dangerouslySetInnerHTML={{ __html: content }} />
        <span dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
}
