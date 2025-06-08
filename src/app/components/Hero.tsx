'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const Hero = () => {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="Nong Geng Ji Restaurant"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            Authentic Hunan Cuisine
            <br />
            in Vancouver
          </h1>
          <p className="text-xl sm:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
            Experience the rich flavors and traditions of Hunan cuisine in the heart of Vancouver
          </p>
          <motion.a
            href="https://nonggengji.ca/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-red-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-red-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Order Now
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero; 