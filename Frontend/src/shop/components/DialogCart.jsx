import React from "react";
import { X, ShoppingCart } from "lucide-react";
import Button1 from "../../shared/components/Button1";

function DialogCart({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex justify-end">
      <div className="w-full sm:w-[90%] md:w-[400px] h-full bg-white shadow-xl p-6 relative overflow-y-auto">
        <button className="absolute top-4 right-4" onClick={onClose}>
          <X className="w-6 h-6 text-gray-600" />
        </button>

    
        <div className="flex items-center gap-2 mb-6">
          <ShoppingCart className="w-5 h-5" />
          <h2 className="text-lg font-semibold">Carrito de Compra (0)</h2>
        </div>
        <div className="flex flex-col items-center justify-center text-center px-4">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
            alt="Carrito vacío"
            className="w-52 h-52 mb-8"
          />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            carrito está vacío
          </h3>
          <Button1>Empieza a comprar</Button1>
        </div>
      </div>
    </div>
  );
}

export default DialogCart;
