import axios from "axios";

// Registrar usuario
export async function registerUser(data) {
  try {
    const response = await axios.post("http://localhost:3001/api/v1/users", data, {
      withCredentials: true
    });

    if (response.status === 201) {
      alert("Usuario registrado exitosamente");
      return response.data;
    }
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Error al registrar usuario");
  }
}

// Login usuario
export async function loginUser(data) {
  try {
    const response = await axios.post("http://localhost:3001/api/v1/users/login", data, {
      withCredentials: true
    });

    if (response.status === 200) {
      alert("Inicio de sesión exitoso");
      return response.data;
    }
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Error al iniciar sesión");
  }
}


export async function getUserProfile(data) {
  try {
    const userId = data.id || data._id;
    if (!userId) throw new Error("ID de usuario no proporcionado");

    const response = await axios.get(`http://localhost:3001/api/v1/users/${userId}/profile`, {
      withCredentials: true
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("No se pudo obtener el perfil");
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
    const userId = data.id || data._id;
    if (!userId) throw new Error("ID de usuario no encontrado para actualizar el perfil.");

    const response = await axios.patch(`http://localhost:3001/api/v1/users/${userId}/profile`, data, {
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
