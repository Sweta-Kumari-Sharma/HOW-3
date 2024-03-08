import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';
import Link from 'next/link';
import '../app/globals.css';
import Navbar from '@/components/Navbar';
import { addEllipses } from '@/utils/common-utils';
import { useCart } from '../context/cartContext';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';
import { useRouter } from 'next/router';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { ref: scrollRef } = useInView<HTMLDivElement>({ threshold: 0 });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>("https://fakestoreapi.com/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <div className='flex flex-col md:flex-col'>
        <div className='w-[15%]'>
          <Navbar />
        </div>
        <div className="p-2 mx-auto md:mr-4 w-[100%] 2 md:w-[85%]">
          <h1 className="text-xl md:text-3xl font-bold text-center my- mb-4">Our Products</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

const ProductCard = ({ product }: { product: Product }) => {
  const { ref, inView } = useInView({ triggerOnce: false });
  const { addToCart, removeFromCart, addToWishlist, removeFromWishlist, cartItems, wishlistItems } = useCart();
  const router = useRouter();

  const isInCart = cartItems.includes(product.id);
  const isInWishlist = wishlistItems.includes(product.id);

  const toggleCart = () => {
    if (isInCart) {
      removeFromCart(product.id);
    } else {
      addToCart(product.id);
    }
  };

  const toggleWishlist = () => {
    if (isInWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  return (
    <div ref={ref}>
    <motion.div
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0.5 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg overflow-hidden shadow-md relative"
    >
      <img src={product.image} alt={product.title} className="h-[150px] mx-auto" />
      <div className="p-4">
        <h2 className="text-xl font-semibold">{addEllipses(product.title, 20)}</h2>
        <p className="text-gray-600">${product.price}</p>
        <div className="absolute top-0 right-0 mt-2 mr-2 flex items-center">
          <div className={`rounded-full bg-white p-2 cursor-pointer ${isInCart ? 'text-blue-500' : 'text-gray-600'}`} onClick={toggleCart}>
            <FaShoppingCart className={`text-xl ${isInCart ? 'text-blue-500' : ''}`} />
          </div>
          <div className={`rounded-full bg-white p-2 ml-2 cursor-pointer ${isInWishlist ? 'text-red-500' : 'text-gray-600'}`} onClick={toggleWishlist}>
            <FaHeart className={`text-xl ${isInWishlist ? 'text-red-500' : ''}`} />
          </div>
        </div>
        <div className="mt-4">
          <Link href={`/product/${product.id}`}>
            <div className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-block">View</div>
          </Link>
        </div>
      </div>
    </motion.div>
    </div>
  );
};


export default HomePage;
