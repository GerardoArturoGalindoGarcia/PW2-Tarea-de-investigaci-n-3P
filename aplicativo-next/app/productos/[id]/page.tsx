import { products } from "@/data/products";
import ProductDetailClient from "@/components/ProductDetailClient";

type Props = {
  params: {
    id: string;
  };
};

export default function ProductDetail({ params }: Props) {
  const producto = products.find((item) => item.id === Number(params.id));

  if (!producto) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20">
        <h1 className="text-3xl font-bold">Producto no encontrado</h1>
        <p className="mt-4 text-gray-600">id: {params?.id ?? '---'}</p>
        <pre className="mt-2 text-xs text-gray-500">{JSON.stringify(params)}</pre>
      </div>
    );
  }

  return (
    <main className="max-w-5xl mx-auto px-6 py-20">
      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <img src={producto.imagen} alt={producto.nombre} className="w-full rounded-xl object-cover" />
        </div>

        <div>
          <h1 className="text-4xl font-bold">{producto.nombre}</h1>

          <p className="text-blue-600 text-2xl font-bold mt-4">L. {producto.precio.toLocaleString()}</p>

          <p className="mt-6 text-gray-600">{producto.descripcion ?? "Descripción no disponible."}</p>

          <ProductDetailClient product={producto} />
        </div>
      </div>
    </main>
  );
}

