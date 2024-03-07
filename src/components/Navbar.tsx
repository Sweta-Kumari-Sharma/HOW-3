'use client'
import React, { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-800 text-white w-full md:w-auto md:h-full md:flex md:flex-col md:justify-between 
    md:fixed md:left-0 z-10
    ">
      {/* Logo or Brand */}
      <div className="md:pt-4 md:px-4">
        <div className="text-xl font-bold md:hidden">
          <Link href="/">
            <div>Logo</div>
          </Link>
        </div>
      </div>

      {/* Hamburger menu for mobile */}
      <button onClick={toggleMenu} className="flex  md:hidden text-white focus:outline-none md:px-4 md:pb-4">
        {isMenuOpen ? (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Side Navbar links */}
      <ul className={`text-sm md:text-base md:flex md:flex-col md:items-start md:px-4 md:py-2 ${isMenuOpen ? 'block' : 'hidden'} md:block`}>
        <li className="md:py-2">
          <Link href="/">
            <div className="hover:bg-gray-700 block">Home</div>
          </Link>
        </li>
        <li className="md:py-2">
          <Link href="/about">
            <div className="hover:bg-gray-700 block">About</div>
          </Link>
        </li>
        <li className="md:py-2">
          <Link href="/contact">
            <div className="hover:bg-gray-700 block">Contact</div>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

