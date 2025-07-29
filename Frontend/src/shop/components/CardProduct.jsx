import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Eye, X, ShoppingCart } from "lucide-react";
import CartButton from "../../shared/components/CartButton";

function CardProduct({
  _id,
  name,
  description,
  category,
  variants,
  showPrice = false,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const variant = variants?.[0] || {
    _id: `${_id}-variant`,
    size: "M",
    price: 0,
    images: ["https://cataas.com/cat?type=square"],
  };

  const image = variant.images?.[0] || "https://cataas.com/cat?type=square";

  const product = {
    _id,
    name,
    description,
    category,
    variants,
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="bg-pink-100 rounded-2xl shadow-lg transition-transform hover:scale-105 duration-300">
        <div className="relative group h-48 bg-gray-400 rounded-t-2xl overflow-hidden">
          <Link to={`/Products/${_id}`} className="absolute inset-0 z-0">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover"
            />
          </Link>

          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
            <button className="icon-btn bg-white hover:bg-gray-100 p-2 rounded-full">
              <Heart className="w-4 h-4" />
            </button>
            <button
              className="icon-btn bg-white hover:bg-gray-100 p-2 rounded-full"
              onClick={openModal}
            >
              <Eye className="w-4 h-4" />
            </button>
            <CartButton product={product} variant={variant}>
              <ShoppingCart className="w-4 h-4" />
            </CartButton>
          </div>
        </div>

        <div className="bg-white px-6 py-4 rounded-b-2xl flex flex-col gap-2">
          <Link to={`/Products/${_id}`}>
            <h3 className="text-lg font-bold text-gray-800 hover:underline">
              {name}
            </h3>
          </Link>
          <p className="text-sm text-gray-400 pt-2">{description}</p>
          <p className="text-sm text-gray-500">{category}</p>

          {showPrice && (
            <div className="flex items-center justify-between pt-2">
              <p className="text-lg font-bold text-red-600">
                ${variant?.price?.toFixed(2)}
              </p>
              <CartButton product={product} variant={variant} />
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-screen overflow-y-auto">
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

            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-100 rounded-xl p-8 flex items-center justify-center min-h-72">
                  <img
                    src={image}
                    alt={name}
                    className="max-w-full max-h-60 object-contain"
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-gray-900">{name}</h3>
                  <p className="text-red-600 font-semibold text-lg">
                    ${variant?.price?.toFixed(2)}
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

                  <CartButton
                    product={product}
                    variant={variant}
                    className="w-full bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition duration-200 font-medium mt-4"
                  >
                    Agregar al Carrito
                  </CartButton>
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
