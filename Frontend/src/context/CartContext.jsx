import { createContext, useContext, useEffect, useState } from "react";
import {
  getCart,
  addToCart as addStorage,
  removeFromCart as removeStorage,
  increaseQuantity as incStorage,
  decreaseQuantity as decStorage,
} from "../services/cartService";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setCart(getCart());
  }, []);

  const addToCart = (item) => {
    addStorage(item);
    setCart(getCart());
  };

  const removeFromCart = (id) => {
    removeStorage(id);
    setCart(getCart());
  };

  const increaseQuantity = (id) => {
    incStorage(id);
    setCart(getCart());
  };

  const decreaseQuantity = (id) => {
    decStorage(id);
    setCart(getCart());
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
}
