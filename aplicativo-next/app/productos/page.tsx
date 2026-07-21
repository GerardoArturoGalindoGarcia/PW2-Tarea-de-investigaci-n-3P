"use client";

import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

export default function ProductsPage() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-20">
      <h1 className="text-3xl font-bold mb-8">Todos los productos</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((producto) => (
          <ProductCard
            key={producto.id}
            id={producto.id}
            nombre={producto.nombre}
            precio={producto.precio}
            imagen={producto.imagen}
          />
        ))}
      </div>
    </main>
  );
}
