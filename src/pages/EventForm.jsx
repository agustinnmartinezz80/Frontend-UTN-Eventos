import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function EventForm() {
    const [formData, setFormData] = useState({
        titulo: "",
        fecha: "",
        lugar: "",
        descripcion: "",
        tipo: "",
        horaInicio: "",
        horaFin: "",
    });

    const navigate = useNavigate();
    const { id } = useParams();
    const isEditing = Boolean(id);

    const token = localStorage.getItem("token");

    useEffect(() => {
        if (isEditing) {
            axios
                .get(`${import.meta.env.VITE_API_URL}/api/events/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((res) => setFormData(res.data))
                .catch((err) => console.log(err));
        }
    }, [id]);

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            if (isEditing) {
                await axios.put(
                    `${import.meta.env.VITE_API_URL}/api/events/${id}`,
                    formData,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            } else {
                await axios.post(
                    `${import.meta.env.VITE_API_URL}/events`,
                    formData,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            }

            navigate("/events");
        } catch (error) {
            console.log(error);
            alert("Hubo un error, revisa los datos.");
        }
    }

    return (
        <div className="max-w-lg mx-auto mt-10 bg-white shadow-lg rounded-xl p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-blue-600 text-center mb-6 tracking-wide">
                {isEditing ? "Editar Evento" : "Crear Nuevo Evento"}
            </h2>

            <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-gray-600 mb-1">Título del evento</label>
                    <input
                        type="text"
                        name="titulo"
                        className="w-full border border-gray-300 rounded-lg p-2 focus:border-blue-500 outline-none"
                        value={formData.titulo}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-600 mb-1">Fecha</label>
                    <input
                        type="date"
                        name="fecha"
                        className="w-full border border-gray-300 rounded-lg p-2 focus:border-blue-500 outline-none"
                        value={formData.fecha?.substring(0, 10)}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-600 mb-1">Ubicación</label>
                    <input
                        type="text"
                        name="lugar"
                        className="w-full border border-gray-300 rounded-lg p-2 focus:border-blue-500 outline-none"
                        value={formData.lugar}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-600 mb-1">Descripción</label>
                    <textarea
                        name="descripcion"
                        rows="3"
                        className="w-full border border-gray-300 rounded-lg p-2 focus:border-blue-500 outline-none"
                        value={formData.descripcion}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>


                <div>
                    <label className="block text-gray-600 mb-1">Tipo de evento</label>
                    <select
                        name="tipo"
                        className="w-full border border-gray-300 rounded-lg p-2"
                        value={formData.tipo}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Seleccionar...</option>
                        <option value="Concierto">Concierto</option>
                        <option value="Taller">Taller</option>
                        <option value="Charla">Charla</option>
                        <option value="Fiesta">Fiesta</option>
                        <option value="Reunión">Reunión</option>
                        <option value="Otro">Otro</option>
                    </select>
                </div>

                <div>
                    <label className="block text-gray-600 mb-1">Hora de inicio</label>
                    <input
                        type="time"
                        name="horaInicio"
                        className="w-full border border-gray-300 rounded-lg p-2"
                        value={formData.horaInicio}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label className="block text-gray-600 mb-1">Hora de fin</label>
                    <input
                        type="time"
                        name="horaFin"
                        className="w-full border border-gray-300 rounded-lg p-2"
                        value={formData.horaFin}
                        onChange={handleChange}
                    />
                </div>


                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition-all"
                >
                    {isEditing ? "Guardar Cambios" : "Crear Evento"}
                </button>
            </form>
        </div>
    );
}



