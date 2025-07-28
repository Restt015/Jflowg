import axios from "axios";
// Servicio para peticiones de usuario usando axios
export async function registerUser(data) {
  try {
    const response = await axios.post("http://localhost:3001/api/v1/users", data, { withCredentials: true });
    console.log(response.data);
    if (response.status === 201) {
      return response.data;
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
      return response.data;
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Error al iniciar sesión");
  }
}


export async function getUserProfile() {
  try {
    const res = JSON.parse(sessionStorage.getItem('user'), 'utf-8'),
      { id } = res;

    const response = await axios.get(`http://localhost:3001/api/v1/users/${id}/profile`, {
      withCredentials: true
    });

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error("Error al obtener el perfil:", error);
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Error al obtener el perfil");
  }
}


export async function updateUserProfile(data) {
  try {
    const res = JSON.parse(sessionStorage.getItem('user'), 'utf-8'),
      { id } = res;
    const response = await axios.patch(`http://localhost:3001/api/v1/users/${id}/profile`, data, {
      withCredentials: true
    });

    if (response.status === 200) {
      alert("Perfil actualizado exitosamente");
      return response.data;
    } else {
      throw new Error("Error inesperado al actualizar el perfil");
    }
  } catch (error) {
    console.error("Error al actualizar perfil:", error);
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Error al actualizar el perfil");
  }
}
