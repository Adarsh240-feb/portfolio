import React from 'react';
import { motion } from 'framer-motion';
import {
  FaReact,
  FaNode,
  FaJava,
  FaGit,
  FaGithub,
  FaHtml5,
  FaCss3Alt,
} from 'react-icons/fa';
import { SiExpress, SiMongodb, SiJavascript, SiTailwindcss, SiFirebase, SiGoogleappsscript, SiMysql } from 'react-icons/si';

const TechStack = () => {
  const technologies = [
    { name: 'React.js', icon: FaReact, color: '#61DAFB' },
    { name: 'Node.js', icon: FaNode, color: '#339933' },
    { name: 'Express.js', icon: SiExpress, color: '#000000' },
    { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
    // { name: 'Docker', icon: FaDocker, color: '#2496ED' },
    { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
    // { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
    // { name: 'Python', icon: FaPython, color: '#3776AB' },
    { name: 'Java', icon: FaJava, color: '#EC2025' },
    { name: 'Git', icon: FaGit, color: '#F05032' },
    { name: 'GitHub', icon: FaGithub, color: '#181717' },
    { name: 'MySQL', icon: SiMysql, color: '#4479A1' },
    // { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
    // { name: 'Redis', icon: SiRedis, color: '#DC382D' },
    { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
    { name: 'HTML5', icon: FaHtml5, color: '#E34F26' },
    { name: 'CSS3', icon: FaCss3Alt, color: '#1572B6' },
    // { name: 'Linux', icon: FaLinux, color: '#FCC624' },
    { name: 'Firebase', icon: SiFirebase, color: '#FFCA28' },
    { name: 'Google Apps Script', icon: SiGoogleappsscript, color: '#4285F4' },
  ];  

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="tech" className="py-12 md:py-20 bg-white dark:bg-black transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-4 text-black dark:text-white max-w-3xl mx-auto"
        >
          Here's what I use!
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 md:gap-12 max-w-4xl mx-auto mt-8"
        >
          {technologies.map((tech, index) => {
            const Icon = tech.icon;
            return (
              <motion.div
                key={tech.name}
                variants={itemVariants}
                whileHover={{ scale: 1.1, y: -10 }}
                className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center group cursor-pointer"
              >
                <Icon
                  className="text-5xl md:text-6xl mb-3 transition-colors duration-300"
                  style={{ color: tech.color }}
                />
                <span className="text-sm md:text-base font-semibold text-gray-700 dark:text-gray-300 text-center group-hover:text-black dark:group-hover:text-white transition-colors">
                  {tech.name}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default TechStack;
