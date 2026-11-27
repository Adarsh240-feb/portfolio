import React from 'react';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import { EDUCATION, EXPERIENCE, PALETTE } from '../data/portfolioData';

const ExperienceSection = () => {
  return (
    <section
      id="experience"
      className="py-20 sm:py-28 px-5 sm:px-8 max-w-5xl mx-auto"
    >
      <div className="mb-12">
        <span className="inline-block px-3 py-1 rounded-full bg-cobalt text-white font-mono text-xs font-bold uppercase tracking-wider mb-4">
          Experience &amp; Open Source
        </span>
        <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight text-ink leading-[0.98]">
          Where I&apos;ve{' '}
          <span className="font-serif italic font-normal">contributed</span>.
        </h2>
      </div>

      {/* Vertical Timeline */}
      <div className="relative pl-6 sm:pl-10 border-l-2 border-ink/15 space-y-8">
        {EXPERIENCE.map((item, idx) => {
          const theme = PALETTE[item.color] || PALETTE.lime;
          return (
            <motion.article
              key={`${item.org}-${item.role}`}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: idx * 0.06 }}
              className="relative rounded-panel bg-white border border-ink/15 p-6 sm:p-7 shadow-sticker"
            >
              {/* Colored Timeline Marker */}
              <span
                aria-hidden="true"
                style={{ backgroundColor: theme.bg }}
                className="w-4 h-4 rounded-full border-2 border-ink absolute -left-[33px] sm:-left-[49px] top-8"
              />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <div>
                  <h3 className="font-display font-extrabold text-xl sm:text-2xl text-ink tracking-tight">
                    {item.role}
                  </h3>
                  <div className="text-sm sm:text-base font-bold text-ink/75 mt-0.5">
                    {item.org}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <span
                    style={{ backgroundColor: theme.bg, color: theme.text }}
                    className="px-3 py-1 rounded-full font-mono text-xs font-bold border border-ink/10"
                  >
                    {item.period}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-paper font-mono text-xs font-semibold text-muted border border-ink/10">
                    {item.location}
                  </span>
                </div>
              </div>

              <ul className="space-y-2.5 text-sm sm:text-base text-muted font-medium">
                {item.bullets.map((bullet, bIdx) => (
                  <li key={bIdx} className="flex items-start gap-2.5">
                    <span
                      aria-hidden="true"
                      className="w-1.5 h-1.5 rounded-full bg-ink mt-2 shrink-0"
                    />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          );
        })}
      </div>

      {/* Achievements Strip */}
      <div className="mt-10 rounded-panel bg-ink text-paper p-6 sm:p-7 border border-ink shadow-sticker">
        <div className="flex items-center gap-2.5 mb-4">
          <Award className="w-5 h-5 text-lime" aria-hidden="true" />
          <h3 className="font-display font-extrabold text-lg sm:text-xl">
            Recognition &amp; Hackathons
          </h3>
        </div>
        <div className="flex flex-wrap gap-2.5">
          {EDUCATION.highlights.map((item) => (
            <span
              key={item}
              className="px-3.5 py-2 rounded-xl bg-white/10 text-paper text-xs sm:text-sm font-medium border border-white/10"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
