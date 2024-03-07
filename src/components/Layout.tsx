// components/Layout.js
import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
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
