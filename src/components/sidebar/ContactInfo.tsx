import Email from '../../images/menu/sidebar-icon-email.svg';
import User from '../../images/menu/sidebar-icon-user.png';
import React from 'react';

interface ContactInfoProps {
    isExpanded: boolean;
    isHovered: boolean;
    isMobileOpen: boolean;
}

const ContactInfo: React.FC<ContactInfoProps> = ({
                                                     isExpanded,
                                                     isHovered,
                                                     isMobileOpen,
                                                 }) => {
    const showContent = isExpanded || isHovered || isMobileOpen;
    const showContainer = isExpanded || isHovered;

    return (
        <div className={`px-4 dark:border-gray-700 ${!showContainer ? 'lg:hidden' : ''}`}>
            <button
                className={`w-full py-[12px] text-sm flex items-center justify-start gap-2 ${
                    showContent
                        ? 'dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50'
                        : 'justify-center'
                }`}
            >
                <img src={Email} alt="Email icon" />
                {showContent && 'Написати лист'}
            </button>

            <div className="flex items-center gap-2 py-[12px]">
                <div className="overflow-hidden w-4 h-4 flex align-items-center justify-center">
                    <img src={User} alt="User icon" />
                </div>
                {showContent && (
                    <div>
                        <p className="text-sm font-medium text-primary-default dark:text-white">
                            Сулим Д.В
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ContactInfo;