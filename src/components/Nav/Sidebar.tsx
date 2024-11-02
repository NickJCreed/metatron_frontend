import React, { useState } from 'react';
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
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className={`relative w-[48px] h-[48px] rounded-[10px] ${isActive ? 'bg-selectedColor' : ''} flex justify-center items-center ${!disabled && 'cursor-pointer'} ${styles}`}
      onClick={handleClick}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <img src={imgUrl} alt={name} className={`w-1/2 h-1/2 ${!isActive && 'grayscale'}`} />
      {showTooltip && (
        <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-4 py-2 px-4 bg-gray-800 text-white text-sm rounded-lg shadow-lg font-semibold">
          {name}
        </div>
      )}
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

  return (
    <div
      className="fixed top-[64px] left-0 z-10 flex flex-col items-center justify-between p-4 ml-4 mt-10 h-[75vh] rounded-[20px]"
      style={{ backgroundColor: theme.colors.tertiaryBg }}
    >
      <div className="flex flex-col items-center gap-3">
        {navlinks.map((link) => (
          <Icon
            key={link.name}
            name={link.name}
            imgUrl={link.imgUrl}
            isActive={location.pathname === link.link} // Set active based on current path
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
  );
};

export default Sidebar;
