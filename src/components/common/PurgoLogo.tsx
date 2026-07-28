import React from 'react';
import logoImg from '../../assets/logo.png';

interface PurgoLogoProps {
  className?: string;
}

export const PurgoLogo: React.FC<PurgoLogoProps> = ({ className = 'w-5 h-5' }) => {
  return (
    <img
      src={logoImg}
      alt="Purgo Logo"
      className={`${className} object-contain rounded-sm select-none`}
      draggable={false}
    />
  );
};
