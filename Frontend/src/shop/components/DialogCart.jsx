import { useCart } from "../../context/CartContext";
import { Trash2, Plus, Minus } from "lucide-react";
import { removeFromCart, increaseQuantity, decreaseQuantity } from "../../services/cartService";

export default function DialogCart({ isOpen, onClose }) {
  const { cart } = useCart();

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity || 0), 0);

  if (!isOpen) return null;

  return (
    <div className="fixed top-20 right-4 w-full max-w-md bg-pink-50 shadow-xl rounded-lg z-50 overflow-y-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 flex justify-between items-center">
        Mi Carrito
        <span className="text-sm bg-red-100 text-red-600 px-3 py-1 rounded-full">
          {cart.length} {cart.length === 1 ? "artículo" : "artículos"}
        </span>
      </h2>

      {cart.length === 0 ? (
        <p className="text-gray-600">Tu carrito está vacío.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cart.map((item, i) => (
              <li key={i} className="bg-white rounded-lg p-4 flex gap-4 items-center shadow">
                <img src={item.image || "https://cataas.com/cat?type=square"}
                 alt={item.title} 
                 className="w-16 h-16 object-cover rounded" />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.descripcion} ${item.price}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <button onClick={() => decreaseQuantity(item.id)} className="text-gray-600 hover:text-black">
                    <Minus size={16} />
                  </button>
                  <span className="px-2">{item.quantity}</span>
                  <button onClick={() => increaseQuantity(item.id)} className="text-gray-600 hover:text-black">
                  <Plus size={16} />
                  </button>
                  </div>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700">
                <Trash2 size={18} />
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-6 bg-white rounded-lg p-4 shadow flex flex-col gap-2">
            <div className="flex justify-between text-sm text-gray-700">
              <span>Total Parcial:</span>
              <span className="font-semibold">${total.toFixed(2)}</span>
            </div>
            <p className="text-xs text-gray-500">
              Impuestos y envío calculados al finalizar la compra
            </p>

            <div className="flex gap-2 mt-4">
              <button className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700">
                Proceder al pago
              </button>
              <button onClick={onClose} className="flex-1 border border-black py-2 rounded text-black hover:bg-gray-100">
                Ver carrito
              </button>
            </div>
          </div>

          <button
            className="mt-4 text-sm text-red-600 hover:underline"
            onClick={onClose}
          >
            ← Continuar comprando
          </button>
        </>
      )}
    </div>
  );
}
