
import { addToCart } from "../../services/cartService";

export default function CartButton({ product }) {
  const handleClick = () => {
    addToCart({ ...product, quantity: 1 }); // Puedes ajustar o pedir la talla
    alert("Producto agregado al carrito");
  };

  return (
    <button
      onClick={handleClick}
      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200"
    >
      <span className="text-sm">Agregar </span>
    </button>
  );
}
