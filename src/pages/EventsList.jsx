import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function EventsList() {
    const [eventos, setEventos] = useState([]);

    const token = localStorage.getItem("token");

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/api/events`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then((res) => setEventos(res.data))
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-2xl font-bold mb-6">Eventos</h1>

            <Link
                to="/events/new"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 inline-block mb-6"
            >
                Crear Evento
            </Link>

            {eventos.length === 0 ? (
                <p className="text-gray-600">No hay eventos creados todavía.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {eventos.map((evento) => (
                        <Link
                            key={evento._id}
                            to={`/api/events/${evento._id}`}
                            className="p-4 border rounded-lg shadow hover:shadow-md transition bg-white"
                        >
                            <h2 className="text-lg font-bold">{evento.titulo}</h2>
                            <p className="text-sm text-gray-600">
                                {new Date(evento.fecha).toLocaleDateString()}
                            </p>
                            <p className="mt-2 text-gray-700">{evento.lugar}</p>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}

