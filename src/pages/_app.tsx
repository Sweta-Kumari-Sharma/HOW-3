'use client'
import { AppProps } from 'next/app';
// import Layout from '@/components/Layout'; // Adjust the path as per your project structure
import { CartProvider } from '@/context/cartContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      {/* <Layout> */}
        <Component {...pageProps} />
      {/* </Layout> */}
    </CartProvider>
  );
}

export default MyApp;
