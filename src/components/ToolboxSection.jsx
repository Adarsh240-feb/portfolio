import React from 'react';
import { PALETTE, SKILLS_ROW_1, SKILLS_ROW_2 } from '../data/portfolioData';

const MarqueeRow = ({ items, direction = 'left' }) => {
  const repeated = [...items, ...items];
  return (
    <div className="marquee-track overflow-hidden py-2 select-none">
      <div
        className={`marquee-content flex w-max gap-3.5 ${
          direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'
        }`}
      >
        {repeated.map((skill, idx) => {
          const theme = PALETTE[skill.color] || PALETTE.white;
          return (
            <div
              key={`${skill.name}-${idx}`}
              style={{ backgroundColor: theme.bg, color: theme.text }}
              className="inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl border border-ink/15 shadow-sticker shrink-0 transition-transform duration-200 hover:-translate-y-1"
            >
              <span
                aria-hidden="true"
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{
                  backgroundColor:
                    skill.color === 'black' ? '#C6F432' : theme.text,
                  opacity: 0.75,
                }}
              />
              <span className="font-display font-extrabold text-sm sm:text-base tracking-tight whitespace-nowrap">
                {skill.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ToolboxSection = () => {
  return (
    <section id="toolbox" className="py-16 sm:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 mb-10">
        <div>
          <span className="inline-block px-3 py-1 rounded-full bg-orange text-ink font-mono text-xs font-bold uppercase tracking-wider border border-ink/15 mb-3">
            Skills &amp; Toolbox
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl tracking-tight text-ink">
            Stack I reach for{' '}
            <span className="font-serif italic font-normal">daily</span>.
          </h2>
        </div>
      </div>

      <div className="space-y-3">
        <MarqueeRow items={SKILLS_ROW_1} direction="left" />
        <MarqueeRow items={SKILLS_ROW_2} direction="right" />
      </div>
    </section>
  );
};

export default ToolboxSection;
