import { useCart } from "../../context/CartContext";
import { Plus, Minus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { checkout } from "../../services/paymentService";

export default function DialogCart({ isOpen, onClose }) {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity
  } = useCart();

  const navigate = useNavigate();

  const handleViewCart = () => {
    onClose();
    navigate("/Cart");
  };

  const checkoutSession = async () => {
    const res = await checkout({ items: cart });
    window.location.href = res;
  }

  const groupedCart = cart.reduce((acc, item) => {
    const key = `${item.product_id?._id}-${item.product_variant_id?._id}`;
    const existing = acc.find(i => `${i.product_id?._id}-${i.product_variant_id?._id}` === key);

    if (existing) {
      existing.quantity += item.quantity;
    } else {
      acc.push({ ...item });
    }

    return acc;
  }, []);

  const total = groupedCart.reduce(
    (sum, i) => sum + (i.product_variant_id?.price || 0) * i.quantity,
    0
  );

  if (!isOpen) return null;

  return (
    <div className="fixed top-20 right-4 w-full max-w-md bg-rose-50 shadow-xl rounded-lg z-50 overflow-y-auto p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800 flex justify-between items-center">
        Mi Carrito
        <span className="text-sm bg-red-100 text-red-600 px-3 py-1 rounded-full">
          {groupedCart.length} {groupedCart.length === 1 ? "artículo" : "artículos"}
        </span>
      </h2>

      {groupedCart.length === 0 ? (
        <>
         <div className="flex flex-col items-center text-center py-6">
  <p className="text-gray-600 text-base mb-2">Tu carrito está vacío.</p>
  <button
    className="px-4 py-2 bg-white text-red-600 border border-red-500 rounded hover:bg-red-50 transition"
    onClick={onClose}
  >
    ← Continuar comprando
  </button>
</div>

        </>

      ) : (
        <>
          <ul className="space-y-4 scrollable max-h-96 overflow-y-auto">
            {groupedCart.map((item, i) => (
              <li
                key={i}
                className="bg-white rounded-lg p-4 flex gap-4 items-center shadow"
              >
                <img
                  src={
                    item.product_variant_id?.images?.[0] ||
                    "https://cataas.com/cat?type=square"
                  }
                  alt={item.product_id?.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">
                    {item.product_id?.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {item.product_id?.description} <br />
                    Talla: {item.product_variant_id?.size} | $ {item.product_variant_id?.price}
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    <button
                      onClick={() =>
                        decreaseQuantity({
                          id: item.product_variant_id?._id,
                          product_id: item.product_id?._id,
                          product_variant_id: item.product_variant_id?._id,
                          quantity: item.quantity
                        })
                      }
                      className="p-1 bg-gray-100 rounded hover:bg-gray-200"
                    >
                      <Minus size={14} />
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
                      className="p-1 bg-gray-100 rounded hover:bg-gray-200"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() =>
                    removeFromCart({
                      product_id: item.product_id?._id,
                      product_variant_id: item.product_variant_id?._id,
                    })
                  }
                >
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
              <button className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700" onClick={checkoutSession}>
                Proceder al pago
              </button>
              <button
                onClick={handleViewCart}
                className="flex-1 border border-black py-2 rounded text-black hover:bg-gray-100"
              >
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
