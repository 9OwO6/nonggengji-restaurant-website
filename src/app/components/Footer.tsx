'use client';

import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-gray-300 mb-2">4200 Number 3 Rd unit 120</p>
            <p className="text-gray-300 mb-2">Richmond, BC V6X 2C2</p>
            <p className="text-gray-300 mb-2">Phone: +1 (604) 657-7888</p>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Hours</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-300">Monday - Friday</span>
                <span className="text-gray-300">11:00 - 14:30</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300"></span>
                <span className="text-gray-300">17:00 - 21:30</span>
              </div>
              <div className="flex justify-between mt-4">
                <span className="text-gray-300">Saturday - Sunday</span>
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
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/menu" className="text-gray-300 hover:text-white transition-colors">
                  Menu
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="https://nonggengji.ca/" className="text-gray-300 hover:text-white transition-colors">
                  Order Online
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Farmer&apos;s Journal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 