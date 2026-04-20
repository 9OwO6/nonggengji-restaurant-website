'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect, useMemo, useCallback } from 'react';
import {
  GOOGLE_MAPS_REVIEW_URL,
  getReviewsForLanguage,
  getLocalDateKey,
  pickDailyRandomReviews,
  type CustomerReviewEntry
} from '@/data/google-reviews';
import { useLanguage } from '@/contexts/LanguageContext';

function initialsFromName(name: string): string {
  const t = name.trim();
  if (/[\u3400-\u9FFF]/.test(t)) {
    return t.slice(0, 2);
  }
  const parts = t.replace(/\./g, '').split(/\s+/).filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return t.slice(0, 2).toUpperCase();
}

function avatarHue(name: string): number {
  return name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) % 360;
}

function StarRow({ className = '' }: { className?: string }) {
  return (
    <div
      className={`flex items-center gap-0.5 ${className}`}
      aria-label="5 out of 5 stars"
      role="img"
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className="text-[#fbbc04] text-lg leading-none select-none"
          style={{ textShadow: '0 0 0.5px rgba(0,0,0,0.08)' }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

type LightboxState = {
  urls: string[];
  index: number;
};

const DAILY_SHOW_COUNT = 3;

const GoogleReviews = () => {
  const { language, t } = useLanguage();
  const pool = useMemo(() => getReviewsForLanguage(language), [language]);
  const [dayKey, setDayKey] = useState<string | null>(null);
  const [selectedReview, setSelectedReview] = useState<CustomerReviewEntry | null>(null);
  const [spotlightIndex, setSpotlightIndex] = useState(0);
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);

  useEffect(() => {
    setDayKey(getLocalDateKey());
  }, []);

  const dailyReviews = useMemo(() => {
    if (!dayKey || pool.length === 0) return [];
    return pickDailyRandomReviews(pool, dayKey, DAILY_SHOW_COUNT);
  }, [pool, dayKey]);

  const reviewCount = dailyReviews.length;

  useEffect(() => {
    setSpotlightIndex(0);
  }, [language, dayKey]);

  useEffect(() => {
    setSpotlightIndex((i) => (reviewCount === 0 ? 0 : Math.min(i, reviewCount - 1)));
  }, [reviewCount]);

  useEffect(() => {
    if (reviewCount <= 1) return;
    const id = window.setInterval(() => {
      setSpotlightIndex((i) => (i + 1) % reviewCount);
    }, 6500);
    return () => window.clearInterval(id);
  }, [reviewCount]);

  const openLightbox = useCallback((urls: string[], index: number) => {
    if (!urls.length) return;
    setLightbox({ urls, index: Math.max(0, Math.min(index, urls.length - 1)) });
  }, []);

  const closeLightbox = useCallback(() => setLightbox(null), []);

  const stepLightbox = useCallback((delta: number) => {
    setLightbox((prev) => {
      if (!prev || prev.urls.length === 0) return prev;
      const next = (prev.index + delta + prev.urls.length) % prev.urls.length;
      return { ...prev, index: next };
    });
  }, []);

  useEffect(() => {
    if (!lightbox) {
      document.body.style.overflow = '';
      return;
    }
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') stepLightbox(-1);
      if (e.key === 'ArrowRight') stepLightbox(1);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightbox, closeLightbox, stepLightbox]);

  if (pool.length === 0) {
    return null;
  }

  const spotlight = dailyReviews[spotlightIndex] ?? dailyReviews[0];

  return (
    <section className="py-20 bg-[#f8f9fa] border-t border-gray-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 tracking-tight">
            {t('reviews.title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-2">
            {t('reviews.subtitle')}
          </p>
          <p className="text-sm text-gray-500 max-w-2xl mx-auto mb-3">{t('reviews.dailyHint')}</p>
          <a
            href={GOOGLE_MAPS_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#1a73e8] hover:underline"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            {t('reviews.googleCta')}
          </a>
        </motion.div>

        <div className="max-w-3xl mx-auto mb-14 min-h-[140px]">
          {!dayKey || !spotlight ? (
            <div className="bg-white rounded-2xl border border-gray-200/90 px-6 py-5 shadow-sm animate-pulse">
              <div className="flex gap-3">
                <div className="w-11 h-11 rounded-full bg-gray-200 flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/3" />
                  <div className="h-3 bg-gray-100 rounded w-24" />
                  <div className="h-12 bg-gray-100 rounded w-full" />
                </div>
              </div>
            </div>
          ) : (
            <>
              <AnimatePresence mode="wait">
                <motion.div
                  key={spotlight.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                  className="bg-white rounded-2xl border border-gray-200/90 px-6 py-5 shadow-sm"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center text-sm font-semibold text-gray-800 ring-2 ring-white shadow"
                      style={{
                        backgroundColor: `hsl(${avatarHue(spotlight.name)} 42% 82%)`
                      }}
                    >
                      {initialsFromName(spotlight.name)}
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-1">
                        <span className="font-semibold text-gray-900">{spotlight.name}</span>
                        <VerifiedBadge label={t('reviews.verifiedBadge')} />
                      </div>
                      <StarRow className="mb-2" />
                      <p className="text-gray-700 text-sm sm:text-[15px] leading-relaxed line-clamp-3">
                        {spotlight.text}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
              <div className="flex justify-center gap-1.5 mt-4 flex-wrap">
                {dailyReviews.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSpotlightIndex(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === spotlightIndex ? 'w-6 bg-[#1a73e8]' : 'w-1.5 bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Show review ${i + 1} of ${reviewCount}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-7 max-w-5xl mx-auto">
          {!dayKey
            ? Array.from({ length: DAILY_SHOW_COUNT }).map((_, index) => (
                <div
                  key={`sk-${index}`}
                  className="bg-white rounded-2xl border border-gray-200/90 p-5 shadow-sm animate-pulse h-[280px]"
                >
                  <div className="flex gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gray-200" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-24" />
                      <div className="h-3 bg-gray-100 rounded w-16" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-100 rounded w-full" />
                    <div className="h-3 bg-gray-100 rounded w-full" />
                    <div className="h-3 bg-gray-100 rounded w-3/4" />
                  </div>
                </div>
              ))
            : dailyReviews.map((review, index) => (
            <motion.article
              key={review.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.04 }}
              whileHover={{ y: -3 }}
              className="group bg-white rounded-2xl border border-gray-200/90 p-5 shadow-[0_1px_2px_rgba(60,64,67,0.1),0_2px_6px_rgba(60,64,67,0.08)] hover:shadow-[0_2px_8px_rgba(60,64,67,0.12),0_4px_16px_rgba(60,64,67,0.08)] transition-shadow duration-300 cursor-pointer flex flex-col"
              onClick={() => setSelectedReview(review)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedReview(review);
                }
              }}
              tabIndex={0}
              role="button"
            >
              <div className="flex items-start gap-3 mb-3">
                <div
                  className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-xs font-semibold text-gray-800"
                  style={{
                    backgroundColor: `hsl(${avatarHue(review.name)} 42% 82%)`
                  }}
                >
                  {initialsFromName(review.name)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <h3 className="font-semibold text-gray-900 truncate">{review.name}</h3>
                    <span className="text-xs text-gray-500 whitespace-nowrap">{review.dateLabel}</span>
                  </div>
                  {review.reviewCount && (
                    <p className="text-xs text-gray-500 mt-0.5">{review.reviewCount}</p>
                  )}
                  <div className="mt-1.5 flex items-center gap-2 flex-wrap">
                    <StarRow />
                    <VerifiedBadge compact label={t('reviews.verifiedBadge')} />
                  </div>
                </div>
              </div>

              <p className="text-gray-700 text-sm leading-relaxed flex-1 line-clamp-5">{review.text}</p>

              {review.photoThumbs && review.photoThumbs.length > 0 && (
                <div className="flex gap-2 mt-4 pt-3 border-t border-gray-100">
                  {review.photoThumbs.slice(0, 3).map((src, i) => (
                    <button
                      key={`${review.id}-thumb-${i}`}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        openLightbox(review.photoThumbs!, i);
                      }}
                      className="relative w-16 h-16 rounded-lg overflow-hidden border border-gray-200 bg-gray-100 flex-shrink-0 cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1a73e8] ring-offset-2"
                      aria-label={`Enlarge image ${i + 1}`}
                    >
                      <Image src={src} alt="" fill className="object-cover" sizes="64px" />
                    </button>
                  ))}
                </div>
              )}
            </motion.article>
          ))}
        </div>

        <AnimatePresence>
          {selectedReview && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedReview(null)}
              className="fixed inset-0 bg-black/45 z-50 flex items-center justify-center p-4 backdrop-blur-[2px]"
            >
              <motion.div
                initial={{ scale: 0.96, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.96, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="relative bg-white rounded-2xl p-6 sm:p-8 max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-gray-100"
              >
                <button
                  type="button"
                  onClick={() => setSelectedReview(null)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 z-10"
                  aria-label="Close"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <div className="flex items-start gap-3 pr-8">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold text-gray-800 flex-shrink-0"
                    style={{ backgroundColor: `hsl(${avatarHue(selectedReview.name)} 42% 82%)` }}
                  >
                    {initialsFromName(selectedReview.name)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{selectedReview.name}</h3>
                    <p className="text-sm text-gray-500">{selectedReview.dateLabel}</p>
                    <div className="mt-2 flex items-center gap-2 flex-wrap">
                      <StarRow />
                      <VerifiedBadge label={t('reviews.verifiedBadge')} />
                    </div>
                  </div>
                </div>
                <p className="mt-6 text-gray-700 leading-relaxed">{selectedReview.text}</p>
                {selectedReview.photoThumbs && selectedReview.photoThumbs.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-6">
                    {selectedReview.photoThumbs.map((src, i) => (
                      <button
                        key={`modal-${i}`}
                        type="button"
                        onClick={() => openLightbox(selectedReview.photoThumbs!, i)}
                        className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-200 cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1a73e8]"
                        aria-label={`Enlarge photo ${i + 1}`}
                      >
                        <Image src={src} alt="" fill className="object-cover" sizes="96px" />
                      </button>
                    ))}
                  </div>
                )}
                <a
                  href={GOOGLE_MAPS_REVIEW_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex text-sm font-medium text-[#1a73e8] hover:underline"
                >
                  {t('reviews.openMaps')}
                </a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {lightbox && lightbox.urls.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/88 p-4 sm:p-8"
              onClick={closeLightbox}
              role="dialog"
              aria-modal="true"
              aria-label="Enlarged image"
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  closeLightbox();
                }}
                className="absolute top-4 right-4 z-[102] rounded-full bg-white/10 hover:bg-white/20 text-white p-2 transition-colors"
                aria-label="Close"
              >
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {lightbox.urls.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      stepLightbox(-1);
                    }}
                    className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-[102] rounded-full bg-white/10 hover:bg-white/20 text-white p-3 transition-colors"
                    aria-label="Previous image"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      stepLightbox(1);
                    }}
                    className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-[102] rounded-full bg-white/10 hover:bg-white/20 text-white p-3 transition-colors"
                    aria-label="Next image"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}

              <div
                className="relative w-full max-w-[min(96vw,1200px)] h-[min(85vh,900px)]"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={lightbox.urls[lightbox.index]}
                  alt="Review screenshot"
                  fill
                  className="object-contain"
                  sizes="(max-width: 1200px) 96vw, 1200px"
                  priority
                />
              </div>
              {lightbox.urls.length > 1 && (
                <p className="mt-4 text-sm text-white/80">
                  {lightbox.index + 1} / {lightbox.urls.length}
                </p>
              )}
              <p className="mt-2 text-xs text-white/50">{t('reviews.lightboxHint')}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

function VerifiedBadge({ compact = false, label }: { compact?: boolean; label: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full bg-gray-50 border border-gray-200/80 text-gray-600 ${
        compact ? 'text-[10px] px-1.5 py-0.5' : 'text-xs px-2 py-0.5'
      }`}
    >
      <svg
        className={compact ? 'w-3 h-3 text-green-600' : 'w-3.5 h-3.5 text-green-600'}
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
          clipRule="evenodd"
        />
      </svg>
      {label}
    </span>
  );
}

export default GoogleReviews;
