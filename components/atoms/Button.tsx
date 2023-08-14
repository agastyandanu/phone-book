import React from 'react';
import { ButtonStyles } from './Button.styles';

interface ButtonProps {
  children: React.ReactNode;
  size?: string;
  backgroundColor?: string;
  backgroundColorHover?: string;
  color?: string;
  isBorder?: boolean;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, size, backgroundColor, backgroundColorHover, color, isBorder, onClick }) => {
  return (
    <div className={ButtonStyles(size, backgroundColor, backgroundColorHover, color, isBorder)} onClick={onClick}>
      {children}
    </div>
  );
};

export default Button;
