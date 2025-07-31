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

export async function updateProduct(id, data) {
  try {
    const response = await axios.put(`http://localhost:${PORT}/api/v1/products/${id}`, data, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Error al actualizar el producto");
  }
}

export async function deleteProduct(data) {
  try {
    const id = data._id || data.id;
    const res = await axios.delete(`http://localhost:${PORT}/api/v1/products/${id}`, { withCredentials: true });
    return res.data;
  } catch (Error) {
    throw new Error('Error al eliminar producto');
  }
}


export async function getUserById(id) {
  const res = await axios.get(`http://localhost:${PORT}/api/v1/users/${id}`, {
    withCredentials: true
  });
  return res.data;
}

export async function createUser(data) {
  try {
    const response = await axios.post(`http://localhost:${PORT}/api/v1/users`, data, {
      withCredentials: true
    });

    if (response.status === 201) {
      return response.data;
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Error al crear el usuario", error.response.data.message);
  }
}

export async function updateUserProfile(id, data) {
  try {
    const response = await axios.patch(`http://localhost:${PORT}/api/v1/users/${id}/profile`, data, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Error al actualizar el usuario");
  }
}


export async function deleteUser(data) {
  try{
  const id = data._id || data.id; 
  const res = await axios.delete(`http://localhost:${PORT}/api/v1/users/${id}`, {
  withCredentials: true });
  return res.data;
  } catch (Error){
    throw new Error("Error al eliminar Usuario");
  
}
}
