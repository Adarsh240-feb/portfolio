import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, GraduationCap } from 'lucide-react';
import { EDUCATION, PALETTE, PROFILE, STATS } from '../data/portfolioData';

const AboutSection = () => {
  return (
    <section id="about" className="py-20 sm:py-28 px-5 sm:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Left: Portrait with Sticker Badge */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-5 relative"
        >
          <div className="relative rounded-panel overflow-hidden border-2 border-ink bg-white shadow-sticker aspect-[4/4.4] max-w-md mx-auto">
            <img
              src={PROFILE.avatar}
              alt={PROFILE.name}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Tilted Sticker Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-lime text-ink border-2 border-ink shadow-sticker font-bold text-sm -rotate-3 absolute -bottom-4 left-6 sm:left-10">
            <MapPin className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Based in {PROFILE.city}</span>
          </div>
        </motion.div>

        {/* Right: Punchy Bio, Education & Colored-Tag Stat Tiles */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="lg:col-span-7"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-purple text-white font-mono text-xs font-bold uppercase tracking-wider mb-4">
            About Me
          </span>

          <h2 className="font-display font-extrabold text-3xl sm:text-5xl tracking-tight text-ink leading-[1.02] mb-5">
            Backend brain,{' '}
            <span className="font-serif italic font-normal">playful</span>{' '}
            front-end craft.
          </h2>

          <p className="text-base sm:text-lg text-muted leading-relaxed font-medium mb-6">
            {PROFILE.bio}
          </p>

          {/* Education Strip */}
          <div className="rounded-2xl bg-white border border-ink/15 p-4 sm:p-5 mb-7 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-paper border border-ink/10 shrink-0">
                <GraduationCap className="w-5 h-5 text-ink" aria-hidden="true" />
              </div>
              <div>
                <div className="font-display font-bold text-base text-ink">
                  {EDUCATION.institution}
                </div>
                <div className="text-sm text-muted font-medium">
                  {EDUCATION.degree}
                </div>
              </div>
            </div>
            <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-paper border border-ink/10 self-start sm:self-center shrink-0">
              {EDUCATION.period}
            </span>
          </div>

          {/* 4 Stat Tiles in Colored-Tag Style */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            {STATS.map((stat) => {
              const theme = PALETTE[stat.color] || PALETTE.lime;
              return (
                <div
                  key={stat.label}
                  style={{ backgroundColor: theme.bg, color: theme.text }}
                  className="rounded-card p-4 border border-ink/15 shadow-sticker flex flex-col justify-between min-h-[108px]"
                >
                  <div className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight leading-none">
                    {stat.value}
                  </div>
                  <div
                    className="font-mono text-[11px] font-bold uppercase tracking-wider leading-snug mt-3"
                    style={{ color: theme.subText }}
                  >
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
