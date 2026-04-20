'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

const GOOGLE_MAPS_ADDRESS_URL = 'https://maps.app.goo.gl/PU1LWUoUEqyT4g5SA';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.contact')}</h3>
            <a
              href={GOOGLE_MAPS_ADDRESS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors mb-1 block leading-relaxed"
            >
              <span className="mr-1" aria-hidden>
                📍
              </span>
              4200 Number 3 Rd unit 120
              <br />
              Richmond, BC V6X 2C2
            </a>
            <p className="mb-3 mt-1">
              <a
                href={GOOGLE_MAPS_ADDRESS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-400 hover:text-gray-200 underline underline-offset-2"
              >
                {t('footer.viewOnMaps')}
              </a>
            </p>
            <p className="text-gray-300 mb-2">Phone: +1 (604) 657-7888</p>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.hours')}</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-300">{t('footer.mondayFriday')}</span>
                <span className="text-gray-300">11:00 - 14:30</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300"></span>
                <span className="text-gray-300">17:00 - 21:30</span>
              </div>
              <div className="flex justify-between mt-4">
                <span className="text-gray-300">{t('footer.saturdayUnday')}</span>
                <span className="text-gray-300">11:00 - 14:30</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300"></span>
                <span className="text-gray-300">17:00 - 21:30</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/menu" className="text-gray-300 hover:text-white transition-colors">
                  {t('nav.menu')}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link href="https://nonggengji.ca/" className="text-gray-300 hover:text-white transition-colors">
                  {t('footer.orderOnline')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Nong Geng Ji. {t('footer.allRightsReserved')}.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 