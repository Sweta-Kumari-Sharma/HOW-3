// ProductPage.tsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaShoppingCart, FaShoppingBag, FaHeart } from 'react-icons/fa'; // Import icons
import Rating from 'react-rating-stars-component'; // Import star rating component
import '../../app/globals.css';
import { addEllipses } from '../../utils/common-utils';
import ReactImageMagnify from 'react-image-magnify';
import { css } from '@emotion/react';
import { BounceLoader } from 'react-spinners';
import { FaTag } from 'react-icons/fa6';
import Navbar from '@/components/Navbar';
import { useCart } from '../../context/cartContext';

// Interface for Product
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
  const { addToCart, addToWishlist, removeFromWishlist } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isInWishlist, setIsInWishlist] = useState<boolean>(false);
  const [isInCart, setIsInCart] = useState<boolean>(false); // State for cart

  const toggleWishlist = () => {
    if (isInWishlist) {
      removeFromWishlist(product?.id as number);
    } else {
      addToWishlist(product?.id as number);
    }
    setIsInWishlist(!isInWishlist);
  };

  const toggleCart = () => {
    if (isInCart) {
      // Implement logic to remove from cart
      console.log('Removed from Cart');
    } else {
      addToCart(product?.id as number);
      console.log('Added to Cart');
    }
    setIsInCart(!isInCart);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get<Product>(`https://fakestoreapi.com/products/${slug}`);
        setProduct(response.data);
        setLoading(false);
        // Check if product is in wishlist
        const wishlistItems = localStorage.getItem('wishlist');
        if (wishlistItems) {
          const parsedWishlist: number[] = JSON.parse(wishlistItems);
          if (parsedWishlist.includes(response.data.id)) {
            setIsInWishlist(true);
          }
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  if (loading || !product) {
    return (
      <div className="flex items-center justify-center h-screen">
        <BounceLoader color="#ffffff" loading={true} />
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-col">
      <div className="w-[15%]">
        <Navbar />
      </div>
      <div className="container mx-auto flex items-center w-[100%] md:w-[85%] justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="md:max-w-[80vw] min-w-[70vw] min-h-[70vh] md:max-h-[100vh] bg-white rounded-lg overflow-hidden"
        >
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-[500px] my-4 p-4 md:h-[500px] relative">
              <ReactImageMagnify
                smallImage={{
                  alt: 'Product Image',
                  src: product.image,
                  isFluidWidth: true,
                }}
                largeImage={{
                  src: product.image,
                  width: 1129,
                  height: 1750,
                }}
                isHintEnabled
              />
              {/* Heart icon for wishlist */}
              <FaHeart
                className={`text-red-500 md:text-[20px] absolute top-4 right-4 cursor-pointer ${
                  isInWishlist ? 'text-red-500' : 'text-gray-500'
                }`}
                onClick={toggleWishlist}
              />
            </div>
            <div className="p-6 w-full md:w-1/2 mt-4 md:mt-0">
              <h1 className="text-2xl font-semibold mb-2 text-red-500">{product.title}</h1>
              <p className="text-gray-700 mb-2">Price: ${product.price}</p>
              <p className="text-gray-700 mb-2">Description: {addEllipses(product.description, 100)}</p>
              <p className="text-gray-700 mb-2">Category: {product.category}</p>
              {/* Star rating */}
              <div className="flex flex-col md:flex-row md:items-center">
                <Rating value={product.rating.rate} count={5} size={24} activeColor="#FFD700" edit={false} />
                <p className="text-gray-700 mt-2 md:ml-2 mb-2">Rating: {product.rating.rate} ({product.rating.count} ratings)</p>
              </div>
              <div>
                <div className="text-bold text-[15px] mt-4">Available Offers</div>
                <div className="flex items-center ">
                  <FaTag className="text-[#040f4a]" />
                  <div className="ml-2 text-[12px]">Partner OfferSign-up for Flipkart Pay Later & get free Times Prime Benefits worth ₹10,000*</div>
                </div>
                <div className="flex items-center">
                  <FaTag className="text-[#040f4a] " />
                  <div className="ml-2 text-[12px]">Partner OfferMake a purchase and enjoy a surprise cashback/ coupon that you can redeem later!</div>
                </div>
                <div className="flex items-center">
                  <FaTag className="text-[#040f4a] " />
                  <div className="ml-2 text-[12px]">Special PriceGet extra 52% off (price inclusive of cashback/coupon)</div>
                </div>
                <div className="flex items-center">
                  <FaTag className="text-[#040f4a]" />
                  <div className="ml-2 text-[12px]">Bank OfferGet ₹25* instant discount for the 1st Flipkart Order using Flipkart UPI</div>
                </div>
              </div>
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-2">Specifications</h2>
                <table className="table-auto">
                  <tbody>
                    <tr>
                      <td className="font-semibold">General</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>Ideal For</td>
                      <td className="ml-2">Boys and Girls</td>
                    </tr>
                    <tr>
                      <td>Minimum Age</td>
                      <td className="ml-2">2 years</td>
                    </tr>
                    <tr>
                      <td>Net Quantity</td>
                      <td className="ml-2">1</td>
                    </tr>
                    <tr>
                      <td>Dimensions</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>Weight</td>
                      <td className="ml-2">500 g</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className=" flex flex-col md:flex-row space-y-3 space-x-0 md:space-y-0 md:space-x-3 justify-center md:justify-start md: items-center mt-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#040f4a] text-white flex py-2 px-4 items-center rounded-sm md:mr-4 hover:bg-[#06166b] focus:outline-none"
                  onClick={toggleCart} // Toggle cart function
                >
                  <FaShoppingCart className="mr-2" />
                  {isInCart ? 'Remove from Cart' : 'Add to Cart'} {/* Display different text based on cart state */}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-green-700 text-white flex items-center py-2 px-4 rounded-sm  hover:bg-green-600 focus:outline-none"
                  onClick={() => console.log('Buy Now clicked')}
                >
                  <FaShoppingBag className="mr-2" />
                  Buy Now
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductPage;

const spinnerStyle = css`
  display: block;
  margin: auto;
`;
