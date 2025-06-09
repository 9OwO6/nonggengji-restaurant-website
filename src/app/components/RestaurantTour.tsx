'use client';

import { motion } from 'framer-motion';

const RestaurantTour = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Our Story
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            From the heart of Hunan to the shores of Vancouver, discover how we&apos;re bringing centuries of culinary tradition to life in a modern setting. Watch our journey of passion, authenticity, and innovation.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="relative aspect-video rounded-lg overflow-hidden shadow-xl"
        >
          <video
            className="w-full h-full object-cover"
            controls
            poster="/images/restaurant-poster.jpg"
          >
            <source src="/videos/restaurant-story.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Heritage</h3>
            <p className="text-gray-600">
              Rooted in 2000 years of Hunan culinary tradition, we bring authentic flavors to modern Vancouver.
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Innovation</h3>
            <p className="text-gray-600">
              Blending traditional techniques with contemporary presentation for a unique dining experience.
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Community</h3>
            <p className="text-gray-600">
              Creating a warm, welcoming space where food brings people together across cultures.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RestaurantTour; 