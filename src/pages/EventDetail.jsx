import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/events/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEvent(res.data);
      } catch (error) {
        console.error("Error al cargar el evento:", error);
        alert("No se pudo cargar el evento.");
      }
    };

    fetchEvent();
  }, [id, token]);

  const handleDelete = async () => {
    if (!window.confirm("¿Estás seguro que quieres eliminar este evento?")) return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/events/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Evento eliminado correctamente");
      navigate("/events"); // 🔹 Navegar a lista de eventos
    } catch (error) {
      console.error("Error al eliminar el evento:", error);
      alert("No se pudo eliminar el evento.");
    }
  };

  if (!event) return <div>Cargando...</div>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow rounded space-y-4">
      <h2 className="text-2xl font-bold text-blue-600">{event.titulo}</h2>
      <p><strong>Fecha:</strong> {new Date(event.fecha).toLocaleDateString()}</p>
      <p><strong>Lugar:</strong> {event.lugar}</p>
      <p><strong>Descripción:</strong> {event.descripcion}</p>
      <p><strong>Tipo:</strong> {event.tipo}</p>

      <div className="flex space-x-4">
        <button
          onClick={() => navigate(`/events/${id}/edit`)}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          Editar
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}
