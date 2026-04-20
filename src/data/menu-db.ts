import menuJson from '../../data/menu.json';

export interface MenuItem {
  id: string;
  name_en: string;
  name_cn: string;
  price: string;
  price_number: number;
  spicy_level: 0 | 1 | 2 | 3;
  is_signature: boolean;
  is_recommended: boolean;
  description_en: string;
  description_cn: string;
  image: string;
  categorySlug: string;
  category_en: string;
  category_cn: string;
}

export interface MenuSection {
  slug: string;
  category_en: string;
  category_cn: string;
  items: MenuItem[];
}

export interface MenuData {
  sections: MenuSection[];
}

interface RawMenuItem {
  id: string;
  name_en: string;
  name_cn: string;
  price: number;
  spicy_level?: number;
  is_signature?: boolean;
  is_recommended?: boolean;
  description_en?: string;
  description_cn?: string;
  image: string;
}

interface RawMenuCategory {
  category: string;
  category_cn?: string;
  items: RawMenuItem[];
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function clampSpicy(n: number): 0 | 1 | 2 | 3 {
  if (n < 0) return 0;
  if (n > 3) return 3;
  return Math.round(n) as 0 | 1 | 2 | 3;
}

function formatPrice(n: number): string {
  return `$${n.toFixed(2)}`;
}

function normalizeImagePath(path: string): string {
  if (path.startsWith('/')) return path;
  return `/menu/${path}`;
}

function buildSections(): MenuSection[] {
  const raw = menuJson as { menu: RawMenuCategory[] };
  return raw.menu.map((cat) => {
    const slug = slugify(cat.category);
    const category_cn = cat.category_cn ?? cat.category;
    const items: MenuItem[] = cat.items.map((row) => {
      const spicy_level = clampSpicy(row.spicy_level ?? 0);
      return {
        id: row.id,
        name_en: row.name_en,
        name_cn: row.name_cn,
        price_number: row.price,
        price: formatPrice(row.price),
        spicy_level,
        is_signature: Boolean(row.is_signature),
        is_recommended: Boolean(row.is_recommended),
        description_en: row.description_en ?? '',
        description_cn: row.description_cn ?? '',
        image: normalizeImagePath(row.image),
        categorySlug: slug,
        category_en: cat.category,
        category_cn,
      };
    });
    return {
      slug,
      category_en: cat.category,
      category_cn,
      items,
    };
  });
}

const sections: MenuSection[] = buildSections();
const flatItems: MenuItem[] = sections.flatMap((s) => s.items);

export function getMenuSections(): MenuSection[] {
  return sections;
}

export function getMenuData(): MenuData {
  return { sections };
}

export function getMenuItems(): MenuItem[] {
  return flatItems;
}

export function getDishesByCategorySlug(slug: string): MenuItem[] {
  return flatItems.filter((d) => d.categorySlug === slug);
}

/** Home page: signature dishes first, up to 4. */
export function getFeaturedDishes(): MenuItem[] {
  const sig = flatItems.filter((d) => d.is_signature);
  const seen = new Set<string>();
  const out: MenuItem[] = [];
  for (const d of sig) {
    if (!seen.has(d.id)) {
      seen.add(d.id);
      out.push(d);
    }
  }
  if (out.length < 4) {
    for (const d of flatItems) {
      if (out.length >= 4) break;
      if (!seen.has(d.id)) {
        seen.add(d.id);
        out.push(d);
      }
    }
  }
  return out.slice(0, 4);
}

export function getDishName(item: MenuItem, lang: 'en' | 'zh'): string {
  return lang === 'zh' ? item.name_cn : item.name_en;
}

export function getDishDescription(item: MenuItem, lang: 'en' | 'zh'): string {
  const s = lang === 'zh' ? item.description_cn : item.description_en;
  return s ?? '';
}

export function getSectionTitle(section: MenuSection, lang: 'en' | 'zh'): string {
  return lang === 'zh' ? section.category_cn : section.category_en;
}

/** @deprecated Use MenuItem */
export type Dish = MenuItem;
