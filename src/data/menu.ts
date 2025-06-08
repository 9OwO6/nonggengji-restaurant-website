export interface Dish {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  price: string;
  spiceLevel: 0 | 1 | 2 | 3;
  tags: string[];
  highlights: string[];
}

export const menuData: Dish[] = [
  // Chef's Specials
  {
    id: 'cs-1',
    name: 'Signature Hunan Fish Head',
    description: 'Fresh fish head braised in our secret sauce with Hunan spices',
    image: 'https://placehold.co/400x300?text=Hunan+Fish+Head',
    category: "Chef's Specials",
    price: '$38.99',
    spiceLevel: 2,
    tags: ['Signature', 'Fresh'],
    highlights: ['Traditional Hunan dish', 'Rich in flavor']
  },
  {
    id: 'cs-2',
    name: "Dong'an Chicken",
    description: 'Classic Hunan dish with tender chicken and ginger',
    image: 'https://placehold.co/400x300?text=Dongan+Chicken',
    category: "Chef's Specials",
    price: '$24.99',
    spiceLevel: 1,
    tags: ['Traditional', 'Healthy'],
    highlights: ['Famous Hunan dish', 'High protein']
  },

  // Customer Favorites
  {
    id: 'cf-1',
    name: 'Kung Pao Chicken',
    description: 'Diced chicken with peanuts, vegetables, and chili',
    image: 'https://placehold.co/400x300?text=Kung+Pao+Chicken',
    category: 'Customer Favorites',
    price: '$18.99',
    spiceLevel: 2,
    tags: ['Popular', 'Peanut'],
    highlights: ['Customer favorite', 'Balanced flavors']
  },

  // Chicken Dishes
  {
    id: 'ch-1',
    name: 'Hunan Style Chicken',
    description: 'Chicken stir-fried with Hunan spices and vegetables',
    image: 'https://placehold.co/400x300?text=Hunan+Chicken',
    category: 'Chicken Dishes',
    price: '$19.99',
    spiceLevel: 2,
    tags: ['Spicy', 'Stir-fry'],
    highlights: ['Authentic Hunan style', 'Rich in protein']
  },

  // Pork Dishes
  {
    id: 'p-1',
    name: 'Twice Cooked Pork',
    description: 'Pork belly with vegetables in spicy sauce',
    image: 'https://placehold.co/400x300?text=Twice+Cooked+Pork',
    category: 'Pork Dishes',
    price: '$20.99',
    spiceLevel: 1,
    tags: ['Traditional', 'Pork Belly'],
    highlights: ['Classic dish', 'Rich flavor']
  },

  // Beef Dishes
  {
    id: 'b-1',
    name: 'Hunan Beef',
    description: 'Sliced beef with vegetables in spicy sauce',
    image: 'https://placehold.co/400x300?text=Hunan+Beef',
    category: 'Beef Dishes',
    price: '$22.99',
    spiceLevel: 2,
    tags: ['Spicy', 'Beef'],
    highlights: ['Tender beef', 'Authentic flavor']
  },

  // Seafood
  {
    id: 's-1',
    name: 'Steamed Fish with Chili',
    description: 'Fresh fish steamed with Hunan chili sauce',
    image: 'https://placehold.co/400x300?text=Steamed+Fish',
    category: 'Seafood',
    price: '$28.99',
    spiceLevel: 1,
    tags: ['Fresh', 'Healthy'],
    highlights: ['Fresh seafood', 'Light and healthy']
  },

  // Vegetarian & Greens
  {
    id: 'v-1',
    name: 'Stir-fried Seasonal Vegetables',
    description: 'Fresh seasonal vegetables in light sauce',
    image: 'https://placehold.co/400x300?text=Seasonal+Vegetables',
    category: 'Vegetarian & Greens',
    price: '$15.99',
    spiceLevel: 0,
    tags: ['Vegetarian', 'Vegan'],
    highlights: ['Healthy choice', 'Fresh vegetables']
  },

  // Appetizers
  {
    id: 'a-1',
    name: 'Wonton Soup',
    description: 'Traditional wontons in clear broth',
    image: 'https://placehold.co/400x300?text=Wonton+Soup',
    category: 'Appetizers',
    price: '$8.99',
    spiceLevel: 0,
    tags: ['Soup', 'Light'],
    highlights: ['Traditional starter', 'Comfort food']
  },

  // Drinks
  {
    id: 'd-1',
    name: 'Jasmine Tea',
    description: 'Traditional Chinese jasmine tea',
    image: 'https://placehold.co/400x300?text=Jasmine+Tea',
    category: 'Drinks',
    price: '$3.99',
    spiceLevel: 0,
    tags: ['Hot', 'Tea'],
    highlights: ['Traditional', 'Refreshing']
  }
];

export const categories = [
  "Chef's Specials",
  'Customer Favorites',
  'Chicken Dishes',
  'Pork Dishes',
  'Beef Dishes',
  'Seafood',
  'Vegetarian & Greens',
  'Appetizers',
  'Drinks'
];

// 导出菜品和饮品
export const dishes = menuData.filter(item => item.category !== 'Drinks');
export const drinks = menuData.filter(item => item.category === 'Drinks'); 