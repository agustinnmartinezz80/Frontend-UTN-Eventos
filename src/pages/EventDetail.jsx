import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import api from '../api/api'

const EventDetail = () => {
  const { id } = useParams()
  const [ev, setEv] = useState(null)
  const [err, setErr] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get(`/events/${id}`)
        setEv(res.data)
      } catch (e) {
        setErr(e.response?.data?.message || e.message)
      }
    })()
  }, [id])

  const onDelete = async () => {
    if (!confirm("¿Eliminar este evento?")) return
    try {
      await api.delete(`/events/${id}`)
      navigate('/events')
    } catch (e) {
      alert(e.response?.data?.message || e.message)
    }
  }

  if (err) return <div className="container py-8">{err}</div>
  if (!ev) return <div className="container py-8">Cargando...</div>

  return (
    <div className="container mx-auto py-8 max-w-2xl bg-white p-6 rounded shadow">

      <h1 className="text-3xl font-bold text-blue-600 mb-4">
        {ev.titulo}
      </h1>

      <p className="text-gray-700 mb-2"><strong>Descripción:</strong> {ev.descripcion}</p>

      <p className="text-gray-700 mb-2"><strong>Fecha:</strong> {new Date(ev.fecha).toLocaleDateString()}</p>

      <p className="text-gray-700 mb-2"><strong>Hora de inicio:</strong> {ev.horaInicio || "No especificada"}</p>

      <p className="text-gray-700 mb-2"><strong>Hora de fin:</strong> {ev.horaFin || "No especificada"}</p>

      <p className="text-gray-700 mb-2"><strong>Lugar:</strong> {ev.lugar}</p>

      <p className="text-gray-700 mb-2"><strong>Tipo de evento:</strong> {ev.tipo}</p>

    
<p className="text-gray-700 mb-6">
  <strong>Organizador:</strong> {ev.userId?.name || "No especificado"}
</p>


      <div className="flex gap-3">
        <Link
          to={`/events/${id}/edit`}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
        >
          Editar
        </Link>

        <button
          onClick={onDelete}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
        >
          Eliminar
        </button>
      </div>

    </div>
  )
}

export default EventDetail

