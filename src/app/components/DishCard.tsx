'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import type { MenuItem } from '@/data/menu-db';
import { getDishName, getDishDescription } from '@/data/menu-db';

interface DishCardProps {
  dish: MenuItem;
}

const DishCard = ({ dish }: DishCardProps) => {
  const { t, language } = useLanguage();
  const [imageError, setImageError] = useState(false);

  const renderSpiceLevel = (level: number) => {
    if (level === 0) return <span className="text-sm text-gray-500">{t('menu.spiceLevel.none')}</span>;
    return <span>{'🌶️'.repeat(level)}</span>;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 w-full bg-gray-100">
        {!imageError ? (
          <Image
            src={dish.image}
            alt={getDishName(dish, language)}
            fill
            className="object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center p-4">
              <p className="text-gray-500 text-sm">Image coming soon</p>
            </div>
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{getDishName(dish, language)}</h3>
          <span className="text-red-600 font-medium">{dish.price}</span>
        </div>
        <p className="text-gray-600 text-sm mb-3">{getDishDescription(dish, language)}</p>

        <div className="mb-3">
          <div className="text-sm text-gray-500 mb-1">Spice</div>
          <div className="text-lg">{renderSpiceLevel(dish.spicy_level)}</div>
        </div>

        <div className="flex flex-wrap gap-2">
          {dish.is_signature && (
            <span className="px-2 py-1 bg-amber-100 text-amber-900 text-xs rounded-full">⭐ {t('menu.tag.signature')}</span>
          )}
          {dish.is_recommended && (
            <span className="px-2 py-1 bg-orange-100 text-orange-900 text-xs rounded-full">🔥 {t('menu.tag.recommended')}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default DishCard;
