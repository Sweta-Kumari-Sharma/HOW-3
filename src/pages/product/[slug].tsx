import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { motion } from 'framer-motion';
import ReactImageMagnify from 'react-image-magnify';
import '../../app/globals.css';
import { addEllipses } from '../../utils/common-utils';
import Image from 'next/image';

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

const ProductPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [product, setProduct] = useState<Product | null>(null); // Add type annotation

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get<Product>(`https://fakestoreapi.com/products/${slug}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  if (!product) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-[80vw] min-w-[70vw] min-h-[70vh] max-h-[80vh] bg-white rounded-lg overflow-hidden"
      >
        <div className="flex">
          <div className="w-[500px] h-[500px]">
            <ReactImageMagnify
              {...{
                smallImage: {
                  alt: 'Product Image',
                  src: product.image,
                  isFluidWidth: true,
                },
                largeImage: {
                  src: product.image,
                  width: 1129,
                  height: 1750,
                },
                isHintEnabled: true
              }}
            />
            <Image src={product.image} alt='product image'/>
          </div>
          <div className="p-6 w-1/2">
            <h1 className="text-2xl font-semibold mb-2 text-red-500">{product.title}</h1>
            <p className="text-gray-700 mb-2">Price: ${product.price}</p>
            <p className="text-gray-700 mb-2">Description: {addEllipses(product.description, 100)}</p>
            <p className="text-gray-700 mb-2">Category: {product.category}</p>
            <p className="text-gray-700 mb-2">Rating: {product.rating.rate} ({product.rating.count} ratings)</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-500 text-white py-2 px-4 rounded-full mt-4 hover:bg-blue-600 focus:outline-none"
              onClick={() => router.push(`/product/${product.id}`)}
            >
              View Details
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductPage;
