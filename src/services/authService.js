import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/api/auth";

// Login
export const loginUser = async (email, password) => {
    try {
        const res = await axios.post(
            `${API_URL}/login`,
            { email, password },
            { withCredentials: true }
        );
        return res.data;
    } catch (error) {
        console.error("Error en login:", error.response?.data || error.message);
        throw error;
    }
};

// Registro
export const registerUser = async (userData) => {
    try {
        const res = await axios.post(`${API_URL}/register`, userData, { withCredentials: true });
        return res.data;
    } catch (error) {
        console.error("Error en registro:", error.response?.data || error.message);
        throw error;
    }
};

// Verificar email
export const verifyEmail = async (id) => {
    try {
        const res = await axios.get(`${API_URL}/verify/${id}`, { withCredentials: true });
        return res.data;
    } catch (error) {
        console.error("Error en verificación de email:", error.response?.data || error.message);
        throw error;
    }
};
