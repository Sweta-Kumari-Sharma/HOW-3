// "use client"
// import Image from "next/image";
// import HomePage from "@/pages/home";

// export default function Home() {
//   return (
//     <main className="flex min-h-screen flex-col items-center justify-between p-24">
//       <HomePage/>
//     </main>
//   );
// }
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import Link from 'next/link';

const HomePage = () => {
  const [products, setProducts] = useState([]);

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

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Price</th>
            <th>Description</th>
            <th>Category</th>
            <th>Image</th>
            <th>Rating</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <motion.tr key={product.id} whileHover={{ scale: 1.1 }} initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}>
              <td>{product.id}</td>
              <td>{product.title}</td>
              <td>${product.price}</td>
              <td>{product.description}</td>
              <td>{product.category}</td>
              <td><img src={product.image} alt={product.title} style={{ width: '100px' }} /></td>
              <td>{product.rating.rate} ({product.rating.count} ratings)</td>
              <td>
                <Link href={`/product/${product.id}`}>
                  <div className="btn">View</div>
                </Link>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>

      <style jsx>{`
        .table {
          width: 100%;
          border-collapse: collapse;
        }
        .table th, .table td {
          padding: 10px;
          border-bottom: 1px solid #ddd;
        }
        .table th {
          background-color: #f2f2f2;
          text-align: left;
        }
        .btn {
          display: inline-block;
          padding: 6px 12px;
          margin-bottom: 0;
          font-size: 14px;
          font-weight: 400;
          line-height: 1.42857143;
          text-align: center;
          white-space: nowrap;
          vertical-align: middle;
          -ms-touch-action: manipulation;
          touch-action: manipulation;
          cursor: pointer;
          border: 1px solid transparent;
          border-radius: 4px;
          background-image: none;
          background-color: #337ab7;
          color: #fff;
          border-color: #2e6da4;
        }
        .btn:hover, .btn:focus {
          color: #fff;
          background-color: #286090;
          border-color: #204d74;
        }
      `}</style>
    </div>
  );
};

export default HomePage;
