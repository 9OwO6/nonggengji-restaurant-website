'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const Media = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'video' | 'gallery'>('video');
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // 图片画廊数据
  const galleryImages = [
    {
      src: '/images/dish-1.png',
      title: '招牌红烧肉',
      description: '肥而不腻，入口即化的经典湘菜'
    },
    {
      src: '/images/dish-2.png',
      title: '麻辣小龙虾',
      description: '新鲜龙虾配秘制麻辣调料'
    },
    {
      src: '/images/dish-3.png',
      title: '剁椒鱼头',
      description: '正宗湘菜，鲜香微辣'
    },
    {
      src: '/images/dish-4.png',
      title: '口味虾',
      description: '香辣可口，回味无穷'
    },
    {
      src: '/images/resturant-interior.jpg',
      title: '典雅环境',
      description: '舒适温馨的用餐空间'
    },
    {
      src: '/images/hero-bg.jpg',
      title: '餐厅外观',
      description: '现代与传统相结合的设计'
    }
  ];

  return (
    <section id="media" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 标题区域 */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            {t('media.title') || '我们的故事'}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            {t('media.subtitle') || '从传统湘菜工艺到现代温哥华诠释，体验每一道菜背后的故事与匠心'}
          </motion.p>
        </div>

        {/* 标签切换 */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-100 rounded-lg p-1">
            <div className="flex space-x-1">
              {[
                { key: 'video', label: '视频故事' },
                { key: 'gallery', label: '美食画廊' }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as 'video' | 'gallery')}
                  className={`px-6 py-3 rounded-md font-medium transition-colors ${
                    activeTab === tab.key
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 内容区域 */}
        {activeTab === 'video' ? (
          <motion.div
            key="video"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            {/* 视频容器 */}
            <div className="relative aspect-video w-full rounded-lg overflow-hidden shadow-lg bg-gray-900">
              <video
                className="w-full h-full object-cover"
                controls
                poster="/images/video-poster.jpg"
              >
                <source src="/videos/resturant-tour.mp4" type="video/mp4" />
                您的浏览器不支持视频播放。
              </video>
            </div>

            {/* 视频描述 */}
            <div className="mt-8 text-center">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">餐厅探秘之旅</h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                跟随镜头深入了解农耕记的厨房秘密，见证每道湘菜的精心制作过程，感受传统与现代的完美融合。
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="gallery"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* 图片画廊 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryImages.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="cursor-pointer group"
                  onClick={() => setSelectedImage(index)}
                >
                  <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={image.src}
                        alt={image.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {image.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {image.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* 图片模态框 */}
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl max-h-[90vh] bg-white rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="relative aspect-[4/3]">
                <Image
                  src={galleryImages[selectedImage].src}
                  alt={galleryImages[selectedImage].title}
                  fill
                  className="object-contain"
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  {galleryImages[selectedImage].title}
                </h3>
                <p className="text-gray-600">
                  {galleryImages[selectedImage].description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* 底部行动号召 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gray-50 p-8 rounded-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">想要亲自体验这些美味？</h3>
            <p className="text-gray-600 mb-6">现在就来农耕记，品尝正宗的湘菜味道</p>
            <a
              href="https://nonggengji.ca/"
              className="inline-flex items-center px-8 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors duration-300"
            >
              <span className="mr-2">🍽️</span>
              立即预订
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Media; 