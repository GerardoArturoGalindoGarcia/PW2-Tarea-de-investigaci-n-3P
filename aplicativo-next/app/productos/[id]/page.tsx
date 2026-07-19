import { products } from "@/data/products";

type Props = {
    params: {
        id: string;
    };
};

export default function ProductDetail({ params }: Props) {

    const producto = products.find(
        (item) => item.id === Number(params.id)
    );


    if (!producto) {
        return (
            <div className="max-w-7xl mx-auto px-6 py-20">
                <h1 className="text-3xl font-bold">
                    Producto no encontrado
                </h1>
            </div>
        );
    }


    return (
        <main className="max-w-5xl mx-auto px-6 py-20">

            <div className="grid md:grid-cols-2 gap-10">

                <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="rounded-xl"
                />

                <div>
                    <h1 className="text-4xl font-bold">
                        {producto.nombre}
                    </h1>

                    <p className="text-blue-600 text-2xl font-bold mt-4">
                        L. {producto.precio}
                    </p>

                    <p className="mt-6 text-gray-600">
                        Producto tecnológico de demostración para nuestra tienda.
                    </p>

                    <button className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg">
                        Agregar al carrito
                    </button>

                </div>

            </div>

        </main>
    );
}