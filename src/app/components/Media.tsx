'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const Media = () => {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  if (!isClient) {
    return null;
  }

  return (
    <section id="media" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
          >
            Experience Nong Geng Ji
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            Watch our video tour and enjoy some traditional Chinese music
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Video Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative rounded-lg overflow-hidden shadow-lg"
          >
            <video
              ref={videoRef}
              className="w-full"
              poster="/images/video-poster.jpg"
              controls
            >
              <source src="/videos/resturant-tour.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </motion.div>

          {/* Music Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-lg p-8 shadow-lg"
          >
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Traditional Chinese Music</h3>
            <p className="text-gray-600 mb-8">
              Enjoy the soothing sounds of traditional Chinese music while browsing our website.
              Click the button below to play or pause the background music.
            </p>
            <audio ref={audioRef} src="/music/background.mp3" loop />
            <motion.button
              onClick={toggleMusic}
              className="flex items-center space-x-2 bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMusicPlaying ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                )}
              </svg>
              <span>{isMusicPlaying ? 'Pause Music' : 'Play Music'}</span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Media; 