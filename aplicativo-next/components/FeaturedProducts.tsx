import ProductCard from "./ProductCard";
import { products } from "@/data/products";

export default function FeaturedProducts() {
    return (
        <section className="max-w-7xl mx-auto px-6 py-20">
            <h2 className="text-3xl font-bold mb-10">
                Productos destacados
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.slice(0, 3).map((producto) => (
                    <ProductCard
                        key={producto.id}
                        id={producto.id}
                        nombre={producto.nombre}
                        precio={producto.precio}
                        imagen={producto.imagen}
                    />
                ))}
            </div>
        </section>
    );
}