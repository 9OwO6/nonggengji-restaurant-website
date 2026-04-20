'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

const WAITLIST_URL =
  'https://www.hostpad.abcpos.com/status/56cfe577e7b84d84b722bf0540194124';

const WaitlistSection = () => {
  const { t } = useLanguage();

  return (
    <section
      id="waitlist"
      className="relative overflow-hidden py-16 md:py-24"
      aria-labelledby="waitlist-heading"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900 to-black" aria-hidden />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(185,28,28,0.12)_0%,_transparent_55%)]"
        aria-hidden
      />
      <div className="absolute inset-0 backdrop-blur-[1px] bg-black/20" aria-hidden />

      <div className="relative z-10 max-w-lg mx-auto px-4 sm:px-6 text-center">
        <motion.h2
          id="waitlist-heading"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="text-sm font-semibold tracking-widest uppercase text-red-400/90 mb-3"
        >
          {t('waitlist.kicker')}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="text-2xl sm:text-3xl font-bold text-white mb-10"
        >
          {t('waitlist.title')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.1 }}
        >
          <a
            href={WAITLIST_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center min-w-[220px] px-10 py-4 rounded-full bg-red-600 text-white text-lg font-semibold shadow-[0_8px_30px_-6px_rgba(220,38,38,0.55)] hover:bg-red-500 hover:shadow-[0_12px_40px_-8px_rgba(220,38,38,0.6)] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950"
          >
            {t('waitlist.cta')}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.18 }}
          className="mt-10 flex justify-center"
        >
          <div className="relative w-[200px] h-[200px] sm:w-[220px] sm:h-[220px] rounded-xl overflow-hidden ring-1 ring-white/15 shadow-2xl bg-white p-2">
            <Image
              src="/images/waitlist-qr.png"
              alt={t('waitlist.qrAlt')}
              width={220}
              height={220}
              className="object-contain w-full h-full"
              priority={false}
            />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.22 }}
          className="mt-8 text-sm sm:text-[15px] text-gray-400 max-w-md mx-auto leading-relaxed"
        >
          {t('waitlist.helper')}
        </motion.p>
      </div>
    </section>
  );
};

export default WaitlistSection;
