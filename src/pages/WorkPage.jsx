import React from 'react';
import { motion } from 'framer-motion';

const roles = [
  {
    title: 'Open Source Contributor',
    org: 'Wikimedia ecosystem',
    period: '2025 – Present',
    type: 'Remote Contributor',
    points: [
      '7+ patches merged across Wikimedia projects.',
      'Active participation in issues, reviews, and improving contributor experience.',
    ],
  },
    {
    title: 'Technical Lead',
    org: 'WikiClubTechUIT',
    period: '2025 – Present',
    type: 'Community Leadership',
    points: [
      'Mentoring students in open‑source technologies.',
      'Guiding 50+ students through hands‑on sessions and contribution workflows.',
    ],
  },
  {
    title: 'Volunteer',
    org: 'GDG/TFUG Prayagraj',
    period: '2025 – Present',
    type: 'Community Volunteer',
    points: [
      'Organizing tech meetups and workshops for developers.',
      'Helping developers stay updated with latest technologies and best practices.',
    ],
  },

];

const Card = ({ role, i }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-100px' }}
    transition={{ duration: 0.4, delay: i * 0.05 }}
    className="bg-gray-100 dark:bg-gray-900/60 text-gray-800 dark:text-gray-100 rounded-2xl border border-gray-300 dark:border-gray-800 p-5 md:p-6"
  >
    <div className="flex items-start justify-between gap-4">
      <div>
        <h3 className="text-lg md:text-xl font-semibold text-black dark:text-white">{role.title} @ {role.org}</h3>
        <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">{role.period} · {role.type}</p>
      </div>
    </div>
    <ul className="list-disc list-outside pl-6 mt-3 space-y-2 text-sm md:text-base text-gray-700 dark:text-gray-300">
      {role.points.map((p, idx) => (
        <li key={idx}>{p}</li>
      ))}
    </ul>
  </motion.div>
);

const WorkPage = () => {
  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-300 pt-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold">Work Experience</h1>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">My professional journey and key contributions</p>
        </header>

        <div className="space-y-5">
          {roles.map((r, i) => (
            <Card role={r} i={i} key={`${r.title}-${i}`} />
          ))}
        </div>

        <footer className="text-xs text-gray-500 mt-10 mb-16">© {new Date().getFullYear()} · Adarsh Kesharwani</footer>
      </div>
    </main>
  );
};

export default WorkPage;
