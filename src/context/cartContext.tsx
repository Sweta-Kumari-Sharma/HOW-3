// CartContext.tsx
'use client'
import React, { createContext, useContext, useState } from 'react';

interface CartContextType {
  cartItems: number[];
  wishlistItems: number[];
  addToCart: (productId: number) => void;
  removeFromCart: (productId: number) => void;
  addToWishlist: (productId: number) => void;
  removeFromWishlist: (productId: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC = ({ children }) => {
  const [cartItems, setCartItems] = useState<number[]>([]);
  const [wishlistItems, setWishlistItems] = useState<number[]>([]);

  const addToCart = (productId: number) => {
    setCartItems([...cartItems, productId]);
  };

  const removeFromCart = (productId: number) => {
    setCartItems(cartItems.filter((id) => id !== productId));
  };

  const addToWishlist = (productId: number) => {
    setWishlistItems([...wishlistItems, productId]);
  };

  const removeFromWishlist = (productId: number) => {
    setWishlistItems(wishlistItems.filter((id) => id !== productId));
  };

  return (
    <CartContext.Provider value={{ cartItems, wishlistItems, addToCart, removeFromCart, addToWishlist, removeFromWishlist }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
