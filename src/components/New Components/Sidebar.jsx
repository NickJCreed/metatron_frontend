import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import sun from '@/assets/sun.svg';
import { navlinks } from '@/consts/parameters'; // Adjust import paths as needed
import { useContract } from "@/App"; // Adjust the import path as necessary

interface IconProps {
  styles?: string;
  name?: string;
  imgUrl: string;
  isActive?: string;
  disabled?: boolean;
  handleClick?: () => void;
}

const Icon: React.FC<IconProps> = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => (
  <div
    className={`w-[48px] h-[48px] rounded-[10px] ${isActive && isActive === name && 'bg-[#2c2f32]'} flex justify-center items-center ${!disabled && 'cursor-pointer'} ${styles}`}
    onClick={handleClick}
  >
    <img src={imgUrl} alt={name} className={`w-1/2 h-1/2 ${isActive !== name && 'grayscale'}`} />
  </div>
);

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const { setContract } = useContract();
  const [isActive, setIsActive] = useState('dashboard');

  const handleNavigation = (name: string, link: string, contract: string) => {
    setIsActive(name);
    setContract(contract);
    navigate(link);
  };

  return (
    <div className="flex flex-col items-center justify-between bg-lightBg p-4 h-[93vh] rounded-[20px]">
      <div className="flex flex-col items-center gap-3">
        {navlinks.map((link) => (
          <Icon
            key={link.name}
            name={link.name}
            imgUrl={link.imgUrl}
            isActive={isActive}
            disabled={link.disabled}
            handleClick={() => {
              if (!link.disabled) {
                handleNavigation(link.name, link.link, link.contract);
              }
            }}
          />
        ))}
      </div>
      <Icon styles="bg-[#1c1c24] shadow-secondary" imgUrl={sun} />
    </div>
  );
};

export default Sidebar;
