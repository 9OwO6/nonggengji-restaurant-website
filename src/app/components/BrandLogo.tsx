'use client';

import { motion } from 'framer-motion';

const BrandLogo = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-start relative group"
    >
      {/* 背景装饰 */}
      <motion.div 
        className="absolute -inset-2 bg-gradient-to-r from-red-50 to-green-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      />
      
      <div className="relative">
        <motion.span 
          className="text-2xl font-['Playfair_Display'] italic text-[#b22222] relative z-10"
          whileHover={{ scale: 1.02 }}
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Farmer&apos;s
        </motion.span>
        <motion.div 
          className="absolute -right-4 -top-1 opacity-50"
          initial={{ opacity: 0, scale: 0, rotate: -45 }}
          animate={{ opacity: 0.5, scale: 1, rotate: 0 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
          whileHover={{ rotate: 45, scale: 1.2 }}
        >
          <span className="text-lg">🌶️</span>
        </motion.div>
      </div>

      <motion.div 
        className="relative"
        whileHover={{ scale: 1.02 }}
      >
        <motion.span 
          className="text-3xl font-['Montserrat'] font-black bg-gradient-to-r from-[#228b22] to-[#2e8b57] bg-clip-text text-transparent relative z-10"
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Journal
        </motion.span>
        <motion.div 
          className="absolute -right-4 -bottom-1 opacity-50"
          initial={{ opacity: 0, scale: 0, rotate: 45 }}
          animate={{ opacity: 0.5, scale: 1, rotate: 0 }}
          transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
          whileHover={{ rotate: -45, scale: 1.2 }}
        >
          <span className="text-lg">🌿</span>
        </motion.div>
      </motion.div>

      {/* 装饰线条 */}
      <motion.div 
        className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-[#b22222] via-[#228b22] to-[#b22222]"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      />

      {/* 动态光效 */}
      <motion.div 
        className="absolute -inset-2 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100"
        initial={{ x: '-100%' }}
        animate={{ x: '100%' }}
        transition={{ 
          repeat: Infinity,
          duration: 2,
          ease: "linear",
          repeatDelay: 1
        }}
      />
    </motion.div>
  );
};

export default BrandLogo; 