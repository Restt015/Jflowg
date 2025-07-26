import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Eye, X, ShoppingCart } from "lucide-react";
import { useCart } from "../../context/CartContext";

function CardProduct({
  id,
  title,
  description,
  category,
  image,
  price,
  showPrice = false,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const { addToCart } = useCart(); // ✅ acceder al carrito

  const handleAddToCart = () => {
    addToCart({
      id,
      title,
      description,
      category,
      image,
      price,
    });
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      {/* Tarjeta */}
      <div className="bg-pink-100 rounded-2xl shadow-lg transition-transform hover:scale-105 duration-300">
        {/* Imagen con íconos */}
        <div className="relative group h-48 bg-gray-400 rounded-t-2xl overflow-hidden">
          <Link to={`/Articles/${id}`} className="absolute inset-0 z-0">
            <img
              src={image || "https://cataas.com/cat?type=square"}
              alt={title}
              className="w-full h-full object-cover"
            />
          </Link>

          {/* Íconos flotantes */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
            <button
              className="icon-btn bg-white hover:bg-gray-100 p-2 rounded-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Heart className="w-4 h-4" />
            </button>
            <button
              className="icon-btn bg-white hover:bg-gray-100 p-2 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                openModal();
              }}
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              className="icon-btn bg-white hover:bg-gray-100 p-2 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart(); 
              }}
            >
              <ShoppingCart className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Contenido */}
        <div className="bg-white px-6 py-4 rounded-b-2xl flex flex-col gap-2">
          <Link to={`/Articles/${id}`}>
            <h3 className="text-lg font-bold text-gray-800 hover:underline">
              {title}
            </h3>
          </Link>
          <p className="text-sm text-gray-400 pt-4">{description}</p>
          <p className="text-sm text-gray-500">{category}</p>

          {/* Precio y botón */}
          {showPrice && (
            <div className="flex items-center justify-between pt-2">
              <p className="text-lg font-bold text-red-600">
                ${price?.toFixed(2)}
              </p>
              <button
                onClick={handleAddToCart}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Agregar
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-screen overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900">
                Detalles del Producto
              </h2>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Cuerpo del Modal */}
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Imagen */}
                <div className="bg-gray-100 rounded-xl p-8 flex items-center justify-center min-h-72">
                  <img
                    src={image || "https://cataas.com/cat?type=square"}
                    alt={title}
                    className="max-w-full max-h-60 object-contain"
                  />
                </div>

                {/* Información */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-gray-900">{title}</h3>
                  <p className="text-red-600 font-semibold text-lg">
                    ${price?.toFixed(2)}
                  </p>

                  <div>
                    <h4 className="font-semibold text-gray-700 mb-4">
                      Descripción
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      {description}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Categoría
                    </h4>
                    <p className="text-gray-600">{category}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Detalles
                    </h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>Producto de alta calidad</p>
                      <p>Disponible para envío inmediato</p>
                      <p>Garantía incluida</p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      handleAddToCart();
                      closeModal();
                    }}
                    className="w-full bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition duration-200 font-medium mt-4"
                  >
                    Agregar al Carrito
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CardProduct;
