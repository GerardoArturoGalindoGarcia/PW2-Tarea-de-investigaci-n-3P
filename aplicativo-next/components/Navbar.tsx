import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                {/* Logo */}
                <Link
                    href="/"
                    className="text-2xl font-bold text-blue-600"
                >
                    Tienda Electronica Next.js - Grupo#5
                </Link>

                {/* Menú */}
                <div className="flex items-center gap-8">
                    <Link
                        href="/"
                        className="text-black hover:text-blue-600 transition"
                    >
                        Inicio
                    </Link>

                    <Link
                        href="/productos"
                        className="text-black hover:text-blue-600 transition"
                    >
                        Productos
                    </Link>

                    <Link
                        href="/carrito"
                        className="text-black hover:text-blue-600 transition"
                    >
                        Carrito
                    </Link>

                    <Link
                        href="/login"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Iniciar sesión
                    </Link>
                </div>

            </div>
        </nav>
    );
}