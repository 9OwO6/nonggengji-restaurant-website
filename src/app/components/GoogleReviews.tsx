'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const reviews = [
  {
    id: 1,
    name: 'Sarah Johnson',
    rating: 5,
    date: '2 weeks ago',
    text: 'The authentic Hunan flavors here are incredible! The fish head dish is a must-try. The service was excellent and the atmosphere is perfect for both casual and special occasions.',
  },
  {
    id: 2,
    name: 'Michael Chen',
    rating: 5,
    date: '1 month ago',
    text: 'Best Hunan cuisine in Vancouver! The Dong\'an chicken is perfectly spiced and the ingredients are always fresh. The staff is very knowledgeable about the menu.',
  },
  {
    id: 3,
    name: 'Emily Thompson',
    rating: 5,
    date: '2 months ago',
    text: 'I\'ve been coming here for years and the quality never disappoints. The Kung Pao chicken is my favorite, and the portion sizes are generous. Great value for authentic Chinese food!',
  },
  {
    id: 4,
    name: 'David Wilson',
    rating: 5,
    date: '3 months ago',
    text: 'The restaurant has a great atmosphere and the food is consistently excellent. The spicy dishes are authentic and the staff is always friendly and helpful.',
  },
];

const GoogleReviews = () => {
  const [currentReview, setCurrentReview] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const renderStars = (rating: number) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <div className="flex items-center justify-center space-x-1 text-yellow-400 text-2xl mb-4">
            {renderStars(5)}
          </div>
          <p className="text-gray-600">
            Based on {reviews.length} Google Reviews
          </p>
        </div>

        <div className="relative h-64">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentReview}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <div className="bg-gray-50 rounded-lg p-8 shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {reviews[currentReview].name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {reviews[currentReview].date}
                    </p>
                  </div>
                  <div className="text-yellow-400">
                    {renderStars(reviews[currentReview].rating)}
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "{reviews[currentReview].text}"
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center mt-8 space-x-2">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentReview(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                currentReview === index ? 'bg-red-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GoogleReviews; 