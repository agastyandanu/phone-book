import React, { ReactNode } from 'react';
import { layoutStyles, contentStyles } from './Layout.styles';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={layoutStyles}>
      <div className={contentStyles}>{children}</div>
    </div>
  );
};

export default Layout;

