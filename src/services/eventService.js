// frontend/src/services/eventService.js
import axios from "axios";

// La URL apunta al backend según entorno
const API_URL = import.meta.env.VITE_API_URL + "/api/events";

// Listar todos los eventos
export const getEventos = async () => {
    try {
        const res = await axios.get(API_URL, { withCredentials: true });
        return res.data;
    } catch (error) {
        console.error("Error al obtener eventos:", error.response?.data || error.message);
        throw error;
    }
};

// Crear un nuevo evento
export const createEvento = async (evento) => {
    try {
        const res = await axios.post(API_URL, evento, { withCredentials: true });
        return res.data;
    } catch (error) {
        console.error("Error al crear evento:", error.response?.data || error.message);
        throw error;
    }
};

// Obtener un evento por ID
export const getEventoById = async (id) => {
    try {
        const res = await axios.get(`${API_URL}/${id}`, { withCredentials: true });
        return res.data;
    } catch (error) {
        console.error("Error al obtener el evento:", error.response?.data || error.message);
        throw error;
    }
};

// Actualizar un evento
export const updateEvento = async (id, evento) => {
    try {
        const res = await axios.put(`${API_URL}/${id}`, evento, { withCredentials: true });
        return res.data;
    } catch (error) {
        console.error("Error al actualizar el evento:", error.response?.data || error.message);
        throw error;
    }
};

// Eliminar un evento
export const deleteEvento = async (id) => {
    try {
        const res = await axios.delete(`${API_URL}/${id}`, { withCredentials: true });
        return res.data;
    } catch (error) {
        console.error("Error al eliminar el evento:", error.response?.data || error.message);
        throw error;
    }
};
