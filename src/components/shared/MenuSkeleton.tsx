import React from 'react';

interface MenuSkeletonProps {
    isExpanded?: boolean;
    isHovered?: boolean;
    isMobileOpen?: boolean;
}

export const MenuSkeleton: React.FC<MenuSkeletonProps> = ({
                                                              isExpanded = true,
                                                              isHovered = false,
                                                              isMobileOpen = false,
                                                          }) => {
    const showText = isExpanded || isHovered || isMobileOpen;

    return (
        <li className="border-t border-gray-200 first:border-t-0">
            <div
                className={`flex items-center p-3 ${
                    !isExpanded && !isHovered ? 'lg:justify-center' : 'lg:justify-between'
                }`}
            >
                <div className="w-full flex items-center gap-3">
                    <div className="w-6 h-6 rounded bg-gray-200 animate-pulse" />
                    {showText && <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />}
                </div>
            </div>
        </li>
    );
};