import React from 'react';
import { ChevronDownIcon } from '../../icons';
import { Link } from 'react-router-dom';
import menuIcon from '../../images/menu/menu-icon-1.png';
import { RefObject } from 'react';

interface SubItem {
  name: string;
  path: string | null;
}

interface NavItem {
  name: string;
  path?: string | null;
  subItems?: SubItem[];
}

interface MenuItemProps {
  nav: NavItem;
  index: number;
  menuType: 'main' | 'others';
  isExpanded: boolean;
  isHovered: boolean;
  isMobileOpen: boolean;
  openSubmenu: {
    type: 'main' | 'others';
    index: number;
  } | null;
  subMenuHeight: Record<string, number>;
  subMenuRefs: RefObject<Record<string, HTMLDivElement | null>>;
  handleSubmenuToggle: (index: number, menuType: 'main' | 'others') => void;
  isActive: (path: string | null) => boolean;
}

export const Item: React.FC<MenuItemProps> = ({
  nav,
  index,
  menuType,
  isExpanded,
  isHovered,
  isMobileOpen,
  openSubmenu,
  subMenuHeight,
  subMenuRefs,
  handleSubmenuToggle,
  isActive,
}) => {
  const showContent = isExpanded || isHovered || isMobileOpen;
  const isSubmenuOpen = openSubmenu?.type === menuType && openSubmenu?.index === index;
  const menuKey = `${menuType}-${index}`;

  return (
    <li className="border-t border-gray-200 first:border-t-0">
      {nav.subItems ? (
        <button
          onClick={() => handleSubmenuToggle(index, menuType)}
          className={`menu-item group ${
            isSubmenuOpen ? 'menu-item-active' : 'menu-item-inactive'
          } cursor-pointer ${!isExpanded && !isHovered ? 'lg:justify-center' : 'lg:justify-start'}`}
        >
          <span
            className={`menu-item-icon-size ${
              isSubmenuOpen ? 'menu-item-icon-active' : 'menu-item-icon-inactive'
            }`}
          >
            <img src={menuIcon} alt="menu icon" />
          </span>
          {showContent && (
            <>
              <span className="menu-item-text font-medium">{nav.name}</span>
              <ChevronDownIcon
                className={`ml-auto w-5 h-5 transition-transform duration-200 ${
                  isSubmenuOpen ? 'rotate-180 text-primary-default' : ''
                }`}
              />
            </>
          )}
        </button>
      ) : (
        nav.path && (
          <Link
            to={nav.path}
            className={`menu-item group ${
              isActive(nav.path) ? 'menu-item-active' : 'menu-item-inactive'
            }`}
          >
            <span
              className={`menu-item-icon-size ${
                isActive(nav.path) ? 'menu-item-icon-active' : 'menu-item-icon-inactive'
              }`}
            >
              <img src={menuIcon} alt="menu icon" />
            </span>
            {showContent && <span className="menu-item-text">{nav.name}</span>}
          </Link>
        )
      )}

      {nav.subItems && showContent && (
        <div
          ref={(el) => {
            if (subMenuRefs.current) {
              subMenuRefs.current[menuKey] = el;
            }
          }}
          className="overflow-hidden transition-all duration-300"
          style={{
            height: isSubmenuOpen ? `${subMenuHeight[menuKey] || 0}px` : '0px',
          }}
        >
          <ul>
            {nav.subItems.map(
              (subItem) =>
                subItem.path && (
                  <li key={`${subItem.name}-${subItem.path}`}>
                    <Link
                      to={subItem.path}
                      className={`menu-dropdown-item font-normal ${
                        isActive(subItem.path)
                          ? 'menu-dropdown-item-active'
                          : 'menu-dropdown-item-inactive'
                      }`}
                    >
                      {subItem.name}
                    </Link>
                  </li>
                )
            )}
          </ul>
        </div>
      )}
    </li>
  );
};
