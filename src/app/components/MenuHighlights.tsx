'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const dishes = [
  {
    name: 'Chairman Mao\'s Red Braised Pork',
    description: 'Signature Hunan dish featuring tender pork belly braised in soy sauce and spices',
    image: '/images/dish-1.png',
  },
  {
    name: 'Spicy Fish Head',
    description: 'Fresh fish head cooked with Hunan chili peppers and aromatic spices',
    image: '/images/dish-2.png',
  },
  {
    name: 'Dry Pot Chicken',
    description: 'Crispy chicken stir-fried with dried chili peppers and Sichuan peppercorns',
    image: '/images/dish-3.png',
  },
  {
    name: 'Steamed Fish with Chopped Chili',
    description: 'Fresh fish steamed with Hunan-style chopped chili sauce',
    image: '/images/dish-4.png',
  },
];

const MenuHighlights = () => {
  return (
    <section id="dishes" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
          >
            Signature Dishes
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            Discover our most popular dishes, each prepared with authentic Hunan flavors and techniques
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {dishes.map((dish, index) => (
            <motion.div
              key={dish.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="relative h-48">
                <Image
                  src={dish.image}
                  alt={dish.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{dish.name}</h3>
                <p className="text-gray-600">{dish.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <motion.a
            href="https://nonggengji.ca/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-red-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-red-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Full Menu
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default MenuHighlights; 