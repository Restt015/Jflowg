import { useCart } from "../../context/CartContext";

export default function CartButton({ product, variant }) {
  const { addToCart } = useCart();

  const handleClick = () => {
    if (!product || !variant) return;

    const item = {
      id: variant._id, 
      product_id: product._id,
      title: product.name,
      description: product.description,
      price: variant.price,
      size: variant.size,
      image: variant.images[0],
      quantity: 1,
    };
    addToCart(item);
  };
 
   
  return (
    <button
      onClick={handleClick}
      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200"
    >
      Agregar
    </button>
   
  );
}
