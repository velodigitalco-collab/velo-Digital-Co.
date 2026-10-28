import { useEffect, useState } from 'react';

interface LoaderProps {
  onComplete: () => void;
  autostart?: boolean;
}

export function Loader({ onComplete, autostart = false }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (autostart) {
      onComplete();
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setFading(true), 300);
          setTimeout(() => onComplete(), 1000);
          return 100;
        }
        return prev + 2;
      });
    }, 24);

    return () => clearInterval(interval);
  }, [autostart, onComplete]);

  if (autostart) return null;

  return (
    <div
      id="loader"
      className={`fixed inset-0 z-[9999] bg-[#FFFEF9] flex flex-col justify-between p-[6vw] w-full max-w-full transition-transform duration-700 ease-in-out ${
        fading ? '-translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'
      }`}
      aria-label="Loading VeloDigital Studio"
    >
      <div className="flex justify-between items-center text-[11px] font-[700] tracking-[0.2em] w-full text-[#0E0E0E]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#162C6D] animate-ping"></span>
          <span>VELODIGITAL.CO • PREMIUM STUDIO</span>
        </div>
        <div className="flex items-center gap-4">
          <span id="cnt" className="font-mono text-[12px]">{progress}%</span>
          <button
            type="button"
            onClick={() => {
              setFading(true);
              setTimeout(onComplete, 400);
            }}
            className="text-[10px] tracking-widest text-[#162C6D] underline uppercase hover:opacity-80 transition-opacity cursor-pointer"
          >
            Skip Intro →
          </button>
        </div>
      </div>

      <div className="space-y-[1.8vw] w-full my-auto">
        <div className="loader-line w-full overflow-hidden">
          <span
            className="block text-[11.5vw] md:text-[7.5vw] leading-[0.88] tracking-[-0.05em] font-[800] text-[#0E0E0E] transition-all duration-700 delay-100"
            style={{ transform: progress > 15 ? 'translateY(0)' : 'translateY(110%)' }}
          >
            WE DON&apos;T
          </span>
        </div>
        <div className="loader-line w-full overflow-hidden">
          <span
            className="block text-[11.5vw] md:text-[7.5vw] leading-[0.88] tracking-[-0.04em] serif italic font-[400] ml-[4vw] md:ml-[6vw] text-[#0E0E0E] transition-all duration-700 delay-200"
            style={{ transform: progress > 35 ? 'translateY(0)' : 'translateY(110%)' }}
          >
            do marketing.
          </span>
        </div>
        <div className="loader-line w-full overflow-hidden">
          <span
            className="block text-[11.5vw] md:text-[7.5vw] leading-[0.88] tracking-[-0.05em] font-[800] text-[#162C6D] transition-all duration-700 delay-300"
            style={{ transform: progress > 60 ? 'translateY(0)' : 'translateY(110%)' }}
          >
            WE BUILD SITES.
          </span>
        </div>
      </div>

      <div className="w-full">
        <div className="flex justify-between text-[10px] opacity-40 font-mono tracking-wider mb-2">
          <span>HIGH-CONVERSION ARCHITECTURE</span>
          <span>EST. 2023</span>
        </div>
        <div className="w-full h-[3px] bg-black/5 rounded-full overflow-hidden">
          <div
            id="bar"
            className="h-full bg-[#162C6D] transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
