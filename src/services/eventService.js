const API_URL = import.meta.env.VITE_API_URL + "/eventos";

export const getEventos = async () => {
    const res = await fetch(API_URL);
    return res.json();
};

export const createEvento = async (evento) => {
    const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(evento),
    });
    return res.json();
};
