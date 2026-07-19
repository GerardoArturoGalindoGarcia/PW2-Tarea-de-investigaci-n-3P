import Link from "next/link";

type ProductCardProps = {
    id: number;
    nombre: string;
    precio: number;
    imagen: string;
};

export default function ProductCard({
                                        id,
                                        nombre,
                                        precio,
                                        imagen,
                                    }: ProductCardProps) {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">

            <img
                src={imagen}
                alt={nombre}
                className="w-full h-56 object-cover"
            />

            <div className="p-5">

                <h3 className="text-xl font-semibold">
                    {nombre}
                </h3>

                <p className="mt-2 text-blue-600 font-bold text-lg">
                    L. {precio.toLocaleString()}
                </p>


                <Link
                    href={`/productos/${id}`}
                    className="block text-center mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    Ver producto
                </Link>

            </div>

        </div>
    );
}