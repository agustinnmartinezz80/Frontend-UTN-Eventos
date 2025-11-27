import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/api/events";

// Crear evento
export const createEvento = async (evento) => {
    const token = localStorage.getItem("token"); // JWT del login

    try {
        const res = await axios.post(API_URL, evento, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        return res.data;
    } catch (error) {
        console.error(error.response?.data || error.message);
        throw error;
    }
};

// Traer todos los eventos del usuario
export const getEventos = async () => {
    const token = localStorage.getItem("token");

    try {
        const res = await axios.get(API_URL, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (error) {
        console.error(error.response?.data || error.message);
        throw error;
    }
};
