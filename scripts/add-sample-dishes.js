// scripts/add-sample-dishes.js — requires env (never commit secrets).
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});

// 示例菜品数据
const sampleDishes = [
  // 开胃菜
  {
    name_en: 'Green Peppers with Preserved Eggs (Chilled)',
    name_zh: '凉拌青椒皮蛋',
    description_en: 'Ice-cold dish featuring crisp green chili strips paired with creamy preserved eggs—an exciting mouthfeel combo.',
    description_zh: '冰爽开胃菜，爽脆青椒配滑嫩皮蛋，口感丰富层次分明',
    recommended_en: 'Refreshing starter that awakens your palate with spice and creamy texture contrast.',
    recommended_zh: '清爽开胃，香辣爽口，是很好的餐前开胃菜',
    price: '$12.99',
    spice_level: 2,
    image_url: '/images/dish-1.png',
    category: 'appetizers',
    is_active: true,
    display_order: 1
  },
  {
    name_en: 'Chilled Spicy Chicken Feet',
    name_zh: '凉拌鸡爪',
    description_en: 'Tender chicken feet marinated and lightly chilled to lock in bold chili and vinegar flavors.',
    description_zh: '腌制入味的鸡爪，冰镇后香辣有嚼劲，胶原蛋白丰富',
    recommended_en: 'A daring, authentic Hunan appetizer—great for adventurous taste explorers or sharing with friends.',
    recommended_zh: '正宗湘菜开胃菜，适合喜欢挑战的食客，胶原蛋白满满',
    price: '$12.99',
    spice_level: 2,
    image_url: '/images/dish-2.png',
    category: 'appetizers',
    is_active: true,
    display_order: 2
  },
  {
    name_en: 'Deep-Fried Peanuts',
    name_zh: '炸花生米',
    description_en: 'Crispy, lightly salted peanuts fried to golden perfection.',
    description_zh: '香脆花生米，炸至金黄，轻盐调味，回味甘甜',
    recommended_en: 'Simple, comforting snack—perfect alongside cold drinks or between spicy bites.',
    recommended_zh: '简单美味的小食，配酒配茶都很棒，经典下酒菜',
    price: '$8.99',
    spice_level: 0,
    image_url: '/images/dish-3.png',
    category: 'appetizers',
    is_active: true,
    display_order: 3
  },

  // 汤品
  {
    name_en: 'Lotus Root & Pork Rib Soup (Single)',
    name_zh: '莲藕排骨汤（单人份）',
    description_en: 'Nutrient-rich broth simmered with crunchy lotus root and meaty pork ribs; contains peanuts.',
    description_zh: '营养丰富的汤品，莲藕脆嫩，排骨鲜美，汤汁浓郁',
    recommended_en: 'Light, warming, and soothing—perfect to start a meal or refresh mid-course.',
    recommended_zh: '清淡温补，开胃又养生，适合各个年龄段',
    price: '$5.99',
    spice_level: 0,
    image_url: '/images/dish-4.png',
    category: 'soups',
    is_active: true,
    display_order: 1
  },
  {
    name_en: 'Matsutake Mushroom Chicken Soup',
    name_zh: '松茸鸡汤',
    description_en: 'Clear, fragrant broth enriched with wild matsutake mushrooms and free-range chicken.',
    description_zh: '清香鸡汤配野生松茸菌，营养丰富，汤鲜味美',
    recommended_en: 'Earthy depth with lean protein—ideal for health-conscious diners.',
    recommended_zh: '鲜美清香，适合注重健康的食客，滋补佳品',
    price: '$12.99',
    spice_level: 0,
    image_url: '/images/dish-1.png',
    category: 'soups',
    is_active: true,
    display_order: 2
  },

  // 面条米饭
  {
    name_en: 'Noodles with Minced Meat in Soup',
    name_zh: '肉丝汤面',
    description_en: 'Warm, umami-rich noodles topped with savory minced pork in a fragrant broth.',
    description_zh: '热腾腾的汤面配香嫩肉丝，汤汁鲜美，面条爽滑',
    recommended_en: 'Comforting and hearty—like a Hunan-style noodle hug.',
    recommended_zh: '温暖人心的家常味道，汤面鲜美，营养均衡',
    price: '$12.99',
    spice_level: 0,
    image_url: '/images/dish-2.png',
    category: 'noodles',
    is_active: true,
    display_order: 1
  },
  {
    name_en: 'Stir-Fried Rice with Soy Sauce',
    name_zh: '生抽炒饭',
    description_en: 'Wok-tossed jasmine rice with soy sauce, scallions, and light seasoning.',
    description_zh: '大火爆炒的香米饭，配生抽、葱花和清淡调料',
    recommended_en: 'Simple yet satisfying—a great base for pairing with spicier entrees.',
    recommended_zh: '简单却令人满足，是搭配辣菜的完美主食',
    price: '$13.99',
    spice_level: 0,
    image_url: '/images/dish-3.png',
    category: 'noodles',
    is_active: true,
    display_order: 2
  },

  // 鸡肉类
  {
    name_en: 'Tea Oil Stir-Fried Country Chicken',
    name_zh: '茶油爆炒土鸡',
    description_en: 'Free-range chicken wok-stirred in antioxidant-rich Camellia tea oil, fragrant and savory.',
    description_zh: '散养土鸡用茶油爆炒，香气四溢，肉质鲜嫩有嚼劲',
    recommended_en: 'Combines lean protein with heart-healthy oil—iconic Hunan flavor.',
    recommended_zh: '优质蛋白与健康茶油的完美结合，正宗湘菜风味',
    price: '$31.99',
    spice_level: 2,
    image_url: '/images/dish-4.png',
    category: 'chicken',
    is_active: true,
    display_order: 1
  },
  {
    name_en: 'Spicy Chicken with Hunan Flavor',
    name_zh: '湘味辣子鸡',
    description_en: 'Bite-sized chicken pieces coated in rich, mildly spicy Hunan sauce.',
    description_zh: '一口一块的鸡肉裹着浓郁微辣的湘式酱汁，香辣诱人',
    recommended_en: 'A house favorite balancing spice and savory—popular with returning diners.',
    recommended_zh: '招牌菜品，香辣适中，回头客必点的经典美味',
    price: '$32.99',
    spice_level: 1,
    image_url: '/images/dish-1.png',
    category: 'chicken',
    is_active: true,
    display_order: 2
  },

  // 猪肉类
  {
    name_en: 'Stir-Fried Pork with Spiral Chilies',
    name_zh: '螺丝椒炒肉',
    description_en: 'Tender pork strips sautéed with spiral chilies—fragrant, flavorful, mildly spicy.',
    description_zh: '嫩滑猪肉丝配螺丝椒爆炒，香辣适中，口感丰富',
    recommended_en: 'A favorite among mild-spice lovers; protein-rich and satisfying.',
    recommended_zh: '微辣爱好者的最爱，蛋白质丰富，口感满足',
    price: '$24.99',
    spice_level: 1,
    image_url: '/images/dish-2.png',
    category: 'pork',
    is_active: true,
    display_order: 1
  },
  {
    name_en: 'Braised Pork with Preserved Greens',
    name_zh: '梅菜扣肉',
    description_en: 'Pork belly slow-braised with preserved greens until meltingly tender.',
    description_zh: '五花肉配梅菜慢炖至软烂，肥而不腻，香味浓郁',
    recommended_en: 'Savory, rich, and with deep umami—classic comfort food.',
    recommended_zh: '咸香浓郁，层次丰富，经典的家常美味',
    price: '$25.99',
    spice_level: 1,
    image_url: '/images/dish-3.png',
    category: 'pork',
    is_active: true,
    display_order: 2
  },

  // 牛肉鸭肉
  {
    name_en: 'Signature Stir-Fried Beef',
    name_zh: '招牌爆炒牛肉',
    description_en: 'High-heat wok-fired beef with garlic, scallions, and Hunan spices—smoky and bold.',
    description_zh: '大火爆炒牛肉配蒜蓉、葱花和湘式香料，烟火气十足',
    recommended_en: 'One of our most popular entrees—perfectly spicy and savory.',
    recommended_zh: '最受欢迎的主菜之一，香辣适中，口感完美',
    price: '$28.99',
    spice_level: 2,
    image_url: '/images/dish-4.png',
    category: 'beef',
    is_active: true,
    display_order: 1
  },
  {
    name_en: 'Hot Plate Beef and Egg',
    name_zh: '铁板牛肉鸡蛋',
    description_en: 'Juicy beef strips with runny egg served sizzling—dramatic and delicious.',
    description_zh: '嫩牛肉配半熟鸡蛋，铁板上滋滋作响，视觉味觉双重享受',
    recommended_en: 'A comforting combination served theatrically.',
    recommended_zh: '温馨的搭配配上戏剧性的呈现，让人印象深刻',
    price: '$21.99',
    spice_level: 1,
    image_url: '/images/dish-1.png',
    category: 'beef',
    is_active: true,
    display_order: 2
  },

  // 海鲜类
  {
    name_en: 'Stir-Fried Fish with Fresh Chilies',
    name_zh: '鲜椒爆鱼片',
    description_en: 'Boneless butterfly fish fillets pan-fried with fresh chilies—tender and vibrant.',
    description_zh: '无骨鱼片配新鲜辣椒爆炒，肉质嫩滑，色彩鲜艳',
    recommended_en: 'Showcases natural seafood sweetness amid spicy heat.',
    recommended_zh: '在香辣中展现海鲜的天然甜美，口感层次丰富',
    price: '$34.99',
    spice_level: 2,
    image_url: '/images/dish-2.png',
    category: 'seafood',
    is_active: true,
    display_order: 1
  },
  {
    name_en: 'Sauerkraut Fish with Soup',
    name_zh: '酸菜鱼汤',
    description_en: 'Light fish simmered in tangy sauerkraut broth for an umami-sour balance.',
    description_zh: '清淡鱼肉在酸香泡菜汤中炖煮，酸鲜平衡，开胃解腻',
    recommended_en: 'Soul-warming broth with balanced flavor—luxurious yet comforting.',
    recommended_zh: '暖心汤品，味道平衡，既奢华又温馨',
    price: '$48.99',
    spice_level: 1,
    image_url: '/images/dish-3.png',
    category: 'seafood',
    is_active: true,
    display_order: 2
  },

  // 蔬菜豆腐
  {
    name_en: 'Old Tofu with Minced Meat',
    name_zh: '肉末老豆腐',
    description_en: 'Silken tofu stewed in rich broth with minced pork; soft, comforting, savory.',
    description_zh: '嫩滑豆腐配肉末在浓汤中炖煮，口感顺滑，味道鲜美',
    recommended_en: 'Vegetarian-friendly aside from meat garnish; umami-rich, easy to love.',
    recommended_zh: '除了肉末装饰外对素食友好，鲜味浓郁，老少皆宜',
    price: '$19.99',
    spice_level: 0,
    image_url: '/images/dish-4.png',
    category: 'vegetables',
    is_active: true,
    display_order: 1
  },
  {
    name_en: 'Stir-Fried Bamboo Shoots',
    name_zh: '爆炒竹笋',
    description_en: 'Crisp bamboo shoots quickly stir-fried with light chili heat.',
    description_zh: '脆嫩竹笋快速爆炒，配轻微辣味，清香爽口',
    recommended_en: 'Light, textures-focused dish that cleanses the palate.',
    recommended_zh: '清淡的口感型菜品，能够清洁口腔，去油解腻',
    price: '$19.99',
    spice_level: 1,
    image_url: '/images/dish-1.png',
    category: 'vegetables',
    is_active: true,
    display_order: 2
  },

  // 甜品
  {
    name_en: 'Ice Jelly',
    name_zh: '冰粉',
    description_en: 'Refreshing jelly dessert, lightly sweet and cooling.',
    description_zh: '清爽的果冻甜品，微甜降温，夏日必备',
    recommended_en: 'Great palate cleanser or light treat after spicy meal.',
    recommended_zh: '很好的口腔清洁剂，辣餐后的轻松甜品',
    price: '$3.99',
    spice_level: 0,
    image_url: '/images/dish-2.png',
    category: 'desserts',
    is_active: true,
    display_order: 1
  },
  {
    name_en: 'Walnut Bun (5 pcs)',
    name_zh: '核桃包（5个）',
    description_en: 'Fluffy steamed buns filled with sweet walnut paste.',
    description_zh: '松软的蒸包内包甜美核桃酱，香甜可口',
    recommended_en: 'Soft, mildly sweet—comforting after savory dishes.',
    recommended_zh: '松软微甜，在品尝咸味菜品后很温馨',
    price: '$8.99',
    spice_level: 0,
    image_url: '/images/dish-3.png',
    category: 'desserts',
    is_active: true,
    display_order: 2
  }
];

async function addSampleDishes() {
  console.log('🚀 开始添加示例菜品数据...');
  
  try {
    // 首先获取所有分类
    const { data: categories, error: categoryError } = await supabase
      .from('categories')
      .select('*');
    
    if (categoryError) {
      console.error('❌ 获取分类失败:', categoryError);
      return;
    }

    if (!categories || categories.length === 0) {
      console.log('⚠️  未找到分类，请先运行数据库设置脚本');
      return;
    }

    console.log(`📂 找到 ${categories.length} 个分类`);

    // 创建分类名称到ID的映射
    const categoryMap = {
      'appetizers': categories.find(c => c.name_en === 'Appetizers')?.id,
      'soups': categories.find(c => c.name_en === 'Soups')?.id,
      'noodles': categories.find(c => c.name_en === 'Noodles & Rice')?.id,
      'chicken': categories.find(c => c.name_en === 'Chicken Dishes')?.id,
      'pork': categories.find(c => c.name_en === 'Pork Dishes')?.id,
      'beef': categories.find(c => c.name_en === 'Beef & Duck')?.id,
      'seafood': categories.find(c => c.name_en === 'Seafood')?.id,
      'vegetables': categories.find(c => c.name_en === 'Vegetables & Tofu')?.id,
      'desserts': categories.find(c => c.name_en === 'Desserts')?.id
    };

    // 检查是否已有菜品数据
    const { data: existingDishes, error: checkError } = await supabase
      .from('dishes')
      .select('id')
      .limit(1);

    if (checkError) {
      console.error('❌ 检查现有菜品失败:', checkError);
      return;
    }

    if (existingDishes && existingDishes.length > 0) {
      console.log('ℹ️  数据库中已有菜品数据，跳过添加');
      return;
    }

    // 准备插入数据
    const dishesToInsert = sampleDishes.map(dish => ({
      name_en: dish.name_en,
      name_zh: dish.name_zh,
      description_en: dish.description_en,
      description_zh: dish.description_zh,
      recommended_en: dish.recommended_en,
      recommended_zh: dish.recommended_zh,
      price: dish.price,
      spice_level: dish.spice_level,
      image_url: dish.image_url,
      category_id: categoryMap[dish.category],
      is_active: dish.is_active,
      display_order: dish.display_order
    })).filter(dish => dish.category_id); // 只插入有效分类的菜品

    if (dishesToInsert.length === 0) {
      console.log('⚠️  没有找到匹配的分类，无法添加菜品');
      return;
    }

    // 批量插入菜品
    const { data: insertedDishes, error: insertError } = await supabase
      .from('dishes')
      .insert(dishesToInsert)
      .select();

    if (insertError) {
      console.error('❌ 插入菜品失败:', insertError);
      return;
    }

    console.log(`✅ 成功添加 ${insertedDishes.length} 道菜品`);
    
    // 显示按分类统计
    const categoryCounts = {};
    insertedDishes.forEach(dish => {
      const category = categories.find(c => c.id === dish.category_id);
      if (category) {
        categoryCounts[category.name_zh] = (categoryCounts[category.name_zh] || 0) + 1;
      }
    });

    console.log('\n📊 按分类统计:');
    Object.entries(categoryCounts).forEach(([category, count]) => {
      console.log(`   - ${category}: ${count} 道菜`);
    });

    console.log('\n🎉 示例数据添加完成！');
    console.log('现在可以在前端菜单页面看到这些菜品了。');

  } catch (error) {
    console.error('💥 添加过程中发生错误:', error);
  }
}

// 运行脚本
addSampleDishes(); 