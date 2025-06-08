'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: 'About', href: '#about' },
    { name: 'Dishes', href: '#dishes' },
    { name: 'Media', href: '#media' },
    { name: 'Order Online', href: 'https://nonggengji.ca/', external: true },
  ];

  return (
    <nav className="fixed w-full bg-white/90 backdrop-blur-sm z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-red-600">Nong Geng Ji</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              item.external ? (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {item.name}
                </Link>
              )
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-red-600 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        className="md:hidden"
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={{
          open: { opacity: 1, height: "auto" },
          closed: { opacity: 0, height: 0 }
        }}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {menuItems.map((item) => (
            item.external ? (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-red-600 block px-3 py-2 rounded-md text-base font-medium"
              >
                {item.name}
              </a>
            ) : (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-red-600 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            )
          ))}
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar; 