import { css } from '@emotion/css';

export const ButtonStyles = (size?: string, backgroundColor?: string, backgroundColorHover?: string, color?: string, isBorder?: boolean) => css`
  border: 0;
  background: ${backgroundColor || '#fe5c89'};
  color: ${color || '#f8f8f8'};
  border: ${isBorder ? '1px solid #ddd' : 'none'};
  font-family: inherit;
  padding: ${size === 'sm' ? '5px 10px' : '10px 20px'};
  font-size: 16px;
  border-radius: ${size === 'sm' ? '5px' : '10px'};
  cursor: pointer;
  text-align: center;
  
  &:hover {
    background: ${backgroundColorHover || '#fe5c89'};
  }
`;