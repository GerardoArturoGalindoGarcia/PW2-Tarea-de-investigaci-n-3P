"use client";

import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { carrito, eliminarProducto } = useCart();

  const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);

  return (
    <main className="max-w-7xl mx-auto px-6 py-20">
      <h1 className="text-3xl font-bold mb-6">Tu carrito</h1>

      {carrito.length === 0 ? (
        <p className="text-gray-600">Tu carrito está vacío.</p>
      ) : (
        <div className="space-y-6">
          {carrito.map((item) => (
            <div key={item.id} className="flex items-center gap-6 bg-white p-4 rounded-lg shadow">
              <img src={item.imagen} alt={item.nombre} className="w-32 h-24 object-cover rounded" />

              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-600">{item.nombre}</h3>
                <p className="text-gray-600">Cantidad: {item.cantidad}</p>
                <p className="text-blue-600 font-bold">L. {(item.precio * item.cantidad).toLocaleString()}</p>
              </div>

              <div>
                <button
                  onClick={() => eliminarProducto(item.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}

          <div className="text-right">
            <p className="text-xl font-bold">Total: L. {total.toLocaleString()}</p>
            <button className="mt-4 bg-green-600 text-white px-6 py-3 rounded-lg">Proceder al pago</button>
          </div>
        </div>
      )}
    </main>
  );
}
