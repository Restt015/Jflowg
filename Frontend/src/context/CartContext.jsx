import { createContext, useContext, useEffect, useState } from "react";
import {
  getCart as getFromStorage,
  addToCart as addToStorage,
  removeFromCart as removeFromStorage,
  increaseQuantity as increaseInStorage,
  decreaseQuantity as decreaseInStorage,
  clearCart as clearStorage
} from "../services/cartService";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setCart(getFromStorage());
  }, []);

  const addToCart = (item) => {
    addToStorage(item);
    setCart(getFromStorage());
  };

  const removeFromCart = (id) => {
    removeFromStorage(id);
    setCart(getFromStorage());
  };

  const increaseQuantity = (id) => {
    increaseInStorage(id);
    setCart(getFromStorage());
  };

  const decreaseQuantity = (id) => {
    decreaseInStorage(id);
    setCart(getFromStorage());
  };

  const clearCart = () => {
    clearStorage();
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
