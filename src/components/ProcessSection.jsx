import React from 'react';
import { motion } from 'framer-motion';
import { PALETTE, PROCESS_STEPS } from '../data/portfolioData';

const ProcessSection = () => {
  return (
    <section id="process" className="py-20 sm:py-28 px-5 sm:px-8 max-w-7xl mx-auto">
      <div className="mb-12">
        <span className="inline-block px-3 py-1 rounded-full bg-pink text-ink font-mono text-xs font-bold uppercase tracking-wider border border-ink/15 mb-4">
          How I Work
        </span>
        <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight text-ink leading-[0.98]">
          From idea to{' '}
          <span className="font-serif italic font-normal">production</span>.
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {PROCESS_STEPS.map((step, idx) => {
          const theme = PALETTE[step.color] || PALETTE.lime;
          return (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: idx * 0.07 }}
              style={{ backgroundColor: theme.bg, color: theme.text }}
              className="rounded-panel p-6 border border-ink/15 shadow-sticker flex flex-col justify-between min-h-[250px] hover:-translate-y-1 transition-transform duration-200"
            >
              <div className="font-serif italic text-6xl sm:text-7xl leading-none opacity-90">
                {step.num}
              </div>
              <div className="mt-8">
                <h3 className="font-display font-extrabold text-2xl tracking-tight mb-2">
                  {step.title}
                </h3>
                <p
                  className="text-sm leading-relaxed font-medium"
                  style={{ color: theme.subText }}
                >
                  {step.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default ProcessSection;
