import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Check, Copy, Send } from 'lucide-react';
import { PALETTE, PROFILE } from '../data/portfolioData';

const ContactSection = () => {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${PROFILE.email}`;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Portfolio Inquiry from ${formState.name || 'Visitor'}`
    );
    const body = encodeURIComponent(
      `Hi Adarsh,\n\n${formState.message}\n\nBest,\n${formState.name}${
        formState.email ? ` (${formState.email})` : ''
      }`
    );
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-20 sm:py-28 px-5 sm:px-8 max-w-7xl mx-auto">
      <div className="rounded-panel bg-white border-2 border-ink p-7 sm:p-12 lg:p-16 shadow-sticker relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left: Giant Editorial CTA + Click-to-Copy Email + Social Pills */}
          <div className="lg:col-span-7">
            <span className="inline-block px-3 py-1 rounded-full bg-lime text-ink font-mono text-xs font-bold uppercase tracking-wider border border-ink/15 mb-5">
              Contact
            </span>

            <h2 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl tracking-tight text-ink leading-[0.95] mb-7">
              Let&apos;s build{' '}
              <span className="font-serif italic font-normal">something</span>{' '}
              together.
            </h2>

            {/* Click-to-copy Email Row */}
            <div className="relative inline-flex flex-wrap items-center gap-3 mb-8">
              <button
                type="button"
                onClick={copyEmail}
                className="group inline-flex items-center gap-3 text-left text-lg sm:text-2xl md:text-3xl font-extrabold tracking-tight text-ink underline decoration-2 decoration-ink/30 underline-offset-8 hover:decoration-lime transition-colors break-all"
              >
                <span>{PROFILE.email}</span>
                <span className="p-2 rounded-full bg-paper border border-ink/15 group-hover:bg-lime transition-colors shrink-0">
                  {copied ? (
                    <Check className="w-4 h-4 text-ink" aria-hidden="true" />
                  ) : (
                    <Copy className="w-4 h-4 text-ink" aria-hidden="true" />
                  )}
                </span>
              </button>

              <AnimatePresence>
                {copied && (
                  <motion.span
                    initial={{ opacity: 0, y: 6, scale: 0.92 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -4, scale: 0.92 }}
                    className="px-3 py-1 rounded-full bg-ink text-lime font-mono text-xs font-bold shadow-sm"
                  >
                    Copied!
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            {/* Social Pill Buttons */}
            <div className="flex flex-wrap gap-3">
              {PROFILE.socials.map((social) => {
                const theme = PALETTE[social.color] || PALETTE.black;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ backgroundColor: theme.bg, color: theme.text }}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-ink/15 font-bold text-sm shadow-sm hover:-translate-y-0.5 transition-transform"
                  >
                    <span>{social.name}</span>
                    <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Right: Simple Quick-Message Form */}
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-5 rounded-2xl bg-paper border border-ink/15 p-5 sm:p-6 space-y-4"
          >
            <div className="font-display font-bold text-lg text-ink">
              Send a quick note
            </div>

            <div>
              <label
                htmlFor="contact-name"
                className="block font-mono text-[11px] font-bold uppercase tracking-wider text-muted mb-1.5"
              >
                Your Name
              </label>
              <input
                id="contact-name"
                type="text"
                required
                value={formState.name}
                onChange={(e) =>
                  setFormState((s) => ({ ...s, name: e.target.value }))
                }
                placeholder="Alex Rivera"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-ink/15 text-sm font-medium text-ink placeholder:text-muted/50 focus:border-ink focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="contact-email"
                className="block font-mono text-[11px] font-bold uppercase tracking-wider text-muted mb-1.5"
              >
                Your Email
              </label>
              <input
                id="contact-email"
                type="email"
                required
                value={formState.email}
                onChange={(e) =>
                  setFormState((s) => ({ ...s, email: e.target.value }))
                }
                placeholder="alex@company.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-ink/15 text-sm font-medium text-ink placeholder:text-muted/50 focus:border-ink focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="block font-mono text-[11px] font-bold uppercase tracking-wider text-muted mb-1.5"
              >
                Project or Role
              </label>
              <textarea
                id="contact-message"
                rows={3}
                required
                value={formState.message}
                onChange={(e) =>
                  setFormState((s) => ({ ...s, message: e.target.value }))
                }
                placeholder="Tell me what we're building..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-ink/15 text-sm font-medium text-ink placeholder:text-muted/50 focus:border-ink focus:outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-ink text-paper font-semibold text-sm hover:bg-lime hover:text-ink border border-ink transition-colors"
            >
              <span>Open in Mail App</span>
              <Send className="w-4 h-4" aria-hidden="true" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
