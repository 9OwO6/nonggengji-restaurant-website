-- 创建分类表
CREATE TABLE categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name_en VARCHAR(255) NOT NULL,
  name_zh VARCHAR(255) NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建菜品表
CREATE TABLE dishes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name_en VARCHAR(255) NOT NULL,
  name_zh VARCHAR(255) NOT NULL,
  description_en TEXT NOT NULL,
  description_zh TEXT NOT NULL,
  recommended_en TEXT NOT NULL,
  recommended_zh TEXT NOT NULL,
  price VARCHAR(20) NOT NULL,
  spice_level INTEGER DEFAULT 0 CHECK (spice_level >= 0 AND spice_level <= 3),
  image_url TEXT,
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  tags TEXT[] DEFAULT '{}',
  highlights TEXT[] DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建管理员表
CREATE TABLE admins (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'admin' CHECK (role IN ('super_admin', 'admin')),
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建更新时间触发器函数
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 为所有表添加更新时间触发器
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_dishes_updated_at BEFORE UPDATE ON dishes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_admins_updated_at BEFORE UPDATE ON admins FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 插入默认分类
INSERT INTO categories (name_en, name_zh, display_order) VALUES
('Appetizers', '开胃菜', 1),
('Soups', '汤品', 2),
('Noodles & Rice', '面条米饭', 3),
('Chicken Dishes', '鸡肉类', 4),
('Pork Dishes', '猪肉类', 5),
('Beef & Duck', '牛肉鸭肉', 6),
('Seafood', '海鲜类', 7),
('Vegetables & Tofu', '蔬菜豆腐', 8),
('Desserts', '甜品', 9);

-- 创建索引
CREATE INDEX idx_dishes_category_id ON dishes(category_id);
CREATE INDEX idx_dishes_is_active ON dishes(is_active);
CREATE INDEX idx_dishes_display_order ON dishes(display_order);
CREATE INDEX idx_categories_display_order ON categories(display_order);
CREATE INDEX idx_admins_email ON admins(email);
CREATE INDEX idx_admins_is_active ON admins(is_active);

-- 启用行级安全性 (RLS)
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE dishes ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- 创建公开读取策略（前端可以读取分类和激活的菜品）
CREATE POLICY "Public can read categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Public can read active dishes" ON dishes FOR SELECT USING (is_active = true);

-- 管理员完整权限策略 (这里暂时允许所有操作，后续会基于认证状态限制)
CREATE POLICY "Admin full access to categories" ON categories FOR ALL USING (true);
CREATE POLICY "Admin full access to dishes" ON dishes FOR ALL USING (true);
CREATE POLICY "Admin full access to admins" ON admins FOR ALL USING (true); 