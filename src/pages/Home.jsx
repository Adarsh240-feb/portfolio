import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import WorkSection from '../components/WorkSection';
import AboutSection from '../components/AboutSection';
import ToolboxSection from '../components/ToolboxSection';
import ProcessSection from '../components/ProcessSection';
import ExperienceSection from '../components/ExperienceSection';
import ContactSection from '../components/ContactSection';
import { scrollToSection } from '../components/Navbar';

const Home = ({ initialSection = null }) => {
  useEffect(() => {
    if (initialSection) {
      const id = setTimeout(() => scrollToSection(initialSection), 80);
      return () => clearTimeout(id);
    }
  }, [initialSection]);

  return (
    <main>
      <Hero />
      <WorkSection />
      <AboutSection />
      <ToolboxSection />
      <ProcessSection />
      <ExperienceSection />
      <ContactSection />
    </main>
  );
};

export default Home;
