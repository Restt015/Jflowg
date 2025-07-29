
import { useCart } from "../../context/CartContext";

export default function CartButton({ product }) {
  const { addToCart } = useCart();

  const handleClick = () => {
    addToCart({ 
      product, 
      size: "M", 
      quantity: 1 });
    alert("Producto agregado al carrito");
  };

  return (
    <button onClick={handleClick} className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200">
      Agregar
    </button>
  );
}


