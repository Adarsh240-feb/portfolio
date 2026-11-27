import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';

const NAV_ITEMS = [
  { label: 'Work', target: '#work' },
  { label: 'About', target: '#about' },
  { label: 'Process', target: '#process' },
  { label: 'Contact', target: '#contact' },
];

export const scrollToSection = (target) => {
  if (!target) return;
  const el = document.querySelector(target);
  if (el) {
    const offset = 84;
    const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (e, target) => {
    e.preventDefault();
    setMobileOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => scrollToSection(target), 120);
    } else {
      scrollToSection(target);
    }
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-paper/90 backdrop-blur-md border-b border-ink/10'
          : 'bg-transparent'
      }`}
    >
      <nav
        aria-label="Primary navigation"
        className="max-w-7xl mx-auto px-5 sm:px-8 py-3.5 sm:py-4 flex items-center justify-between gap-4"
      >
        {/* Left Wordmark */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, '#hero')}
          className="inline-flex items-center gap-2 text-lg sm:text-xl font-extrabold tracking-tight text-ink group"
        >
          <span
            aria-hidden="true"
            className="w-3 h-3 rounded-full bg-gunred inline-block transition-transform duration-200 group-hover:scale-125"
          />
          <span>
            {PROFILE.brandMark}
            <span className="font-serif italic font-normal text-2xl leading-none ml-0.5 text-ink/70">
              .
            </span>
          </span>
        </a>

        {/* Center/Right Links + CTA */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-7 text-[15px] font-medium text-ink/80">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <a
                  href={item.target}
                  onClick={(e) => handleNavClick(e, item.target)}
                  className="hover:text-ink transition-colors relative py-1 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-ink after:transition-all hover:after:w-full"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-ink text-paper text-sm font-semibold hover:bg-lime hover:text-ink border border-ink transition-colors duration-200 shadow-sm"
          >
            <span>Let&apos;s Talk</span>
            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>

        {/* Mobile Toggle */}
        <div className="flex md:hidden items-center gap-2.5">
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="px-4 py-2 rounded-full bg-ink text-paper text-xs font-semibold whitespace-nowrap"
          >
            Let&apos;s Talk
          </a>
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            className="p-2 rounded-full border border-ink/15 bg-white/80 text-ink"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-paper/95 backdrop-blur-lg border-b border-ink/10 px-6 pb-6 pt-2">
          <ul className="flex flex-col gap-3">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <a
                  href={item.target}
                  onClick={(e) => handleNavClick(e, item.target)}
                  className="block py-2 text-lg font-semibold text-ink border-b border-ink/5"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a
                href={PROFILE.resumeUrl}
                download="Adarsh_Kesharwani_Resume.pdf"
                className="inline-flex items-center gap-2 text-sm font-semibold text-ink underline"
              >
                Download Resume
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
