'use client';

import { motion } from 'framer-motion';

const Media = () => {
  return (
    <section id="media" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
          >
            Restaurant Tour
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            Take a virtual tour of our restaurant and experience the warm atmosphere
            and authentic Hunan dining environment.
          </motion.p>
        </div>

        <div className="relative aspect-video w-full max-w-4xl mx-auto rounded-lg overflow-hidden shadow-xl">
          <video
            className="w-full h-full object-cover"
            controls
            poster="/images/resturant-interior.jpg"
          >
            <source src="/videos/resturant-tour.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  );
};

export default Media; 