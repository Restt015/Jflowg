import axios from "axios";
// Servicio para peticiones de usuario usando axios
export async function registerUser(data) {
  try {
    const response = await axios.post("http://localhost:3001/api/v1/users", data, { withCredentials: true });
    console.log(response.data);
    if (response.status === 201) {
      alert("Usuario registrado exitosamente");
      return response.data
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Error al registrar usuario", error.response.data.message);
  }
}

export async function loginUser(data) {
  try {
    const response = await axios.post("http://localhost:3001/api/v1/users/login", data, { withCredentials: true });
    console.log(response.data);
    if (response.status === 200) {
      alert("Inicio de sesión exitoso");
      return response.data;
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Error al iniciar sesión");
  }
}
