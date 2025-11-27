import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/api/events";

export const getEventos = async () => {
    const res = await axios.get(API_URL, { withCredentials: true });
    return res.data;
};

export const createEvento = async (evento) => {
    const res = await axios.post(API_URL, evento, { withCredentials: true });
    return res.data;
};

export const getEventoById = async (id) => {
    const res = await axios.get(`${API_URL}/${id}`, { withCredentials: true });
    return res.data;
};

export const updateEvento = async (id, evento) => {
    const res = await axios.put(`${API_URL}/${id}`, evento, { withCredentials: true });
    return res.data;
};

export const deleteEvento = async (id) => {
    const res = await axios.delete(`${API_URL}/${id}`, { withCredentials: true });
    return res.data;
};
