import React, { useState } from "react";
import { Heart, Eye, X } from "lucide-react";

function CardProduct({ title, description, image }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      {/* Tu diseño original con iconos mínimos */}
      <div className="bg-pink-100 rounded-2xl shadow-lg w-full max-w-sm mx-auto transition-transform hover:scale-105 duration-300">
        <div className="bg-gray-400 flex items-center justify-center h-48 rounded-t-2xl relative group">
          {image ? (
            <img src={image} alt={title} className="h-24 object-contain" />
          ) : (
            <span className="text-base text-gray-900">IMAGEN AQUÍ</span>
          )}
          
          {/* Iconos flotantes - solo aparecen en hover */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button className="p-2 bg-white text-gray-600 rounded-full shadow-md hover:bg-gray-50 transition-all duration-200">
              <Heart className="w-4 h-4" />
            </button>
            <button
              onClick={openModal}
              className="p-2 bg-white text-gray-600 rounded-full shadow-md hover:bg-gray-50 transition-all duration-200"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div className="bg-white text-center px-6 py-4 rounded-b-2xl min-h-28 flex flex-col justify-center">
          <h3 className="text-lg font-bold text-gray-800 mb-1">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-screen overflow-y-auto">
            {/* Header del modal */}
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900">Detalles del Producto</h2>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Contenido del modal */}
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Imagen del producto */}
                <div className="bg-gray-100 rounded-xl p-8 flex items-center justify-center min-h-72">
                  {image ? (
                    <img src={image} alt={title} className="max-w-full max-h-60 object-contain" />
                  ) : (
                    <div className="bg-gray-300 w-48 h-32 rounded-lg flex items-center justify-center">
                      <span className="text-gray-600">IMAGEN AQUÍ</span>
                    </div>
                  )}
                </div>

                {/* Información detallada */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-gray-900">{title}</h3>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Descripción</h4>
                    <p className="text-gray-600 leading-relaxed">{description}</p>
                  </div>

                  {/* Información adicional */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Detalles</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>Producto de alta calidad</p>
                      <p>Disponible para envío inmediato</p>
                      <p>Garantía incluida</p>
                    </div>
                  </div>

                  {/* Botón de acción */}
                  <div className="pt-4">
                    <button className="w-full bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium">
                      Ver más detalles
                    </button>
                  </div>
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
