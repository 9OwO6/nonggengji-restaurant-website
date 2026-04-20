'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

const block = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-48px' },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }
};

const OurStory = () => {
  const { t } = useLanguage();

  return (
    <section
      id="about"
      className="relative py-20 md:py-24 overflow-hidden bg-gradient-to-b from-white via-amber-50/25 to-orange-50/20"
      aria-labelledby="our-story-heading"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/60 to-transparent"
        aria-hidden
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-14 xl:gap-16 items-center">
          <motion.div {...block} transition={{ ...block.transition, delay: 0.05 }} className="order-2 lg:order-1">
            <p className="text-sm font-medium tracking-wide text-amber-800/90 uppercase mb-3">
              Nong Geng Ji · Hunan
            </p>
            <h2
              id="our-story-heading"
              className="text-3xl sm:text-4xl font-bold tracking-tight mb-6 bg-gradient-to-r from-gray-900 via-amber-900/95 to-red-900/90 bg-clip-text text-transparent"
            >
              {t('ourStory.title')}
            </h2>

            <div className="space-y-4 text-gray-700 text-[15px] sm:text-base leading-relaxed">
              <p>{t('ourStory.p1')}</p>
              <p>{t('ourStory.p2')}</p>
              <p>{t('ourStory.p3')}</p>
            </div>

            <motion.blockquote
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.45 }}
              className="mt-8 pl-4 border-l-[3px] border-amber-600/85 rounded-sm"
            >
              <p className="text-sm font-semibold text-gray-900 mb-1">{t('ourStory.missionLead')}</p>
              <p className="text-gray-800 italic leading-relaxed">{t('ourStory.mission')}</p>
            </motion.blockquote>
          </motion.div>

          <motion.div
            {...block}
            transition={{ ...block.transition, delay: 0.12 }}
            className="order-1 lg:order-2"
          >
            <div className="relative aspect-[4/5] sm:aspect-[5/6] max-h-[420px] lg:max-h-none rounded-2xl overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.18)] ring-1 ring-black/5">
              <Image
                src="/images/qccxg.jpg"
                alt={t('ourStory.imageAlt')}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority={false}
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-amber-900/10"
                aria-hidden
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
