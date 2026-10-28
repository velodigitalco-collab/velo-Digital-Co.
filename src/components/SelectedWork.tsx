import { useState } from 'react';
import { ExternalLink, ArrowRight, Eye, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { CaseStudyModal, ProjectData } from './CaseStudyModal';

const PROJECTS: ProjectData[] = [
  {
    id: 'known-strangers',
    title: 'Known Strangers',
    category: 'Fashion & Streetwear',
    badge: 'KNOWN STRANGERS',
    tagline: 'Ecommerce • Premium UI • Streetwear Brand',
    liveUrl: 'https://knownstrangers.in/',
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&q=80&auto=format&fit=crop',
    bgColor: 'bg-[#ECEAFF]',
    badgeStyle: 'bg-white text-black',
    metrics: [
      { label: 'Conversion Lift', value: '+310%' },
      { label: 'Page Load', value: '0.64s' },
      { label: 'Mobile Sales', value: '78%' },
    ],
    deliverables: [
      'Custom Glass Shopfront UI',
      'Instant Cart & Checkout Funnel',
      'Dynamic Streetwear Drop Timer',
      'Inventory & WhatsApp Order Sync',
    ],
    overview:
      'Engineered an ultra-modern high-converting ecommerce storefront for Indian streetwear label Known Strangers. Focused on brutalist luxury typography, fluid card hover states, and frictionless mobile one-tap checkout.',
    techStack: ['React', 'Tailwind CSS', 'Shopify Storefront API', 'Razorpay', 'Vercel Edge'],
  },
  {
    id: 'designer-monk',
    title: 'Designer Monk',
    category: 'Luxury & Architecture',
    badge: 'DESIGNER MONK',
    tagline: 'Storytelling • Branding • Interiors',
    liveUrl: 'https://thedesignermonk.in/',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80&auto=format&fit=crop',
    bgColor: 'bg-[#FFF4D6]',
    badgeStyle: 'bg-white text-black',
    metrics: [
      { label: 'Lead Quality', value: '4.8x' },
      { label: 'Time on Page', value: '4m 12s' },
      { label: 'Inquiry Rate', value: '18.4%' },
    ],
    deliverables: [
      'Editorial Glass Architecture Layout',
      'Interactive Project Showcase Slider',
      'Ultra-HD Architectural Photography CDN',
      'Consultation Booking Funnel',
    ],
    overview:
      'Designed a bespoke digital portfolio for luxury interior design atelier Designer Monk. Replaced static PDF lookbooks with a responsive interactive gallery that captured high-ticket residential clients across Mumbai, Delhi, and Bangalore.',
    techStack: ['Next.js', 'GSAP Motion', 'Tailwind CSS', 'Cloudinary CDN', 'HubSpot CRM'],
  },
  {
    id: 'clutch-gg',
    title: 'ClutchGG',
    category: 'Gaming & Esports',
    badge: 'ClutchGG',
    tagline: 'Community • Platform • E-sports',
    liveUrl: 'https://clutchgg.in/',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80&auto=format&fit=crop',
    bgColor: 'bg-[#0E0E0E]',
    badgeStyle: 'bg-white text-black serif font-[800]',
    metrics: [
      { label: 'Active Gamers', value: '45,000+' },
      { label: 'Tournament Reg', value: '99.4%' },
      { label: 'Server Ping', value: '18ms' },
    ],
    deliverables: [
      'Dark Cinematic Glassmorphic Hub',
      'Live Tournament Brackets & Scoreboards',
      'Automated Discord & WhatsApp Webhooks',
      'Player Clan Profiles & Leaderboards',
    ],
    overview:
      'Architected a lightning-fast gaming hub and competitive tournament portal for ClutchGG. Optimized for heavy mobile traffic during live broadcast streams with real-time bracket updates and discord role validation.',
    techStack: ['React', 'Node.js', 'PostgreSQL', 'WebSockets', 'Tailwind CSS'],
  },
];

export function SelectedWork() {
  const [activeProject, setActiveProject] = useState<ProjectData | null>(null);

  return (
    <section id="work" className="w-full max-w-full px-4 md:px-10 py-14 md:py-24 relative">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="w-full flex flex-wrap justify-between items-end gap-4 mb-8 md:mb-14"
      >
        <div>
          <span className="text-[10px] font-[800] tracking-[0.2em] uppercase text-[#162C6D] block mb-2">
            PROVEN TRACK RECORD
          </span>
          <h2 className="text-[38px] md:text-[68px] leading-[0.88] tracking-[-0.04em] font-[800] text-[#0E0E0E]">
            SELECTED<br />WORK
          </h2>
        </div>
        <motion.span
          whileHover={{ scale: 1.03 }}
          className="serif text-[14px] md:text-[18px] italic glass-card px-5 py-2.5 rounded-full text-[#0E0E0E]/80 shadow-sm cursor-default"
        >
          [2023 — 2026] • 03 PROJECTS
        </motion.span>
      </motion.div>

      {/* Grid of Work */}
      <div className="w-full max-w-full grid grid-cols-1 md:grid-cols-3 gap-5">
        {PROJECTS.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{
              duration: 0.75,
              delay: index * 0.14,
              ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={{ y: -6 }}
            className="w-full glass-card p-5 md:p-8 rounded-[22px] md:rounded-[28px] transition-shadow duration-300 hover:shadow-2xl flex flex-col justify-between group"
          >
            <div>
              {/* Image Frame with overflow hidden and smooth zoom */}
              <div
                className={`w-full border-[1.5px] border-black aspect-[4/3] ${project.bgColor} rounded-[16px] md:rounded-[20px] overflow-hidden relative shadow-inner`}
              >
                <img
                  src={project.image}
                  alt={`${project.title} Preview`}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  loading="lazy"
                  onError={(e) => {
                    // Fallback to high quality alternate architectural image if needed
                    e.currentTarget.src =
                      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80&auto=format&fit=crop';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"></div>

                <div className={`absolute bottom-3.5 left-3.5 ${project.badgeStyle} px-3 py-1 rounded-full text-[10px] font-[800] tracking-wide shadow-md`}>
                  {project.badge}
                </div>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  onClick={() => setActiveProject(project)}
                  className="absolute top-3.5 right-3.5 bg-black/60 hover:bg-black text-white p-2.5 rounded-full opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm shadow-md"
                  title="View Case Study Details"
                >
                  <Eye className="w-4 h-4" />
                </motion.button>
              </div>

              {/* Title and Live link */}
              <div className="mt-5 w-full flex justify-between items-center">
                <span className="font-[700] text-[14px] text-[#0E0E0E]">
                  {project.title} • {project.category.split('&')[0].trim()}
                </span>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] font-[700] underline hover:text-[#162C6D] transition-colors flex items-center gap-0.5 group/link"
                  title={`Open live site for ${project.title}`}
                >
                  <span>LIVE</span>
                  <span className="inline-block transition-transform group-hover/link:translate-x-0.5">→</span>
                </a>
              </div>

              <p className="text-[11px] opacity-55 mt-1 font-medium">
                {project.tagline}
              </p>
            </div>

            {/* Bottom action drawer trigger */}
            <div className="mt-6 pt-4 border-t border-black/5 flex items-center justify-between text-[11px]">
              <button
                type="button"
                onClick={() => setActiveProject(project)}
                className="font-[700] text-[#162C6D] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Read Case Study</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>
              <span className="text-[10px] opacity-50 font-mono">
                {project.metrics[0].value} {project.metrics[0].label}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Case Study Modal */}
      <CaseStudyModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
}
