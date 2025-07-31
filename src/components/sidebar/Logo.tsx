import { Link } from 'react-router-dom';
import LogoLight from '../../images/logo/logo-new.svg';
import LogoDark from '../../images/logo/logo-dark-new.svg';
import LogoIcon from '../../images/logo/logo-icon.svg';

interface LogoProps {
    isExpanded: boolean;
    isHovered: boolean;
    isMobileOpen: boolean;
}

const Logo: React.FC<LogoProps> = ({ isExpanded, isHovered, isMobileOpen }) => {
    return (
        <div
            className={`py-[7px] flex border-b border-b-gray-200 h-[64px] pt-[7px] pr-[7px] pb-[7px] pl-[45px] ${
                !isExpanded && !isHovered ? 'lg:justify-center' : 'justify-start'
            }`}
        >
            <Link to="/">
                {isExpanded || isHovered || isMobileOpen ? (
                    <>
                        <img
                            src={LogoLight}
                            width={114}
                            height={50}
                            className="dark:hidden"
                            alt="Logo"
                        />
                        <img
                            src={LogoDark}
                            width={114}
                            height={50}
                            className="hidden dark:block"
                            alt="Logo"
                        />
                    </>
                ) : (
                    <img
                        src={LogoIcon}
                        width={32}
                        height={32}
                        alt="Logo"
                    />
                )}
            </Link>
        </div>
    );
};

export default Logo;