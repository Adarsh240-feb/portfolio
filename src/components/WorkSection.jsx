import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Code2 } from 'lucide-react';
import { PALETTE, PROJECTS } from '../data/portfolioData';

const BrainTumorMockup = () => (
  <div className="w-full h-full bg-[#19191B] text-white p-5 flex flex-col justify-between relative overflow-hidden">
    <div className="flex items-center justify-between text-[11px] font-mono text-white/60">
      <span>GRAD-CAM // EFFICIENTNET-B3</span>
      <span className="px-2 py-0.5 rounded-full bg-lime text-ink font-bold">
        FASTAPI
      </span>
    </div>
    <div className="my-auto flex items-center justify-center gap-5 py-3">
      <div className="w-24 h-24 rounded-full border-2 border-white/25 bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center relative">
        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-orange via-pink to-lime opacity-85 blur-[2px]" />
        <div className="absolute inset-2 rounded-full border border-dashed border-white/20" />
      </div>
      <div className="space-y-2 text-xs font-mono">
        <div className="text-lime font-bold">LOCALIZATION: ACTIVE</div>
        <div className="text-white/75">PIPELINE: TENSORFLOW + OPENCV</div>
        <div className="text-white/55">UI: NEXT.JS + MONGODB</div>
      </div>
    </div>
    <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
      <div className="h-full w-4/5 bg-gradient-to-r from-lime via-orange to-pink rounded-full" />
    </div>
  </div>
);

const WorkSection = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = useMemo(() => {
    const unique = Array.from(new Set(PROJECTS.map((p) => p.category)));
    return ['All', ...unique];
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return PROJECTS;
    return PROJECTS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <section id="work" className="py-20 sm:py-28 px-5 sm:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight text-ink leading-[0.98]">
            Things I&apos;ve{' '}
            <span className="font-serif italic font-normal">shipped</span>.
          </h2>
        </div>

        {/* Category Filter Chips */}
        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label="Filter projects by category"
        >
          {categories.map((cat) => {
            const active = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold border transition-all duration-200 ${
                  active
                    ? 'bg-ink text-paper border-ink shadow-sm'
                    : 'bg-white/80 text-ink/75 border-ink/15 hover:border-ink hover:text-ink'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2-Column Editorial Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {filteredProjects.map((project, index) => {
          const theme = PALETTE[project.color] || PALETTE.lime;
          return (
            <motion.article
              key={project.id}
              id={`project-${project.id}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              style={{ backgroundColor: theme.bg, color: theme.text }}
              className="group relative rounded-panel p-5 sm:p-7 border border-ink/15 shadow-sticker overflow-hidden flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1.5 hover:-rotate-[0.6deg] hover:shadow-lift"
            >
              {/* Subtle hover color-flood sheen */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-tr from-white/0 via-white/15 to-white/25"
              />

              <div className="relative z-10">
                {/* Top Metadata Row */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span
                    className="px-3 py-1 rounded-full font-mono text-[11px] font-bold uppercase tracking-wider"
                    style={{ backgroundColor: theme.pillBg, color: theme.text }}
                  >
                    {project.category}
                  </span>
                  {project.impact && (
                    <span
                      className="font-mono text-[11px] font-semibold tracking-tight opacity-80"
                      style={{ color: theme.subText }}
                    >
                      {project.impact}
                    </span>
                  )}
                </div>

                {/* Screenshot / Mockup Window */}
                <div className="rounded-2xl overflow-hidden border border-ink/15 bg-white aspect-[16/10] mb-6 shadow-sm">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={`${project.title} preview`}
                      loading="lazy"
                      className={`w-full h-full transition-transform duration-500 group-hover:scale-[1.03] ${
                        project.imageFit === 'contain'
                          ? 'object-contain p-6 bg-white'
                          : 'object-cover object-top'
                      }`}
                    />
                  ) : (
                    <BrainTumorMockup />
                  )}
                </div>

                {/* Title & One-Line Summary */}
                <h3 className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight mb-2.5">
                  {project.title}
                </h3>
                <p
                  className="text-sm sm:text-base leading-relaxed font-medium mb-5"
                  style={{ color: theme.subText }}
                >
                  {project.summary}
                </p>
              </div>

              {/* Bottom Tech Chips & Links */}
              <div className="relative z-10 pt-2 flex flex-col gap-4">
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-full text-xs font-semibold"
                      style={{ backgroundColor: theme.pillBg, color: theme.text }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-2.5 pt-1">
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-ink text-paper text-xs sm:text-sm font-semibold hover:bg-white hover:text-ink border border-ink transition-colors"
                    >
                      <span>Live</span>
                      <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-ink text-xs sm:text-sm font-semibold border border-ink/20 hover:border-ink transition-colors"
                    >
                      <Code2 className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Code</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
};

export default WorkSection;
