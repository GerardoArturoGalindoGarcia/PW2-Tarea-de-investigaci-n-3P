"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";


type ProductCart = {
    id: number;
    nombre: string;
    precio: number;
    imagen: string;
    cantidad: number;
};


type CartContextType = {
    carrito: ProductCart[];
    agregarProducto: (producto: ProductCart) => void;
    eliminarProducto: (id: number) => void;
};


const CartContext = createContext<CartContextType | undefined>(
    undefined
);


export function CartProvider({
                                 children,
                             }: {
    children: React.ReactNode;
}) {

    const [carrito, setCarrito] = useState<ProductCart[]>([]);


    // Cargar carrito guardado
    useEffect(() => {

        const carritoGuardado = localStorage.getItem("carrito");

        if (carritoGuardado) {
            setCarrito(JSON.parse(carritoGuardado));
        }

    }, []);



    // Guardar carrito
    useEffect(() => {

        localStorage.setItem(
            "carrito",
            JSON.stringify(carrito)
        );

    }, [carrito]);



    function agregarProducto(producto: ProductCart) {

        const existe = carrito.find(
            (item) => item.id === producto.id
        );


        if (existe) {

            setCarrito(
                carrito.map((item) =>
                    item.id === producto.id
                        ? {
                            ...item,
                            cantidad: item.cantidad + 1,
                        }
                        : item
                )
            );

        } else {

            setCarrito([
                ...carrito,
                {
                    ...producto,
                    cantidad: 1,
                },
            ]);

        }

    }



    function eliminarProducto(id:number){

        setCarrito(
            carrito.filter(
                (item)=>item.id !== id
            )
        );

    }



    return (
        <CartContext.Provider
            value={{
                carrito,
                agregarProducto,
                eliminarProducto,
            }}
        >
            {children}
        </CartContext.Provider>
    );

}



export function useCart(){

    const context = useContext(CartContext);


    if(!context){

        throw new Error(
            "useCart debe usarse dentro de CartProvider"
        );

    }


    return context;

}