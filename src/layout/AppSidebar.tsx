import React from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSidebar } from '../context/SidebarContext';
import { useGetMenuItems } from '../queries/menu';
import { convertMenu } from '../utils/convertMenu';
import Logo from '../components/sidebar/Logo';
import MenuItems from '../components/sidebar/MenuItems';
import ContactInfo from '../components/sidebar/ContactInfo.tsx';

interface AppSidebarProps {
  isAccountReady: boolean;
}

const AppSidebar: React.FC<AppSidebarProps> = ({ isAccountReady }) => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const location = useLocation();

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: 'main' | 'others';
    index: number;
  } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>({});
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const { menu, isLoading: isLoadingMenu } = useGetMenuItems(isAccountReady);

  const navItems = useMemo(() => {
    return menu ? convertMenu(menu) : [];
  }, [menu]);

  const isActive = useCallback(
    (path: string | null) => location.pathname === path,
    [location.pathname]
  );

  useEffect(() => {
    let submenuMatched = false;

    navItems.forEach((nav, index) => {
      nav.subItems?.forEach((subItem) => {
        if (subItem.path !== null && isActive(subItem.path)) {
          setOpenSubmenu({ type: 'main', index });
          submenuMatched = true;
        }
      });
    });

    if (!submenuMatched) setOpenSubmenu(null);
  }, [location, isActive, navItems]);

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      const ref = subMenuRefs.current[key];
      if (ref) {
        setSubMenuHeight((prev) => ({
          ...prev,
          [key]: ref.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index: number, menuType: 'main' | 'others') => {
    setOpenSubmenu((prev) =>
      prev?.type === menuType && prev.index === index ? null : { type: menuType, index }
    );
  };

  return (
    <aside
      className={`fixed flex flex-col lg:mt-0 top-0 left-0 bg-white dark:bg-gray-900 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-r-white border-b-0
    ${isExpanded || isMobileOpen ? 'w-[240px]' : isHovered ? 'w-[240px]' : 'w-[90px]'}
    ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
    lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Logo isExpanded={isExpanded} isHovered={isHovered} isMobileOpen={isMobileOpen} />

      <div className="flex flex-col flex-1 overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <MenuItems
                items={navItems}
                menuType="main"
                isExpanded={isExpanded}
                isHovered={isHovered}
                isMobileOpen={isMobileOpen}
                openSubmenu={openSubmenu}
                subMenuHeight={subMenuHeight}
                subMenuRefs={subMenuRefs}
                handleSubmenuToggle={handleSubmenuToggle}
                isActive={isActive}
                isLoadingMenu={isLoadingMenu}
              />
            </div>
          </div>
        </nav>
      </div>

      <ContactInfo isExpanded={isExpanded} isHovered={isHovered} isMobileOpen={isMobileOpen} />
    </aside>
  );
};

export default AppSidebar;
