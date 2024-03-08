import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BiSolidShoppingBags } from "react-icons/bi";
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import { useCart } from '@/context/cartContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [wishlistItemsCount, setWishlistItemsCount] = useState(0);
  const { cartItems, wishlistItems } = useCart(); // Use useCart hook to access context

  useEffect(() => {
    // Update counts based on context values
    setCartItemsCount(cartItems.length);
    setWishlistItemsCount(wishlistItems.length);
  }, [cartItems, wishlistItems]); // Update counts whenever cartItems or wishlistItems change

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`bg-gray-800 p-2 text-white w-[100vw] md:w-auto md:h-full md:flex md:flex-col md:justify-between md:items-center 
    md:fixed md:left-0 z-10 ${isMenuOpen ? 'h-full' : 'h-auto'}`}>

      {/* Logo or Brand */}
      <div className="md:pt-4 md:px-4 flex justify-between items-center">
        <div className="text-xl font-bold md:hidde">
          <Link href="/">
            <div className='md:text-[35px]'><BiSolidShoppingBags/></div>
          </Link>
        </div>

        {/* Hamburger menu for mobile */}
        <button onClick={toggleMenu} className="flex md:hidden text-white focus:outline-none md:px-4 md:pb-4">
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
      </div>

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
        <li className="md:py-2">
          <Link href="/">
            <div className="hover:bg-gray-700 block font-bold">Products</div>
          </Link>
        </li>
      </ul>

      {/* Cart and Wishlist icons with item count */}
      <div className={`flex items-center space-x-3 space-y-0 md:space-x-0 md:space-y-3 md:flex-col justify-center ${isMenuOpen ? '' : ''}`}>
        <div className="relative">
          <FaShoppingCart className="text-white text-2xl cursor-pointer" />
          <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white font-bold rounded-full h-4 w-4 flex items-center justify-center">
            {cartItemsCount}
          </span>
        </div>
        <div className="relative md:mt-4">
          <FaHeart className="text-white text-2xl cursor-pointer" />
          <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white font-bold rounded-full h-4 w-4 flex items-center justify-center">
            {wishlistItemsCount}
          </span>
        </div>
      </div>

      {/* More option for small screens */}
      <div className={`md:hidden ${isMenuOpen ? 'flex justify-end' : 'hidden'}`}>
        <Link href="#">
          <div className="hover:bg-gray-700 py-2 px-4">More</div>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
