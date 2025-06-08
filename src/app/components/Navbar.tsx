'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-red-600">
            Nong Geng Ji
          </Link>

          <div className="hidden md:flex space-x-8">
            <Link
              href="/#about"
              className={`text-sm font-medium ${
                isScrolled ? 'text-gray-900' : 'text-white'
              } hover:text-red-600 transition-colors`}
            >
              About
            </Link>
            <Link
              href="/#menu"
              className={`text-sm font-medium ${
                isScrolled ? 'text-gray-900' : 'text-white'
              } hover:text-red-600 transition-colors`}
            >
              Menu
            </Link>
            <Link
              href="/#media"
              className={`text-sm font-medium ${
                isScrolled ? 'text-gray-900' : 'text-white'
              } hover:text-red-600 transition-colors`}
            >
              Gallery
            </Link>
            <Link
              href="/#contact"
              className={`text-sm font-medium ${
                isScrolled ? 'text-gray-900' : 'text-white'
              } hover:text-red-600 transition-colors`}
            >
              Contact
            </Link>
          </div>

          <div className="md:hidden">
            <button
              className={`p-2 rounded-md ${
                isScrolled ? 'text-gray-900' : 'text-white'
              }`}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar; 