'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getFeaturedDishes, getDishName, getDishDescription, type MenuItem } from '@/data/menu-db';

const MenuHighlights = () => {
  const { t, language } = useLanguage();
  const dishes: MenuItem[] = useMemo(() => getFeaturedDishes(), []);

  return (
    <section id="menu" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            {t('menu.highlights.title')}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            {t('menu.highlights.subtitle')}
          </motion.p>
        </div>

        {dishes.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-500 text-lg">{t('common.loading')}</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {dishes.map((dish, index) => (
                <motion.article
                  key={dish.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="group rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
                >
                  <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100">
                    <Image
                      src={dish.image}
                      alt={getDishName(dish, language)}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                    <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                      {dish.is_signature && (
                        <span className="rounded-full bg-amber-500 text-gray-950 text-xs font-bold px-2.5 py-1 shadow">
                          ⭐ {t('menu.tag.signature')}
                        </span>
                      )}
                      {dish.is_recommended && (
                        <span className="rounded-full bg-orange-600 text-white text-xs font-bold px-2.5 py-1 shadow">
                          🔥 {t('menu.tag.recommended')}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{getDishName(dish, language)}</h3>

                    {getDishDescription(dish, language) ? (
                      <p className="text-gray-600 mb-4 line-clamp-2 text-sm">{getDishDescription(dish, language)}</p>
                    ) : (
                      <div className="mb-4" />
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        {dish.spicy_level > 0 ? (
                          <span className="text-lg" aria-hidden>
                            {'🌶️'.repeat(dish.spicy_level)}
                          </span>
                        ) : (
                          <span className="text-xs text-gray-400">{t('menu.spiceLevel.none')}</span>
                        )}
                      </div>

                      <span className="text-lg font-semibold text-red-600 tabular-nums">{dish.price}</span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-gray-900 text-gray-100 p-8 md:p-10 rounded-2xl shadow-xl max-w-2xl mx-auto border border-white/10">
                <h3 className="text-2xl font-bold mb-4">{t('menu.highlights.ctaTitle')}</h3>

                <p className="text-gray-400 mb-6">{t('menu.highlights.ctaSubtitle')}</p>

                <Link href="/menu">
                  <motion.span
                    className="inline-flex items-center px-8 py-3 bg-red-600 text-white font-semibold rounded-full hover:bg-red-500 transition-colors duration-300 shadow-lg shadow-red-900/30"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="mr-2" aria-hidden>
                      📖
                    </span>
                    {t('menu.viewFullMenu')}
                  </motion.span>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
};

export default MenuHighlights;
