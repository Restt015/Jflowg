import axios from "axios";
// Servicio para peticiones de usuario usando axios
export async function registerUser(data) {
  try {
    const response = await axios.post("http://localhost:3001/api/v1/users", data);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Error al registrar usuario");
  }
}

export async function loginUser(data) {
  try {
    const response = await axios.post("http://localhost:3001/api/v1/users/login", data);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Error al inisiar sesión");
  }
}
