import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';

const Footer = () => {
  const [localTime, setLocalTime] = useState('');

  useEffect(() => {
    const updateClock = () => {
      try {
        const formatted = new Intl.DateTimeFormat('en-IN', {
          timeZone: PROFILE.timezone || 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        }).format(new Date());
        setLocalTime(formatted);
      } catch {
        setLocalTime('');
      }
    };
    updateClock();
    const timer = setInterval(updateClock, 30000);
    return () => clearInterval(timer);
  }, []);

  return (
    <footer className="border-t border-ink/10 py-8 px-5 sm:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm font-medium text-muted">
        <div>
          &copy; {new Date().getFullYear()} {PROFILE.name}
        </div>

        <div className="flex items-center gap-5">
          {localTime && (
            <span className="font-mono text-xs text-ink/75">
              Prayagraj &middot; {localTime} IST
            </span>
          )}
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-ink/15 text-ink font-semibold hover:bg-lime transition-colors"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
