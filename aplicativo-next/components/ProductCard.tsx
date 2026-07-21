import Link from "next/link";

type ProductCardProps = {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
};

export default function ProductCard({ id, nombre, precio, imagen }: ProductCardProps) {
  return (
    <Link href={`/productos/${id}`} className="block">
      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition hover:scale-[1.01]">
        <img src={imagen} alt={nombre} className="w-full h-56 object-cover" />

        <div className="p-5">
          <h3 className="text-xl font-semibold">{nombre}</h3>

          <p className="mt-2 text-blue-600 font-bold text-lg">L. {precio.toLocaleString()}</p>

          <div className="mt-4 text-center w-full bg-blue-600 text-white py-2 rounded-lg">
            Ver producto
          </div>
        </div>
      </div>
    </Link>
  );
}