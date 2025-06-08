'use client';

import Image from 'next/image';
import { Dish } from '@/data/menu';
import { useState } from 'react';

interface DishCardProps {
  dish: Dish;
}

const DishCard = ({ dish }: DishCardProps) => {
  const [imageError, setImageError] = useState(false);

  const renderSpiceLevel = (level: number) => {
    return '🌶️'.repeat(level) + '○'.repeat(3 - level);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 w-full bg-gray-100">
        {!imageError ? (
          <Image
            src={dish.image}
            alt={dish.name}
            fill
            className="object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center p-4">
              <svg
                className="w-12 h-12 text-gray-400 mx-auto mb-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="text-gray-500 text-sm">Image coming soon</p>
            </div>
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{dish.name}</h3>
          <span className="text-red-600 font-medium">{dish.price}</span>
        </div>
        <p className="text-gray-600 text-sm mb-3">{dish.description}</p>
        
        <div className="mb-3">
          <div className="text-sm text-gray-500 mb-1">Spice Level:</div>
          <div className="text-lg">{renderSpiceLevel(dish.spiceLevel)}</div>
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          {dish.tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="space-y-1">
          {dish.highlights.map((highlight, index) => (
            <div key={index} className="flex items-center text-sm text-gray-600">
              <svg
                className="h-4 w-4 text-red-600 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              {highlight}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DishCard; 