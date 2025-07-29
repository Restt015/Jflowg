import { createContext, useContext, useEffect, useState } from "react";
import { addToCart, getCart, removeFromCart, updateCart } from "../services/cartService";


const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const fetchCart = async () => {
    try {
      const result = await getCart();
      setCart(result?.items || []);
    } catch (err) {
      console.error("Error al cargar el carrito", err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleAddToCart = async (item) => {
    try {
      const existingItem = cart.find(
        (i) =>
          i.product_id === item.product_id &&
          i.product_variant_id === item.id
      );

      if (existingItem) {
        const updatedItem = {
          product_id: item.product_id,
          product_variant_id: item.id,
          quantity: existingItem.quantity + item.quantity,
        };
        await updateCart(updatedItem);
      } else {
        const cartItem = {
          items: [
            {
              product_id: item.product_id,
              product_variant_id: item.id,
              quantity: item.quantity,
            },
          ],
        };
        await addToCart(cartItem);
      }

      fetchCart();
    } catch (err) {
      console.error("No se pudo agregar al carrito", err);
    }
  };

  const increaseQuantity = async (item) => {
    try {
      const itemExist = cart.find((i) => {
        return (
          i.product_id._id === item.product_id &&
          i.product_variant_id._id === item.product_variant_id
        )
      });

      if (itemExist) {
        const updatedItem = { ...item, quantity: item.quantity + 1 };
        await updateCart({ items: updatedItem });
      }

      fetchCart();
    } catch (err) {
      console.error("Error al aumentar cantidad", err);
    }
  };

  const decreaseQuantity = async (item) => {
    try {
      if (item.quantity <= 1) return;

      const itemExist = cart.find((i) => {
        return (
          i.product_id._id === item.product_id &&
          i.product_variant_id._id === item.product_variant_id
        )
      });

      if (itemExist) {
        const updatedItem = { ...item, quantity: item.quantity - 1 };
        await updateCart({ items: updatedItem });
      }

      fetchCart();
    } catch (err) {
      console.error("Error al disminuir cantidad", err);
    }
  };



  const handleRemoveFromCart = async (item) => {
    try {
      await removeFromCart(item);
      fetchCart();
    } catch (err) {
      console.error("No se pudo eliminar del carrito", err);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart: handleAddToCart,
        removeFromCart: handleRemoveFromCart,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
