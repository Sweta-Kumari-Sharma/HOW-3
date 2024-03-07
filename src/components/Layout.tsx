import React, { ReactNode } from 'react';
import Navbar from './Navbar';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col md:flex-row">
      <Navbar />
      <div className="flex-grow md:flex-grow">
        {children}
      </div>
    </div>
  );
};

export default Layout;
