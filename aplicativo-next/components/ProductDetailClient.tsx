"use client";

import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

type Product = {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
  descripcion?: string;
  cantidad?: number;
};

export default function ProductDetailClient({ product }: { product: Product }) {
  const { agregarProducto } = useCart();
  const router = useRouter();

  function handleAdd() {
    agregarProducto({ ...product, cantidad: 1 });
    // navigate to carrito optionally or show a toast; keep simple
    router.push('/carrito');
  }

  return (
    <div className="mt-8 flex items-center gap-4">
      <button
        onClick={handleAdd}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
      >
        Agregar al carrito
      </button>

      <button
        onClick={() => router.push('/productos')}
        className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300"
      >
        Regresar
      </button>
    </div>
  );
}
