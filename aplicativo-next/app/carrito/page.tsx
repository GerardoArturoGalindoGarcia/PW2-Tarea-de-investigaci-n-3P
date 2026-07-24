"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { carrito, eliminarProducto } = useCart();

  const [saldoFicticio, setSaldoFicticio] = useState<number>(10000);
  const [pagoExitoso, setPagoExitoso] = useState<boolean>(false);
  const [mostrarFormulario, setMostrarFormulario] = useState<boolean>(false);

  // Campos de la simulación
  const [numeroTarjeta, setNumeroTarjeta] = useState<string>("");
  const [nombreTitular, setNombreTitular] = useState<string>("");
  const [fechaExp, setFechaExp] = useState<string>("");
  const [cvv, setCvv] = useState<string>("");

  const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);

  const handleProcesarPago = (e: React.FormEvent) => {
    e.preventDefault();

    if (total === 0) return;

    if (!numeroTarjeta || !nombreTitular || !fechaExp || !cvv) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    if (saldoFicticio >= total) {
      setSaldoFicticio(saldoFicticio - total);
      setPagoExitoso(true);
      setMostrarFormulario(false);
    } else {
      alert("¡Fondos insuficientes en la tarjeta de crédito ficticia!");
    }
  };

  return (
      <main className="max-w-7xl mx-auto px-6 py-20 text-white">
        <h1 className="text-3xl font-bold mb-6">Tu carrito de compras</h1>

        {pagoExitoso ? (
            <div className="bg-zinc-900 border border-green-600 p-8 rounded-xl text-center space-y-4 max-w-lg mx-auto shadow-2xl">
              <div className="text-green-500 text-5xl">✓</div>
              <h2 className="text-2xl font-bold text-green-400">¡Pago procesado con éxito!</h2>
              <p className="text-gray-300">La transacción se ha completado mediante la tarjeta de simulación.</p>
              <div className="bg-zinc-800 p-4 rounded-lg text-left space-y-1 text-sm">
                <p><span className="text-gray-400">Total pagado:</span> L. {total.toLocaleString()}</p>
                <p><span className="text-gray-400">Nuevo saldo:</span> <span className="text-green-400 font-bold">L. {saldoFicticio.toLocaleString()}</span></p>
              </div>
              <button
                  onClick={() => setPagoExitos5(false)}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition"
              >
                Regresar a la tienda
              </button>
            </div>
        ) : carrito.length === 0 ? (
            <p className="text-gray-400">Tu carrito está vacío.</p>
        ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {carrito.map((item) => (
                    <div key={item.id} className="flex items-center gap-6 bg-zinc-900 p-4 rounded-xl shadow border border-zinc-800">
                      <img src={item.imagen} alt={item.nombre} className="w-28 h-20 object-cover rounded-lg" />
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold">{item.nombre}</h3>
                        <p className="text-gray-400 text-sm">Cantidad: {item.cantidad}</p>
                        <p className="text-blue-400 font-bold mt-1">L. {(item.precio * item.cantidad).toLocaleString()}</p>
                      </div>
                      <button
                          onClick={() => eliminarProducto(item.id)}
                          className="bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white px-3 py-1.5 rounded-lg text-sm transition"
                      >
                        Eliminar
                      </button>
                    </div>
                ))}
              </div>

              <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 h-fit space-y-6">
                <h2 className="text-xl font-bold border-b border-zinc-800 pb-3">Resumen de la orden</h2>

                <div className="flex justify-between text-gray-300">
                  <span>Subtotal</span>
                  <span>L. {total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xl font-bold border-t border-zinc-800 pt-3">
                  <span>Total a Pagar</span>
                  <span className="text-blue-400">L. {total.toLocaleString()}</span>
                </div>

                {!mostrarFormulario ? (
                    <button
                        onClick={() => setMostrarFormulario(true)}
                        className="w-full bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 transition shadow-lg"
                    >
                      Proceder al pago
                    </button>
                ) : (
                    <form onSubmit={handleProcesarPago} className="space-y-4 border-t border-zinc-800 pt-4" autoComplete="off">
                      <div className="flex justify-between items-center text-xs text-blue-400 font-mono bg-blue-950/40 p-2 rounded border border-blue-900">
                        <span>Saldo Tarjeta Demo:</span>
                        <span className="font-bold">L. {saldoFicticio.toLocaleString()}</span>
                      </div>

                      <div>
                        <label className="block text-xs text-gray-400 mb-1">Código de Tarjeta (Demo)</label>
                        <input
                            type="text"
                            name="nFicticio"
                            autoComplete="off"
                            placeholder="4026 5555 8888 1234"
                            value={numeroTarjeta}
                            onChange={(e) => setNumeroTarjeta(e.target.value)}
                            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-xs text-gray-400 mb-1">Nombre en la Tarjeta</label>
                        <input
                            type="text"
                            name="titularFicticio"
                            autoComplete="off"
                            placeholder="Gerardo - Grupo 5"
                            value={nombreTitular}
                            onChange={(e) => setNombreTitular(e.target.value)}
                            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-xs text-gray-400 mb-1">Expiración</label>
                          <input
                              type="text"
                              name="expFicticia"
                              autoComplete="off"
                              placeholder="12/28"
                              value={fechaExp}
                              onChange={(e) => setFechaExp(e.target.value)}
                              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 text-center font-mono"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-400 mb-1">Clave CVV</label>
                          <input
                              type="password"
                              name="cvvFicticio"
                              autoComplete="new-password"
                              maxLength={3}
                              placeholder="402"
                              value={cvv}
                              onChange={(e) => setCvv(e.target.value)}
                              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 text-center font-mono"
                          />
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <button
                            type="button"
                            onClick={() => setMostrarFormulario(false)}
                            className="w-1/2 bg-zinc-800 text-gray-300 py-2.5 rounded-lg text-sm hover:bg-zinc-700 transition"
                        >
                          Cancelar
                        </button>
                        <button
                            type="submit"
                            className="w-1/2 bg-green-600 text-white py-2.5 rounded-lg text-sm font-bold hover:bg-green-700 transition shadow"
                        >
                          Pagar Ahora
                        </button>
                      </div>
                    </form>
                )}
              </div>
            </div>
        )}
      </main>
  );
}