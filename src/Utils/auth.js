import api from "./api";

export async function registerUser({ username, email, password }) {
  try {
    const response = await api.post("/register", { username, email, password });
    return response.data;
  } catch (error) {
    console.error("Error en el registro:", error);
    throw error.response?.data || { error: "Error de conexión al servidor" };
  }
}

// Función para iniciar sesión
export const loginUser = async (credentials) => {
  try {
    const response = await api.post("/login", credentials);
    if (response.data.access_token) {
      localStorage.setItem("access_token", response.data.access_token);
    }
    return response.data;
  } catch (error) {
    console.error("Error en loginUser:", error);
    throw error.response?.data || { error: "Error de conexión al servidor" };
  }
};

// Función para cerrar sesión
export const logoutUser = () => {
  localStorage.removeItem("access_token");
};