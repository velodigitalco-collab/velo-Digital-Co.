import { X, ExternalLink, CheckCircle, Zap, Shield, Sparkles } from 'lucide-react';

export interface ProjectData {
  id: string;
  title: string;
  category: string;
  badge: string;
  tagline: string;
  liveUrl: string;
  image: string;
  bgColor: string;
  badgeStyle: string;
  metrics: { label: string; value: string }[];
  deliverables: string[];
  overview: string;
  techStack: string[];
}

interface CaseStudyModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

export function CaseStudyModal({ project, onClose }: CaseStudyModalProps) {
  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        className="w-full max-w-2xl bg-[#FFFEF9] text-[#0E0E0E] rounded-[24px] md:rounded-[32px] overflow-hidden shadow-2xl border border-black/10 max-h-[90vh] flex flex-col relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-black/5">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close case study"
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6 text-white">
            <span className="text-[10px] tracking-[0.2em] font-[700] uppercase text-blue-300">
              {project.category}
            </span>
            <h2 id="case-study-title" className="text-[26px] md:text-[34px] font-[800] tracking-tight leading-tight">
              {project.title}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-6">
          {/* Metrics bar */}
          <div className="grid grid-cols-3 gap-3">
            {project.metrics.map((m, i) => (
              <div key={i} className="glass-card p-3 rounded-[16px] text-center">
                <div className="text-[18px] md:text-[22px] font-[800] text-[#162C6D]">{m.value}</div>
                <div className="text-[9px] uppercase tracking-wider opacity-60 font-[600]">{m.label}</div>
              </div>
            ))}
          </div>

          <div>
            <h3 className="text-[11px] font-[800] tracking-[0.16em] uppercase opacity-40 mb-2">
              PROJECT OVERVIEW
            </h3>
            <p className="text-[14px] leading-[1.6] text-black/80">
              {project.overview}
            </p>
          </div>

          <div>
            <h3 className="text-[11px] font-[800] tracking-[0.16em] uppercase opacity-40 mb-2">
              KEY DELIVERABLES &amp; ARCHITECTURE
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {project.deliverables.map((d, i) => (
                <div key={i} className="flex items-center gap-2 text-[12px] bg-black/5 px-3 py-2 rounded-xl">
                  <CheckCircle className="w-3.5 h-3.5 text-[#162C6D] shrink-0" />
                  <span>{d}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-[11px] font-[800] tracking-[0.16em] uppercase opacity-40 mb-2">
              TECH STACK &amp; CAPABILITIES
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-black/5 border border-black/10 rounded-full text-[10px] font-[700] text-black/70"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-black/10 flex flex-wrap items-center justify-between gap-3">
            <span className="text-[11px] text-black/60 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-emerald-600" />
              Verified live production deployment
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-full border border-black/15 text-[11px] font-[700] hover:bg-black/5"
              >
                Close
              </button>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-modern-dark px-5 py-2 rounded-full text-[11px] font-[700] tracking-wider flex items-center gap-1.5"
              >
                <span>VISIT LIVE SITE</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
