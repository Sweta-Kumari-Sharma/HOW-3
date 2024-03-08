// // import type { Metadata } from "next";
// // import { Inter } from "next/font/google";
// // import "./globals.css";
// // import Navbar from "@/components/Navbar";

// // const inter = Inter({ subsets: ["latin"] });

// // export const metadata: Metadata = {
// //   title: "Create Next App",
// //   description: "Generated by create next app",
// // };

// // export default function RootLayout({
// //   children,
// // }: Readonly<{
// //   children: React.ReactNode;
// // }>) {
// //   return (
// //     <html lang="en">
// //       <body className={inter.className}>
// //         <div className='flex'>

// //         <Navbar />
// //         {children}
// //         </div>
// //       </body>
// //     </html>
// //   );
// // }

// // RootLayout.js
// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import "./globals.css";
// import Layout from "@/components/Layout"; // Import the Layout component instead of Navbar

// const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <Layout> {/* Use the Layout component */}
//       {children}
//     </Layout>
//   );
// }
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Layout from "@/components/Layout";
import { CartProvider } from "@/context/cartContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
     <CartProvider> {/* Wrap the entire content with CartProvider */}
      <html lang="en">
        <body className={inter.className}>
          {/* <Layout> */}
            {children}
            {/* </Layout> */}
        </body>
      </html>
    </CartProvider>
  );
}
