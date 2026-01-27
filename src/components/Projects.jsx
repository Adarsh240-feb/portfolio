import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: 'UIT-MAP',
      description: 'An institutional-level project designed for grading final year projects at the university. I worked as a developer on this website, implementing features for project submission, evaluation workflows, and assessment management.',
      image: '/images/uit.png',
      tags: ['PHP', 'HTML', 'CSS', 'MySQL'],
      github: 'https://github.com/Adarsh240-feb/UIT-MAP',
      demo: 'https://uitmap.com/',
      gradient: 'from-blue-500 to-purple-600',
    },
    {
      id: 2,
      title: 'WikiClubTech UIT',
      description: 'A national-level community website for WikiClubTech UIT that showcases the club and features a live contribution board displaying real-time contributions to the Wikimedia ecosystem by club members.',
      image: '/images/wikimainlogo.png',
      tags: ['React', 'Tailwind CSS', 'Node.js', 'MongoDB', 'AppScript'],
      github: 'https://github.com/Adarsh240-feb/WikiWebsite',
      demo: 'https://wikiclubtechuit.org/',
      gradient: 'from-purple-500 to-pink-600',
    },
    {
      id: 3,
      title: 'FlavourFlow',
      description: 'A full-stack food delivery platform with real-time order tracking, restaurant management, and secure payment integration for seamless food ordering experiences.',
      image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&h=600&fit=crop',
      tags: ['JavaScript', 'Express', 'API Integration'],
      github: 'https://github.com/Adarsh240-feb/FOODDEL',
      demo: 'https://flavourflow.vercel.app/',
      gradient: 'from-cyan-500 to-blue-600',
    },
    // {
    //   id: 4,
    //   title: 'Social Media Platform',
    //   description: 'I built a social networking platform with features like posts, comments, likes, and real-time messaging.',
    //   image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop',
    //   tags: ['React', 'Socket.io', 'PostgreSQL'],
    //   github: 'https://github.com',
    //   demo: 'https://demo.com',
    //   gradient: 'from-pink-500 to-rose-600',
    // },
  ];

  return (
    <section id="projects" className="py-20 md:py-32 bg-white dark:bg-black transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title Section */}
        <div className="text-center mb-16">
          {/* <motion.span
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 mb-4 text-sm font-semibold text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30 rounded-full"
          >
            Portfolio Showcase
          </motion.span> */}

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-purple-600 to-gray-900 dark:from-white dark:via-purple-300 dark:to-white bg-clip-text text-transparent"
          >
            Here are things I've worked on!
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto"
          >
            Explore my featured projects showcasing modern web development and innovative solutions
          </motion.p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 group border border-gray-200 dark:border-gray-800"
            >
              {/* Project Image */}
              <div className="relative overflow-hidden h-64">
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-300`} />
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Overlay with links */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-200"
                  >
                    <FaGithub className="text-2xl" />
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-200"
                  >
                    <FaExternalLinkAlt className="text-2xl" />
                  </a>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-8">
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-600 dark:group-hover:from-purple-400 group-hover:to-pink-600 dark:group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300">
                  {project.title}
                </h3>
                
                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed text-base">
                  {project.description}
                </p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-3">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-4 py-2 bg-gradient-to-r ${project.gradient} text-white text-sm font-semibold rounded-full shadow-md hover:scale-110 hover:shadow-lg transition-all duration-200 cursor-default`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 dark:text-gray-400 text-lg font-medium">
            Interested in collaborating? Let's build something amazing together! 🚀
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
