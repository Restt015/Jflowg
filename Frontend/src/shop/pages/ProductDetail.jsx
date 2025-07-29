import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../shared/components/navbar";
import Footer from "../../shared/components/Footer";
import CartButton from "../../shared/components/CartButton";
import { useCart } from "../../context/CartContext";
import axios from "axios";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/api/v1/products/${id}`, {
          withCredentials: true,
        });
        setProduct(res.data.product);
      } catch (err) {
        console.error("Error al obtener producto:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const variant = product?.variants?.[0];

  const handleAdd = () => {
    if (!variant) return;

    const itemToAdd = {
      id: variant._id,
      product_id: product._id,
      title: product.name,
      description: product.description,
      image: variant.images?.[0],
      price: variant.price,
      size: variant.size,
      quantity: 1,
    };

    console.log("🛒 Agregando al carrito:", itemToAdd);
    addToCart(itemToAdd);
    alert("Producto agregado al carrito");
  };

  if (loading) {
    return (
      <div className="text-2xl pt-28 text-center text-gray-600">
        Cargando producto...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-7xl pt-28 text-center text-red-600">
        Producto no encontrado.
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-rose-100 to-gray-100 min-h-screen pt-28">
      <Navbar />

      <main className="max-w-6xl bg-white mx-auto px-6 py-10 pb-32 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        <div className="bg-gray-100 rounded-xl p-6 flex items-center justify-center h-[400px]">
          <img
            src={variant?.images?.[0] || "https://cataas.com/cat?type=square"}
            alt={product.name}
            className="w-full h-full object-contain rounded-xl"
          />
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>
            <p className="text-sm text-gray-500">{product.description}</p>
            <div className="flex items-center gap-4 mt-2">
              <p className="text-red-600 text-2xl font-bold">${variant?.price}</p>
            </div>
          </div>

          <p className="text-green-600 text-sm">
            ✔ En stock — {variant?.stock || 10} unidades
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
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default ProductDetail;
