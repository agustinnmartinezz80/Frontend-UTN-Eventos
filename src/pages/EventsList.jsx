// src/pages/EventsList.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function EventsList() {
    const [events, setEvents] = useState([]);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/events`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setEvents(res.data);
            } catch (error) {
                console.error("Error al cargar eventos:", error);
                alert("No se pudieron cargar los eventos.");
            }
        };

        fetchEvents();
    }, [token]);

    return (
        <div className="max-w-3xl mx-auto mt-10 space-y-4">
            {/* Botón Crear Evento */}
            <div className="flex justify-end mb-4">
                <button
                    onClick={() => navigate("/events/new")}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    Crear Evento
                </button>
            </div>

            {/* Lista de Eventos */}
            {events.length === 0 ? (
                <div className="p-4 bg-white shadow rounded">
                    <h2 className="text-xl font-bold text-center text-gray-700">
                        No hay eventos disponibles.
                    </h2>
                </div>
            ) : (
                events.map((evento) => (
                    <Link
                        key={evento._id}
                        to={`/events/${evento._id}`}
                        className="block p-4 border rounded-lg hover:bg-gray-100 transition cursor-pointer"
                    >
                        <h3 className="text-lg font-bold text-blue-600">{evento.titulo}</h3>
                        <p className="text-gray-600">{new Date(evento.fecha).toLocaleDateString()}</p>
                        <p className="text-gray-500 truncate">{evento.descripcion}</p>
                    </Link>
                ))
            )}
        </div>
    );
}
