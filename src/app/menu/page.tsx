'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  recommended: string;
  image: string;
  price: string;
  spiceLevel: number;
  category: string;
}

const menuItems: MenuItem[] = [
  // Appetizers
  {
    id: 'a1',
    name: 'Green Peppers with Preserved Eggs (Chilled)',
    description: 'Ice-cold dish featuring crisp green chili strips paired with creamy preserved eggs—an exciting mouthfeel combo.',
    recommended: 'Refreshing starter that awakens your palate with spice and creamy texture contrast.',
    image: '/images/dish-1.png',
    price: '$12.99',
    spiceLevel: 2,
    category: 'Appetizers'
  },
  {
    id: 'a2',
    name: 'Chilled Spicy Chicken Feet',
    description: 'Tender chicken feet marinated and lightly chilled to lock in bold chili and vinegar flavors.',
    recommended: 'A daring, authentic Hunan appetizer—great for adventurous taste explorers or sharing with friends.',
    image: '/images/dish-2.png',
    price: '$12.99',
    spiceLevel: 2,
    category: 'Appetizers'
  },
  {
    id: 'a3',
    name: 'Deep-Fried Peanuts',
    description: 'Crispy, lightly salted peanuts fried to golden perfection.',
    recommended: 'Simple, comforting snack—perfect alongside cold drinks or between spicy bites.',
    image: '/images/dish-3.png',
    price: '$8.99',
    spiceLevel: 0,
    category: 'Appetizers'
  },

  // Soups
  {
    id: 's1',
    name: 'Lotus Root & Pork Rib Soup (Single)',
    description: 'Nutrient-rich broth simmered with crunchy lotus root and meaty pork ribs; contains peanuts.',
    recommended: 'Light, warming, and soothing—perfect to start a meal or refresh mid-course.',
    image: '/images/dish-4.png',
    price: '$5.99',
    spiceLevel: 0,
    category: 'Soups'
  },
  {
    id: 's2',
    name: 'Matsutake Mushroom Chicken Soup',
    description: 'Clear, fragrant broth enriched with wild matsutake mushrooms and free-range chicken.',
    recommended: 'Earthy depth with lean protein—ideal for health-conscious diners.',
    image: '/images/dish-1.png',
    price: '$12.99',
    spiceLevel: 0,
    category: 'Soups'
  },

  // Noodles & Rice
  {
    id: 'n1',
    name: 'Noodles with Minced Meat in Soup',
    description: 'Warm, umami-rich noodles topped with savory minced pork in a fragrant broth.',
    recommended: 'Comforting and hearty—like a Hunan-style noodle hug.',
    image: '/images/dish-2.png',
    price: '$12.99',
    spiceLevel: 0,
    category: 'Noodles & Rice'
  },
  {
    id: 'n2',
    name: 'Stir-Fried Rice with Soy Sauce',
    description: 'Wok-tossed jasmine rice with soy sauce, scallions, and light seasoning.',
    recommended: 'Simple yet satisfying—a great base for pairing with spicier entrees.',
    image: '/images/dish-3.png',
    price: '$13.99',
    spiceLevel: 0,
    category: 'Noodles & Rice'
  },

  // Chicken Dishes
  {
    id: 'c1',
    name: 'Tea Oil Stir-Fried Country Chicken',
    description: 'Free-range chicken wok-stirred in antioxidant-rich Camellia tea oil, fragrant and savory.',
    recommended: 'Combines lean protein with heart-healthy oil—iconic Hunan flavor.',
    image: '/images/dish-4.png',
    price: '$31.99',
    spiceLevel: 2,
    category: 'Chicken Dishes'
  },
  {
    id: 'c2',
    name: 'Spicy Chicken with Hunan Flavor',
    description: 'Bite-sized chicken pieces coated in rich, mildly spicy Hunan sauce.',
    recommended: 'A house favorite balancing spice and savory—popular with returning diners.',
    image: '/images/dish-1.png',
    price: '$32.99',
    spiceLevel: 1,
    category: 'Chicken Dishes'
  },

  // Pork Dishes
  {
    id: 'p1',
    name: 'Stir-Fried Pork with Spiral Chilies',
    description: 'Tender pork strips sautéed with spiral chilies—fragrant, flavorful, mildly spicy.',
    recommended: 'A favorite among mild-spice lovers; protein-rich and satisfying.',
    image: '/images/dish-2.png',
    price: '$24.99',
    spiceLevel: 1,
    category: 'Pork Dishes'
  },
  {
    id: 'p2',
    name: 'Braised Pork with Preserved Greens',
    description: 'Pork belly slow-braised with preserved greens until meltingly tender.',
    recommended: 'Savory, rich, and with deep umami—classic comfort food.',
    image: '/images/dish-3.png',
    price: '$25.99',
    spiceLevel: 1,
    category: 'Pork Dishes'
  },

  // Beef & Duck
  {
    id: 'b1',
    name: 'Signature Stir-Fried Beef',
    description: 'High-heat wok-fired beef with garlic, scallions, and Hunan spices—smoky and bold.',
    recommended: 'One of our most popular entrees—perfectly spicy and savory.',
    image: '/images/dish-4.png',
    price: '$28.99',
    spiceLevel: 2,
    category: 'Beef & Duck'
  },
  {
    id: 'b2',
    name: 'Hot Plate Beef and Egg',
    description: 'Juicy beef strips with runny egg served sizzling—dramatic and delicious.',
    recommended: 'A comforting combination served theatrically.',
    image: '/images/dish-1.png',
    price: '$21.99',
    spiceLevel: 1,
    category: 'Beef & Duck'
  },

  // Seafood
  {
    id: 'sf1',
    name: 'Stir-Fried Fish with Fresh Chilies',
    description: 'Boneless butterfly fish fillets pan-fried with fresh chilies—tender and vibrant.',
    recommended: 'Showcases natural seafood sweetness amid spicy heat.',
    image: '/images/dish-2.png',
    price: '$34.99',
    spiceLevel: 2,
    category: 'Seafood'
  },
  {
    id: 'sf2',
    name: 'Sauerkraut Fish with Soup',
    description: 'Light fish simmered in tangy sauerkraut broth for an umami-sour balance.',
    recommended: 'Soul-warming broth with balanced flavor—luxurious yet comforting.',
    image: '/images/dish-3.png',
    price: '$48.99',
    spiceLevel: 1,
    category: 'Seafood'
  },

  // Vegetables & Tofu
  {
    id: 'v1',
    name: 'Old Tofu with Minced Meat',
    description: 'Silken tofu stewed in rich broth with minced pork; soft, comforting, savory.',
    recommended: 'Vegetarian-friendly aside from meat garnish; umami-rich, easy to love.',
    image: '/images/dish-4.png',
    price: '$19.99',
    spiceLevel: 0,
    category: 'Vegetables & Tofu'
  },
  {
    id: 'v2',
    name: 'Stir-Fried Bamboo Shoots',
    description: 'Crisp bamboo shoots quickly stir-fried with light chili heat.',
    recommended: 'Light, textures-focused dish that cleanses the palate.',
    image: '/images/dish-1.png',
    price: '$19.99',
    spiceLevel: 1,
    category: 'Vegetables & Tofu'
  },

  // Desserts
  {
    id: 'd1',
    name: 'Ice Jelly',
    description: 'Refreshing jelly dessert, lightly sweet and cooling.',
    recommended: 'Great palate cleanser or light treat after spicy meal.',
    image: '/images/dish-2.png',
    price: '$3.99',
    spiceLevel: 0,
    category: 'Desserts'
  },
  {
    id: 'd2',
    name: 'Walnut Bun (5 pcs)',
    description: 'Fluffy steamed buns filled with sweet walnut paste.',
    recommended: 'Soft, mildly sweet—comforting after savory dishes.',
    image: '/images/dish-3.png',
    price: '$8.99',
    spiceLevel: 0,
    category: 'Desserts'
  }
];

const categories = [
  'Appetizers',
  'Soups',
  'Noodles & Rice',
  'Chicken Dishes',
  'Pork Dishes',
  'Beef & Duck',
  'Seafood',
  'Vegetables & Tofu',
  'Desserts'
] as const;

type Category = typeof categories[number];

const MenuPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('Appetizers');
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);

  const scrollToCategory = (category: Category) => {
    setSelectedCategory(category);
    const element = document.getElementById(category);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 固定导航栏 */}
      <div className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center">
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              <span className="ml-2 text-gray-900">Back to Home</span>
            </Link>
            <div className="flex space-x-4 overflow-x-auto py-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => scrollToCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === category
                      ? 'bg-red-600 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 主内容区域 */}
      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Our Menu
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover our authentic Hunan cuisine, featuring traditional flavors and
              modern presentations.
            </p>
          </motion.div>

          {categories.map((category) => (
            <div key={category} id={category} className="mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl font-bold text-gray-900 mb-8 text-center"
              >
                {category}
              </motion.h2>
              <div className="space-y-6">
                {menuItems
                  .filter((item) => item.category === category)
                  .map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                    >
                      <div className="flex flex-col md:flex-row">
                        <div 
                          className="relative w-full md:w-1/3 aspect-[4/3] cursor-pointer"
                          onClick={() => setSelectedDish(item)}
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        </div>
                        <div className="p-6 flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-xl font-semibold text-gray-900">{item.name}</h3>
                            <span className="text-lg font-semibold text-red-600">{item.price}</span>
                          </div>
                          <p className="text-gray-600 mb-4">{item.description}</p>
                          <p className="text-gray-500 italic mb-4">
                            <span className="font-medium">Recommended Because:</span> {item.recommended}
                          </p>
                          <div className="flex items-center text-red-600">
                            <span className="text-lg">{'🌶️'.repeat(item.spiceLevel)}</span>
                            <span className="ml-2 text-sm">
                              {item.spiceLevel === 0 ? 'Non Spicy' : 
                               item.spiceLevel === 1 ? 'Mild Spicy' : 
                               item.spiceLevel === 2 ? 'Spicy' : 'Hot Spicy'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 图片预览模态框 */}
      {selectedDish && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedDish(null)}
        >
          {/* 渐变背景 */}
          <div className="absolute inset-0 bg-gradient-to-br from-red-900/90 via-black/80 to-gray-900/90" />
          
          {/* 关闭按钮 */}
          <button
            onClick={() => setSelectedDish(null)}
            className="absolute top-4 right-4 text-white hover:text-red-400 transition-colors z-10"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* 主内容区域 */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative max-w-6xl w-full max-h-[90vh] overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col lg:flex-row">
              {/* 图片区域 */}
              <motion.div 
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="relative w-full lg:w-2/3 aspect-[4/3] bg-gray-100"
              >
                <Image
                  src={selectedDish.image}
                  alt={selectedDish.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />
                {/* 图片装饰效果 */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </motion.div>

              {/* 信息区域 */}
              <motion.div 
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="w-full lg:w-1/3 p-8 overflow-y-auto max-h-[60vh] lg:max-h-[90vh]"
              >
                <div className="space-y-6">
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">
                      {selectedDish.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-red-600">
                        <span className="text-xl">{'🌶️'.repeat(selectedDish.spiceLevel)}</span>
                        <span className="ml-2 text-sm">
                          {selectedDish.spiceLevel === 0 ? 'Non Spicy' : 
                           selectedDish.spiceLevel === 1 ? 'Mild Spicy' : 
                           selectedDish.spiceLevel === 2 ? 'Spicy' : 'Hot Spicy'}
                        </span>
                      </div>
                      <span className="text-2xl font-bold text-red-600">{selectedDish.price}</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Description</h4>
                      <p className="text-gray-600 leading-relaxed">
                        {selectedDish.description}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Recommended Because</h4>
                      <p className="text-gray-600 italic leading-relaxed">
                        {selectedDish.recommended}
                      </p>
                    </div>
                  </div>

                  {/* 装饰元素 */}
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-2 text-gray-500">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="text-sm">Perfect for sharing</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default MenuPage; 