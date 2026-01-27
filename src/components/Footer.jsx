import React from 'react';
import { FaLinkedin, FaGithub,FaInstagram } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'LinkedIn',
      url: 'hhttps://www.linkedin.com/in/adarsh-kesharwani-bba666315',
      icon: FaLinkedin,
    },
    {
      name: 'GitHub',
      url: 'https://github.com/Adarsh240-feb',
      icon: FaGithub,
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/just_adarshhh',
      icon: FaInstagram,
    },
  ];

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-black dark:text-white py-8 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-gray-600 dark:text-gray-400 text-center md:text-left">
            &copy; {currentYear} • Adarsh Kesharwani
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-300"
                  aria-label={social.name}
                >
                  <Icon className="text-2xl" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
