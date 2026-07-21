import type { Metadata } from "next";
import "./globals.css";

import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Ecommerce Electrónica",
  description: "Tienda online",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <CartProvider>
          <Navbar />

          <main>{children}</main>

          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
