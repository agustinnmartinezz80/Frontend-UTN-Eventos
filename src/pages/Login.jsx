import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    // Ping al backend para despertarlo al cargar la página
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/api/auth/ping`).catch(() => { });
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const data = await loginUser(email, password);
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            navigate("/events");
        } catch (error) {
            // Retry automático si falla por cold start
            console.warn("Primer intento falló, reintentando...", error);
            try {
                const data = await loginUser(email, password);
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
                navigate("/events");
            } catch (error2) {
                alert(error2.response?.data?.message || "Error al iniciar sesión");
            }
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
                Iniciar sesión
            </h2>
            <form onSubmit={handleLogin} className="space-y-4">
                <div>
                    <label className="block text-gray-600 mb-1">Correo electrónico</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-600 mb-1">Contraseña</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-2"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700"
                >
                    Entrar
                </button>
            </form>
        </div>
    );
}
