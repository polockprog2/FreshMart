import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { UserProvider } from "@/context/UserContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "FreshMart - Your Online Grocery Store",
  description: "Shop fresh groceries online. Vegetables, fruits, meat, dairy, and household essentials delivered to your doorstep. Best prices guaranteed!",
  keywords: "grocery, online shopping, fresh vegetables, fruits, meat, dairy, household essentials",
  authors: [{ name: "FreshMart" }],
  openGraph: {
    title: "FreshMart - Your Online Grocery Store",
    description: "Shop fresh groceries online with fast delivery",
    type: "website",
  },
};

import { LanguageProvider } from "@/context/LanguageContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <LanguageProvider>
          <UserProvider>
            <CartProvider>
              <Navbar />
              {children}
              <Footer />
            </CartProvider>
          </UserProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
