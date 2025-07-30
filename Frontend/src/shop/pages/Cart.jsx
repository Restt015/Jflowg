import React from "react";
import { useCart } from "../../context/CartContext";
import Navbar from "../../shared/components/navbar";
import Footer from "../../shared/components/Footer";
import { Trash2, Plus, Minus } from "lucide-react";
import { checkout } from "../../services/paymentService";

export default function Cart() {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart
  } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + (item.product_variant_id?.price || 0) * item.quantity,
    0
  );

  const checkoutSession = async () => {
    const res = await checkout({ items: cart });
    window.location.href = res;
  }

  return (
    <div className="pt-32 bg-gradient-to-b from-white to-red-100 min-h-screen">
      <Navbar />

      {/* Paso de compra */}
      <div className="py-4 px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-bold text-gray-800">JFLOWG</h1>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>Compra Segura</span>
        </div>
      </div>

      <div className="px-6 pb-4">
        <div className="flex items-center justify-center gap-6 text-sm font-medium">
          <div className="flex items-center gap-2 text-red-600">
            <div className="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center text-xs font-bold">
              ✓
            </div>
            <span>Carrito</span>
          </div>
          <div className="w-6 h-0.5 bg-red-300"></div>
          <div className="flex items-center gap-2 text-red-600">
            <div className="w-6 h-6 rounded-full border-2 border-red-600 text-red-600 flex items-center justify-center text-xs font-bold">
              2
            </div>
            <span>Finalizar Compra</span>
          </div>
          <div className="w-6 h-0.5 bg-gray-300"></div>
          <div className="flex items-center gap-2 text-gray-400">
            <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-xs font-bold">
              3
            </div>
            <span>Confirmación</span>
          </div>
        </div>
      </div>

      {/* Estado: Carrito vacío */}
      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Tu carrito está vacío
          </h2>
          <p className="text-gray-600 mb-4">
            Agrega productos a tu carrito para comenzar a comprar.
          </p>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            onClick={() => window.location.href = "/Products"}
          >
            Ir a Productos
          </button>
        </div>
      ) : (
        // Estado: Carrito con productos
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row gap-6">
          {/* Lista de productos */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Mi Carrito</h2>
            <p className="text-sm text-gray-500 mb-4">
              Gestiona tus productos antes de proceder al pago
            </p>

            {cart.map((item, i) => (
              <div
                key={i}
                className="bg-white p-4 rounded-lg shadow flex justify-between items-center mb-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.product_variant_id?.images?.[0] || "https://cataas.com/cat"}
                    alt={item.product_id?.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800">{item.product_id?.name}</h3>
                    <p className="text-sm text-gray-500">
                      Talla: {item.product_variant_id?.size} | Color: {item.product_variant_id?.color || "N/A"}
                    </p>
                    <p className="text-red-600 font-bold text-sm">${item.product_variant_id?.price}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() =>
                      decreaseQuantity({
                        id: item.product_variant_id?._id,
                        product_id: item.product_id?._id,
                        product_variant_id: item.product_variant_id?._id,
                        quantity: item.quantity
                      })
                    }
                    className="text-gray-400 hover:text-red-600"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="font-semibold">{item.quantity}</span>
                  <button
                    onClick={() =>
                      increaseQuantity({
                        id: item.product_variant_id?._id,
                        product_id: item.product_id?._id,
                        product_variant_id: item.product_variant_id?._id,
                        quantity: item.quantity
                      })
                    }
                    className="text-gray-600 hover:text-red-600"
                  >
                    <Plus size={16} />
                  </button>
                  <button
                    onClick={() =>
                      removeFromCart({
                        product_id: item.product_id?._id,
                        product_variant_id: item.product_variant_id?._id,
                      })
                    }
                    className="text-gray-400 hover:text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}

            <button
              onClick={() => window.location.href = "/Products"}
              className="text-sm text-red-600 hover:underline mt-4 flex items-center gap-1"
            >
              ← Continuar comprando
            </button>
          </div>

          {/* Resumen del pedido */}
          <div className="w-full md:w-80 bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Resumen del pedido</h3>
            <div className="text-sm text-gray-700 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Envío</span>
                <span>$9.99</span>
              </div>
              <div className="flex justify-between">
                <span>Impuestos</span>
                <span>$14.00</span>
              </div>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between text-base font-bold text-red-600">
              <span>Total</span>
              <span>${(total + 9.99 + 14).toFixed(2)}</span>
            </div>

            <div className="mt-6">
              <input
                type="text"
                placeholder="Código promocional"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm mb-2"
              />
              <button className="w-full border text-sm border-red-500 text-red-600 rounded py-2 hover:bg-red-50">
                Aplicar
              </button>
            </div>

            <button className="mt-4 w-full bg-red-600 text-white py-2 rounded hover:bg-red-700" onClick={checkoutSession}>
              Proceder al pago
            </button>

            <div className="mt-4 flex gap-2 justify-center text-gray-400 text-xs">
              <span>💳</span>
              <span>VISA</span>
              <span>Mastercard</span>
              <span>Apple Pay</span>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
