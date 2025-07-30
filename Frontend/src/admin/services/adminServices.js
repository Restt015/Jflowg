
import axios from 'axios';

const PORT = import.meta.env.VITE_SERVER_PORT;

export async function createProduct(data) {
  try {
    const response = await axios.post(`http://localhost:${PORT}/api/v1/products`, data, {
      withCredentials: true
    });

    if (response.status === 201) {
      return response.data;
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Error al crear el producto", error.response.data.message);
  }
}

