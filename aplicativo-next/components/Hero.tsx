import Link from "next/link";

export default function Hero() {
    return (
        <section className="bg-gray-100">
            <div className="max-w-7xl mx-auto px-6 py-24 text-center">

                <h1 className="text-5xl font-bold text-gray-900">
                    Tecnología para tu día a día
                </h1>

                <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
                    Encuentra computadoras, accesorios y dispositivos electrónicos
                    seleccionados para este proyecto de demostración.
                </p>

                <Link
                    href="/productos"
                    className="inline-block mt-10 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"
                >
                    Ver productos
                </Link>

            </div>
        </section>
    );
}