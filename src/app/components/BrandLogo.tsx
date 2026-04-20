'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface BrandLogoProps {
  variant?: 'default' | 'light' | 'dark';
}

const BrandLogo: React.FC<BrandLogoProps> = ({ variant = 'default' }) => {
  const isLight = variant === 'light';
  const isDark = variant === 'dark';

  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center space-x-3 cursor-pointer group"
    >
      {/* 图标部分 - 使用用户的logo图片 */}
      <div className="relative">
        <div className="w-12 h-12 rounded-xl overflow-hidden shadow-lg bg-white/10 backdrop-blur-sm">
          <Image
            src="/logo.jpg"
            alt="Nong Geng Ji Logo"
            width={48}
            height={48}
            className="w-full h-full object-cover"
            priority
          />
        </div>
      </div>

      {/* 文字部分 */}
      <div className="flex flex-col">
        <div className="relative">
          <span className={`text-2xl font-bold leading-none tracking-tight ${
            isLight ? 'text-white' : 
            isDark ? 'text-emerald-300' : 'text-emerald-700'
          }`}>
            NongGengJi
          </span>
        </div>
        
        {/* 英文副标题 */}
        <div className={`text-xs mt-1 font-medium ${
          isLight ? 'text-white/80' : 
          isDark ? 'text-gray-300' : 'text-gray-500'
        }`}>
          Hunan Cuisine
        </div>
      </div>
    </motion.div>
  );
};

export default BrandLogo;