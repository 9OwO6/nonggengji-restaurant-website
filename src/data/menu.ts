/** Re-exports — menu content: data/menu.json + menu-db.ts */
export type { MenuItem, Dish, MenuSection, MenuData } from './menu-db';
export {
  getMenuItems,
  getMenuSections,
  getFeaturedDishes,
  getDishName,
  getDishDescription,
  getSectionTitle,
} from './menu-db';
