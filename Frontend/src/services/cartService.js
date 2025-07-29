// src/services/cartService.js
import axios from "axios";


export async function getCart() {
  try {
    const response = await axios.get("http://localhost:3001/api/v1/cart", {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener el carrito:", error);
    throw error;
  }
}

export async function addToCart(data) {
  try {
    const response = await axios.patch("http://localhost:3001/api/v1/cart", data, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error("Error al agregar producto al carrito:", error);
    throw error;
  }
}

export async function updateCart(data) {
  try {
    const response = await axios.patch("http://localhost:3001/api/v1/cart", data, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el carrito:", error);
    throw error;
  }
}

export async function removeFromCart(data) {
  try {
    const response = await axios.delete("http://localhost:3001/api/v1/cart", {
      data,
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error("Error al eliminar producto del carrito:", error);
    throw error;
  }
}
