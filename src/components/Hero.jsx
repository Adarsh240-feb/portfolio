import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  const AnimatedText = ({ text, colors, direction = 'ltr' }) => {
    const chars = text.split('');
    const displayChars = direction === 'rtl' ? chars.reverse() : chars;
    
    return (
      <motion.span 
        className={`bg-gradient-to-r ${colors} bg-clip-text text-transparent inline-block`}
        animate={{
          backgroundPosition: ['0% center', '100% center', '0% center'],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{ 
          direction: direction === 'rtl' ? 'rtl' : 'ltr',
          backgroundSize: '200% 200%',
        }}
      >
        {displayChars.map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.35,
              delay: index * 0.06,
              ease: 'easeOut',
            }}
            className="inline-block"
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </motion.span>
    );
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center bg-white dark:bg-black relative overflow-hidden pt-16 transition-colors duration-300"
    >
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657 8.787 5.07 13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM16.686 0L10.2 6.485 11.616 7.9l7.9-7.9h-2.83zm20.97 0l9.315 9.314-1.414 1.414L34.828 0h2.83zM22.344 0L13.03 9.314l1.414 1.414L25.172 0h-2.83zM32 0l12.142 12.142-1.414 1.414L30 .828 17.272 13.556 15.858 12.14 28 0h4zm-7.03 0L10.686 14.284 9.272 12.87 22.344 0h2.626z' fill='%23000000' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-black dark:text-white mb-6 leading-tight"
          >
            Hello I'm <AnimatedText text="Adarsh Kesharwani" colors="from-blue-500 via-purple-500 to-pink-500" direction="ltr" />,
            <br />
            I'm a <AnimatedText text="Full Stack Developer" colors="from-green-500 via-cyan-500 to-blue-500" direction="rtl" />,
            <br />
            and I love building things for the web.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base sm:text-lg md:text-2xl lg:text-3xl text-gray-700 dark:text-gray-300 mb-8"
          >
            Welcome to my space!
          </motion.p>

          <motion.a
            href="#tech"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-black dark:bg-white text-white dark:text-black rounded-full font-semibold text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#tech').scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Explore my tech stack →
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
