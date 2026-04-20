'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  getMenuData,
  getDishName,
  getDishDescription,
  getSectionTitle,
  type MenuItem,
  type MenuData,
  type MenuSection,
} from '@/data/menu-db';

const spiceLabelKey = (
  level: 0 | 1 | 2 | 3
): 'menu.spiceLevel.none' | 'menu.spiceLevel.mild' | 'menu.spiceLevel.medium' | 'menu.spiceLevel.hot' => {
  if (level === 0) return 'menu.spiceLevel.none';
  if (level === 1) return 'menu.spiceLevel.mild';
  if (level === 2) return 'menu.spiceLevel.medium';
  return 'menu.spiceLevel.hot';
};

const PAPER_MENU_IMAGES = ['/menu/paper_menu/n1.png', '/menu/paper_menu/n2.png'] as const;

const MenuPage = () => {
  const { t, language } = useLanguage();
  const menuData: MenuData = useMemo(() => getMenuData(), []);
  const [selectedSlug, setSelectedSlug] = useState<string>('');
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);
  const [paperLightboxIndex, setPaperLightboxIndex] = useState<number | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    if (menuData.sections.length > 0) {
      setSelectedSlug(menuData.sections[0].slug);
    }
  }, [menuData]);

  useEffect(() => {
    const onScroll = () => {
      setShowBackToTop(window.scrollY > 480);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    if (paperLightboxIndex === null) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPaperLightboxIndex(null);
      if (e.key === 'ArrowLeft' && paperLightboxIndex > 0) {
        setPaperLightboxIndex(paperLightboxIndex - 1);
      }
      if (e.key === 'ArrowRight' && paperLightboxIndex < PAPER_MENU_IMAGES.length - 1) {
        setPaperLightboxIndex(paperLightboxIndex + 1);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [paperLightboxIndex]);

  const scrollToSection = (section: MenuSection) => {
    setSelectedSlug(section.slug);
    document.getElementById(`section-${section.slug}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToPaperMenu = () => {
    document.getElementById('paper-menu')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const backToTop = () => {
    // Jump to top immediately per UX request.
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 via-emerald-50/35 to-stone-100 text-stone-900">
      <div className="fixed top-0 left-0 right-0 z-50 border-b border-stone-200/90 bg-white/90 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 py-3 sm:h-auto sm:py-0 sm:min-h-[4rem]">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 shrink-0">
              <Link
                href="/"
                prefetch={false}
                className="flex items-center text-stone-700 hover:text-stone-950 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span className="ml-2 font-medium">{t('nav.backToHome')}</span>
              </Link>
              <button
                type="button"
                onClick={scrollToPaperMenu}
                className="text-sm font-medium rounded-full px-3 py-1.5 border border-emerald-200 bg-emerald-50/90 text-emerald-900 hover:bg-emerald-100/90 transition-colors"
              >
                {t('menu.paperMenu.nav')}
              </button>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0 -mx-1 px-1 scrollbar-thin scrollbar-thumb-stone-300/80">
              {menuData.sections.map((section) => {
                const active = selectedSlug === section.slug;
                return (
                  <button
                    key={section.slug}
                    type="button"
                    onClick={() => scrollToSection(section)}
                    className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                      active
                        ? 'bg-red-600 text-white shadow-md shadow-red-900/25'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200/90 border border-stone-200/80'
                    }`}
                  >
                    {getSectionTitle(section, language)}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="pt-28 sm:pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-14 md:mb-20"
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-stone-900 mb-4 tracking-tight">{t('menu.page.title')}</h1>
            <p className="text-lg text-stone-600 max-w-3xl mx-auto leading-relaxed">{t('menu.page.subtitle')}</p>
          </motion.div>

          <motion.section
            id="paper-menu"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="mb-16 md:mb-20 scroll-mt-36"
          >
            <div className="rounded-3xl border border-emerald-200/70 bg-white/85 backdrop-blur-sm shadow-lg shadow-emerald-900/5 p-6 md:p-8">
              <div className="text-center mb-8">
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-emerald-800/90 mb-2">
                  {t('menu.paperMenu.kicker')}
                </p>
                <h2 className="text-2xl md:text-3xl font-bold text-stone-900">{t('menu.paperMenu.title')}</h2>
                <p className="mt-2 text-stone-600 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
                  {t('menu.paperMenu.subtitle')}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {PAPER_MENU_IMAGES.map((src, index) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setPaperLightboxIndex(index)}
                    className="group relative w-full rounded-2xl overflow-hidden border border-stone-200 bg-stone-50 shadow-inner min-h-[280px] md:min-h-[360px] text-left cursor-zoom-in transition-shadow hover:shadow-lg hover:border-emerald-300/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
                    aria-label={`${t('menu.paperMenu.title')} ${index + 1}. ${t('menu.paperMenu.tapToEnlarge')}`}
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      className="object-contain p-3 md:p-4 pointer-events-none"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <span className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-stone-900/75 px-3 py-1.5 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100 md:opacity-90">
                      {t('menu.paperMenu.tapToEnlarge')}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </motion.section>

          {menuData.sections.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-stone-500">{t('common.loading')}</p>
            </div>
          ) : (
            menuData.sections.map((section) => (
              <section key={section.slug} id={`section-${section.slug}`} className="mb-20 md:mb-28 scroll-mt-36">
                <motion.h2
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  className="text-2xl sm:text-3xl font-bold text-stone-900 mb-10 text-center md:text-left border-b border-stone-200 pb-4"
                >
                  {getSectionTitle(section, language)}
                </motion.h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                  {section.items.map((item, index) => {
                    const desc = getDishDescription(item, language);
                    return (
                      <motion.article
                        key={item.id}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.35) }}
                        className="group relative flex flex-col rounded-2xl overflow-hidden bg-white border border-stone-200/90 shadow-md hover:shadow-xl hover:shadow-stone-300/50 hover:scale-[1.02] transition-all duration-300"
                      >
                        <button
                          type="button"
                          onClick={() => setSelectedDish(item)}
                          className="text-left flex flex-col flex-1 min-h-0"
                        >
                          <div className="relative z-0 aspect-[4/3] w-full overflow-hidden bg-stone-100">
                            <Image
                              src={item.image}
                              alt={getDishName(item, language)}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                              sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                            <div className="absolute top-3 left-3 flex flex-wrap gap-2 z-10">
                              {item.is_signature && (
                                <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/95 text-gray-950 text-xs font-bold px-2.5 py-1 shadow-lg">
                                  ⭐ {t('menu.tag.signature')}
                                </span>
                              )}
                              {item.is_recommended && (
                                <span className="inline-flex items-center gap-1 rounded-full bg-orange-600/95 text-white text-xs font-bold px-2.5 py-1 shadow-lg">
                                  🔥 {t('menu.tag.recommended')}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="p-5 md:p-6 flex flex-col flex-1">
                            <div className="flex items-start justify-between gap-3 mb-2">
                              <h3 className="text-lg md:text-xl font-semibold text-stone-900 leading-snug">
                                {getDishName(item, language)}
                              </h3>
                              <span className="text-lg font-bold text-red-600 shrink-0 tabular-nums">{item.price}</span>
                            </div>
                            {desc ? (
                              <p className="text-sm text-stone-600 line-clamp-3 mb-4 flex-1">{desc}</p>
                            ) : (
                              <div className="mb-4 flex-1" />
                            )}
                            <div className="flex items-center justify-between pt-2 border-t border-stone-100 mt-auto">
                              <span className="text-lg leading-none" aria-hidden>
                                {item.spicy_level > 0 ? '🌶️'.repeat(item.spicy_level) : undefined}
                                {item.spicy_level === 0 && <span className="text-stone-400 text-sm">—</span>}
                              </span>
                              <span className="text-xs text-stone-500">{t(spiceLabelKey(item.spicy_level))}</span>
                            </div>
                          </div>
                        </button>
                      </motion.article>
                    );
                  })}
                </div>
              </section>
            ))
          )}
        </div>
      </div>

      {paperLightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={t('menu.paperMenu.title')}
        >
          <div
            role="presentation"
            className="absolute inset-0 bg-stone-950/80 backdrop-blur-sm"
            onClick={() => setPaperLightboxIndex(null)}
          />

          <button
            type="button"
            onClick={() => setPaperLightboxIndex(null)}
            className="absolute top-4 right-4 z-10 rounded-full bg-white p-2.5 text-stone-700 shadow-lg transition-colors hover:bg-stone-100 hover:text-red-600 border border-stone-200"
            aria-label={t('menu.paperMenu.closeLightbox')}
          >
            <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {PAPER_MENU_IMAGES.length > 1 && paperLightboxIndex > 0 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setPaperLightboxIndex(paperLightboxIndex - 1);
              }}
              className="absolute left-2 sm:left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/95 p-3 text-stone-800 shadow-lg border border-stone-200 hover:bg-emerald-50 transition-colors hidden sm:block"
              aria-label={t('menu.paperMenu.prev')}
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          {PAPER_MENU_IMAGES.length > 1 && paperLightboxIndex < PAPER_MENU_IMAGES.length - 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setPaperLightboxIndex(paperLightboxIndex + 1);
              }}
              className="absolute right-2 sm:right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/95 p-3 text-stone-800 shadow-lg border border-stone-200 hover:bg-emerald-50 transition-colors hidden sm:block"
              aria-label={t('menu.paperMenu.next')}
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="relative z-[1] h-[min(90vh,960px)] w-full max-w-6xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={PAPER_MENU_IMAGES[paperLightboxIndex]}
              alt={`${t('menu.paperMenu.title')} ${paperLightboxIndex + 1}`}
              fill
              className="object-contain drop-shadow-2xl"
              sizes="100vw"
              priority
            />
          </motion.div>

          {PAPER_MENU_IMAGES.length > 1 && (
            <div className="relative z-[1] mt-4 flex flex-col items-center gap-3 sm:hidden">
              <p className="text-center text-xs text-stone-300">
                {paperLightboxIndex + 1} / {PAPER_MENU_IMAGES.length}
              </p>
              <div className="flex gap-3">
                {paperLightboxIndex > 0 && (
                  <button
                    type="button"
                    onClick={() => setPaperLightboxIndex(paperLightboxIndex - 1)}
                    className="rounded-full bg-white/95 px-5 py-2 text-sm font-medium text-stone-800 shadow border border-stone-200"
                  >
                    {t('menu.paperMenu.prev')}
                  </button>
                )}
                {paperLightboxIndex < PAPER_MENU_IMAGES.length - 1 && (
                  <button
                    type="button"
                    onClick={() => setPaperLightboxIndex(paperLightboxIndex + 1)}
                    className="rounded-full bg-white/95 px-5 py-2 text-sm font-medium text-stone-800 shadow border border-stone-200"
                  >
                    {t('menu.paperMenu.next')}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {selectedDish && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          onClick={() => setSelectedDish(null)}
        >
          <div className="absolute inset-0 bg-stone-900/55 backdrop-blur-sm" />

          <button
            type="button"
            onClick={() => setSelectedDish(null)}
            className="absolute top-4 right-4 text-stone-700 hover:text-red-600 transition-colors z-10 rounded-full p-2 bg-white shadow-md border border-stone-200"
            aria-label="Close"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <motion.div
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            className="relative max-w-4xl w-full max-h-[90vh] overflow-hidden rounded-2xl bg-white border border-stone-200 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col lg:flex-row max-h-[90vh] overflow-y-auto lg:overflow-hidden">
              <div className="relative w-full lg:w-3/5 aspect-[4/3] lg:aspect-auto lg:min-h-[320px] shrink-0 bg-stone-100">
                <Image
                  src={selectedDish.image}
                  alt={getDishName(selectedDish, language)}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              </div>

              <div className="w-full lg:w-2/5 p-6 md:p-8 flex flex-col">
                <div className="flex flex-wrap gap-2 mb-3">
                  {selectedDish.is_signature && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/95 text-gray-950 text-xs font-bold px-2.5 py-1">
                      ⭐ {t('menu.tag.signature')}
                    </span>
                  )}
                  {selectedDish.is_recommended && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-orange-600/95 text-white text-xs font-bold px-2.5 py-1">
                      🔥 {t('menu.tag.recommended')}
                    </span>
                  )}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-stone-900 mb-2">
                  {getDishName(selectedDish, language)}
                </h3>
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-2 text-xl">
                    {selectedDish.spicy_level > 0 ? '🌶️'.repeat(selectedDish.spicy_level) : null}
                    <span className="text-sm text-stone-500">{t(spiceLabelKey(selectedDish.spicy_level))}</span>
                  </div>
                  <span className="text-2xl font-bold text-red-600 tabular-nums">{selectedDish.price}</span>
                </div>
                {getDishDescription(selectedDish, language) ? (
                  <div className="space-y-4 flex-1">
                    <div>
                      <h4 className="text-sm font-semibold text-stone-500 uppercase tracking-wide mb-2">
                        {t('common.description')}
                      </h4>
                      <p className="text-stone-700 leading-relaxed">{getDishDescription(selectedDish, language)}</p>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {showBackToTop && (
        <button
          type="button"
          onClick={backToTop}
          aria-label="Back to top"
          className="fixed right-5 bottom-6 z-[70] h-12 w-12 rounded-full bg-red-600 text-white text-xl shadow-xl shadow-red-950/30 hover:bg-red-500 transition-colors duration-200 border border-red-500/30"
        >
          🚀
        </button>
      )}
    </div>
  );
};

export default MenuPage;
