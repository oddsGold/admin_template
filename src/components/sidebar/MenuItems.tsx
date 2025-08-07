import React from 'react';
import { MenuSkeleton } from '../shared/MenuSkeleton';
import { Item } from './Item';

interface NavItem {
  name: string;
  path?: string | null;
  subItems?: Array<{
    name: string;
    path: string | null;
  }>;
}

interface MenuItemsProps {
  items: NavItem[];
  menuType: 'main' | 'others';
  isExpanded: boolean;
  isHovered: boolean;
  isMobileOpen: boolean;
  openSubmenu: {
    type: 'main' | 'others';
    index: number;
  } | null;
  subMenuHeight: Record<string, number>;
  subMenuRefs: React.RefObject<Record<string, HTMLDivElement | null>>;
  handleSubmenuToggle: (index: number, menuType: 'main' | 'others') => void;
  isActive: (path: string | null) => boolean;
  isLoadingMenu: boolean;
}

const MenuItems: React.FC<MenuItemsProps> = ({
  items,
  menuType,
  isExpanded,
  isHovered,
  isMobileOpen,
  openSubmenu,
  subMenuHeight,
  subMenuRefs,
  handleSubmenuToggle,
  isActive,
  isLoadingMenu,
}) => {
  return (
    <ul className="flex flex-col">
      {isLoadingMenu
        ? [...Array(5)].map((_, index) => <MenuSkeleton key={index} />)
        : items.map((nav, index) => (
            <Item
              key={index}
              nav={nav}
              index={index}
              menuType={menuType}
              isExpanded={isExpanded}
              isHovered={isHovered}
              isMobileOpen={isMobileOpen}
              openSubmenu={openSubmenu}
              subMenuHeight={subMenuHeight}
              subMenuRefs={subMenuRefs}
              handleSubmenuToggle={handleSubmenuToggle}
              isActive={isActive}
            />
          ))}
    </ul>
  );
};

export default MenuItems;
