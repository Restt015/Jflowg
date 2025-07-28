import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../shared/components/navbar";
import Footer from "../../shared/components/Footer";
import CartButton from "../../shared/components/CartButton";
import { useCart } from "../../context/CartContext";

// Datos quemados para el producto
const productos = [
  {
    id: "product1",
    title: "Artículo",
    description: "Zara",
    price: 89.99,
    image: "https://cataas.com/cat?type=square",
    category: "Ropa",
    sku: "001",
    stock: 10,
    color: "Azul",
    origin: "Panamá"
  },
  {
    id: "product2",
    title: "Artículo2",
    description: "H&M",
    price: 45.99,
    image: "https://cataas.com/cat?type=square",
    category: "Ropa",
    sku: "002",
    stock: 15,
    color: "Rojo",
    origin: "Colombia"
  }
];

function ProductDetail() {
  const { id } = useParams();
  const product = productos.find((p) => p.id === id);
  const { addToCart } = useCart(); // ✅ contexto de carrito

  if (!product) {
    return (
      <div className="text-7xl pt-28 text-center text-red-600">
        Producto no encontrado.
      </div>
    );
  }

  const handleAdd = () => {
    addToCart({
      id: product.id,
      title: product.title,
      description: product.description,
      image: product.image,
      price: product.price,
      quantity: 1
    });

    alert("Producto agregado al carrito");
  };

  return (
    <div className="bg-gradient-to-b from-rose-100 to-gray-100 min-h-screen pt-28">
      <Navbar />

      <main className="max-w-6xl bg-white mx-auto px-6 py-10 pb-32 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        <div className="bg-gray-100 rounded-xl p-6 flex items-center justify-center h-[400px]">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain rounded-xl"
          />
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{product.title}</h1>
            <p className="text-sm text-gray-500">{product.description}</p>
            <div className="flex items-center gap-4 mt-2">
              <p className="text-red-600 text-2xl font-bold">${product.price}</p>
              {product.oldPrice && (
                <span className="text-gray-400 line-through">${product.oldPrice}</span>
              )}
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">-20%</span>
            </div>
          </div>

          <p className="text-green-600 text-sm">
            ✔ En stock — {product.stock} unidades
          </p>

          <div className="flex flex-col gap-3">
            <CartButton
              onClick={handleAdd}
              className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
            >
              Agregar
            </CartButton>

            <button className="w-full border border-red-600 text-red-600 py-2 rounded-lg hover:bg-red-50">
              Agregar a favoritos
            </button>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">Descripción</h4>
            <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
              <li>Producto de alta calidad</li>
              <li>Disponible para envío inmediato</li>
              <li>Garantía incluida</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">Especificaciones</h4>
            <div className="text-sm text-gray-600 grid grid-cols-2 gap-2">
              <p><strong>Color:</strong> {product.color}</p>
              <p><strong>Origen:</strong> {product.origin}</p>
              <p><strong>Género:</strong> {product.gender || "Unisex"}</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default ProductDetail;
