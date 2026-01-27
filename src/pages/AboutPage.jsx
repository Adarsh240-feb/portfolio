import React from 'react';
import { motion } from 'framer-motion';
import { FiCpu,FiGitPullRequest, FiAward } from 'react-icons/fi';

// Update with your actual GitHub username to show your contribution chart
const GITHUB_USERNAME = 'Adarsh240-feb';

const Section = ({ icon: Icon, title, children }) => (
  <section className="mt-10">
    <div className="flex items-center gap-3 mb-4">
      <Icon className="text-xl text-black dark:text-white" />
      <h3 className="text-xl md:text-2xl font-semibold text-black dark:text-white">{title}</h3>
    </div>
    <div className="bg-gray-50 dark:bg-gray-900/60 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
      {children}
    </div>
  </section>
);

const BulletList = ({ items }) => (
  <ul className="list-disc list-outside pl-6 space-y-2 text-gray-700 dark:text-gray-300">
    {items.map((text, i) => (
      <li key={i}>{text}</li>
    ))}
  </ul>
);

const AboutPage = () => {
  return (
    <main className="min-h-screen bg-white dark:bg-black transition-colors duration-300 pt-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-start gap-6"
        >
          <div className="flex-1">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black dark:text-white mb-3">
              Adarsh Kesharwani
            </h1>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
              Full Stack Developer · Open-source Enthusiast 
            </p>
          </div>
          {/* Avatar */}
          <img
            src="/images/AdarshP.jpeg"
            alt="Adarsh Kesharwani"
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-gray-200 dark:border-gray-800 object-cover"
          />
        </motion.div>

        {/* Intro */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-gray-700 dark:text-gray-300"
        >
          I'm A Full Stack Developer Who Enjoys Building Clean, Reliable Systems And Contributing To The Web Ecosystem.
        </motion.p>

        {/* Sections */}
        <Section icon={FiCpu} title="Technical Presence">
          <BulletList
            items={[
              'Built Websites And Web Applications For Community-Level Project Using React, Node.js, And Databases.',
              'Working On Institutional-Level Project As A Backend Developer, Focusing On Scalable Architecture And System Design.',
              'Focus On Performance, Accessibility, And Maintainable Code With Strong Testing Practices.',
            ]}
          />
        </Section>

        <Section icon={FiGitPullRequest} title="Open Source Contributions">
          <BulletList
            items={[
              '7+ Patches Merged In Wikimedia Ecosystem Through Gerrit Code Review Workflows.',
              'Tracked And Resolved Tasks Via Phabricator With Structured Issue Management.',
              'Enhanced Documentation And Developer Tooling For Community Contribution.',
            ]}
          />
        </Section>

        <Section icon={FiAward} title="Achievements">
          <BulletList
            items={[
              'Hackathons: Top 7 (Sharda University), Top 10 (United University).',
              'Coding Competition: 2nd Position in College-Level Programming Contest.',
              'Community Leadership: Core Developer @ WikiClubTech-UIT; Volunteer @ GDG/TFUG Prayagraj.',
            ]}
          />
        </Section>

        {/* GitHub Contributions */}
        <section className="mt-12">
          <h3 className="text-xl md:text-2xl font-semibold text-black dark:text-white mb-4">GitHub Contributions</h3>
          <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-4 bg-gray-50 dark:bg-gray-900/60">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Update your username in this page to display the chart.
            </p>
            <div className="overflow-x-auto">
              <img
                src={`https://ghchart.rshah.org/${GITHUB_USERNAME}`}
                alt="GitHub contribution chart"
                className="w-full max-w-3xl"
              />
            </div>
          </div>
        </section>

        <footer className="text-xs text-gray-500 dark:text-gray-500 mt-10 mb-16">
          © {new Date().getFullYear()} Adarsh Kesharwani
        </footer>
      </div>
    </main>
  );
};

export default AboutPage;
