'use client'
import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import axios from 'axios';
import Link from 'next/link';
import '../app/globals.css'

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
  const [products, setProducts] = useState<Product[]>([]); // Add type annotation
  const [animatedIndexes, setAnimatedIndexes] = useState<number[]>([]);
  // const { ref: scrollRef } = useInView({ threshold: 0 });
  const lastCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      if (lastCardRef.current) {
        const lastCardTop = lastCardRef.current.getBoundingClientRect().top;
        const isLastCardVisible = lastCardTop < window.innerHeight;
        if (isLastCardVisible) {
          const newAnimatedIndexes = [...animatedIndexes];
          products.forEach((_, index) => {
            if (!animatedIndexes.includes(index)) {
              newAnimatedIndexes.push(index);
            }
          });
          setAnimatedIndexes(newAnimatedIndexes);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [animatedIndexes, products]);

  return (
    <div className=" mx-auto">
      
      <h1 className="text-xl md:text-3xl font-bold mb-4">Our Products</h1>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 hidden md:table-cell">ID</th>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2 hidden md:table-cell">Price</th>
              <th className="px-4 py-2 hidden md:table-cell">Description</th>
              <th className="px-4 py-2 hidden md:table-cell">Category</th>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2 hidden md:table-cell">Rating</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
               <div key={product.id} ref={index === products.length - 1 ? lastCardRef : null}>
              <motion.tr whileHover={{ scale: 1.1 }} initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}>
                <td className="border px-4 py-2 hidden md:table-cell">{product.id}</td>
                <td className="border px-4 py-2">{product.title}</td>
                <td className="border px-4 py-2 hidden md:table-cell">${product.price}</td>
                <td className="border px-4 py-2 hidden md:table-cell">{product.description}</td>
                <td className="border px-4 py-2 hidden md:table-cell">{product.category}</td>
                <td className="border px-4 py-2"><img src={product.image} alt={product.title}  /></td>
                <td className="border px-4 py-2 hidden md:table-cell">{product.rating.rate} ({product.rating.count} ratings)</td>
                <td className="border px-4 py-2">
                  <Link href={`/product/${product.id}`}>
                    <div className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-block">View</div>
                  </Link>
                </td>
              </motion.tr>
              </div>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HomePage;
