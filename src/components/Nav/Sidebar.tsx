import React from 'react';
import { useTheme } from "@/context/ThemeProvider"; 
import { useNavigate, useLocation } from 'react-router-dom';
import sunIcon from '@/assets/sun.svg';
import moonIcon from '@/assets/moon.svg'; 
import { navlinks } from '@/consts/parameters'; 
import { useContract } from "@/context/ContractProvider";

interface IconProps {
  styles?: string;
  name?: string;
  imgUrl: string;
  isActive?: boolean;
  disabled?: boolean;
  handleClick?: () => void;
}

const Icon: React.FC<IconProps> = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => {
  return (
    <div
      className={`relative w-[48px] h-[48px] rounded-[10px] ${isActive ? 'bg-selectedColor' : ''} flex justify-center items-center ${!disabled && 'cursor-pointer'} ${styles}`}
      onClick={handleClick}
    >
      <img src={imgUrl} alt={name} className={`w-1/2 h-1/2 ${!isActive && 'grayscale'}`} />
    </div>
  );
};

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const { setContract } = useContract();
  const { theme, toggleTheme } = useTheme(); 
  const location = useLocation();

  const handleNavigation = (link: string, contract: string) => {
    setContract(contract);
    navigate(link);
  };

  // Define classes for vertical (sidebar) and horizontal (bottom bar) layouts
  const verticalBarClasses = `
    fixed top-[64px] left-0 z-10 flex flex-col items-center p-4
    md:ml-4 md:mt-10 md:max-h-[300] md:rounded-[20px] md:flex-col
  `;
  
  const horizontalBarClasses = `
  fixed bottom-0 left-0 w-full z-10 flex items-center justify-around p-2 md:hidden
`;

  return (
    <>
      {/* Vertical Sidebar for Desktop */}
      <div 
        className={`${verticalBarClasses} hidden md:flex`}
        style={{ backgroundColor: theme.colors.tertiaryBg }}
        >
        <div className="flex flex-col items-center gap-3">
          {navlinks.map((link) => (
            <Icon
              key={link.name}
              name={link.name}
              imgUrl={link.imgUrl}
              isActive={location.pathname === link.link} 
              disabled={link.disabled}
              handleClick={() => {
                if (!link.disabled) {
                  handleNavigation(link.link, link.contract);
                }
              }}
            />
          ))}
        </div>
        <Icon
          name="Toggle Theme"
          imgUrl={theme.type === 'dark' ? sunIcon : moonIcon}
          handleClick={toggleTheme}
        />
      </div>

      {/* Horizontal Bottom Bar for Mobile */}
      <div 
        className={`${horizontalBarClasses}`}
        style={{ backgroundColor: theme.colors.tertiaryBg }}
        >
        {navlinks
          .filter((link) => link.name !== 'logout' && link.name !== 'Toggle Theme') // Exclude some icons on mobile
          .map((link) => (
            <Icon
              key={link.name}
              name={link.name}
              imgUrl={link.imgUrl}
              isActive={location.pathname === link.link} 
              disabled={link.disabled}
              handleClick={() => {
                if (!link.disabled) {
                  handleNavigation(link.link, link.contract);
                }
              }}
            />
          ))}
      </div>
    </>
  );
};

export default Sidebar;
