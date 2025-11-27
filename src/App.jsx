import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Register from './pages/Register'
import Login from './pages/Login'
import VerifyEmail from './pages/VerifyEmail'
import EventsList from './pages/EventsList'
import EventDetail from './pages/EventDetail'
import EventForm from './pages/EventForm'
import ProtectedRoute from './components/ProtectedRoute'

export default function App() {
    // 🔹 Ping al backend para despertar el serverless
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/api/auth/ping`).catch(() => { })
    }, [])

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <Routes>
                <Route path="/" element={<Navigate to="/events" replace />} />
                <Route path="/register" element={<Register />} />
                <Route path="/verify-email/:id" element={<VerifyEmail />} />
                <Route path="/login" element={<Login />} />

                <Route path="/events" element={<ProtectedRoute><EventsList /></ProtectedRoute>} />
                <Route path="/events/new" element={<ProtectedRoute><EventForm /></ProtectedRoute>} />
                <Route path="/events/:id" element={<ProtectedRoute><EventDetail /></ProtectedRoute>} />
                <Route path="/events/:id/edit" element={<ProtectedRoute><EventForm /></ProtectedRoute>} />

                <Route path="*" element={<div className="container py-8">Página no encontrada</div>} />
            </Routes>
        </div>
    )
}
