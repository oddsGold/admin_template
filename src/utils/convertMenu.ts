import { MenuItem } from '../types/menu.ts';

interface ConvertedSubItem {
  name: string;
  path: string | null;
}

interface ConvertedMenuItem {
  name: string;
  path?: string | null;
  subItems?: ConvertedSubItem[];
}

export const convertMenu = (items: MenuItem[]): ConvertedMenuItem[] => {
  return items.map((item): ConvertedMenuItem => {
    const hasSubmenu = item.submenu && item.submenu.length > 0;

    if (hasSubmenu) {
      return {
        name: item.name,
        subItems: item.submenu!.map((sub) => ({
          name: sub.name,
          path: sub.urn,
        })),
      };
    }

    return {
      name: item.name,
      path: item.urn,
    };
  });
};
