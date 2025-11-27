import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function VerifyEmail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState("loading");
    const [message, setMessage] = useState("");

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/auth/verify/${id}`
                );
                setStatus("success");
                setMessage(response.data.message || "Cuenta verificada exitosamente");

                // Redirigir al login después de 3 segundos
                setTimeout(() => {
                    navigate("/login");
                }, 3000);
            } catch (error) {
                console.error("Error verificando cuenta:", error);
                setStatus("error");
                setMessage(
                    error.response?.data?.message ||
                        "Error al verificar la cuenta. El enlace puede haber expirado o ser inválido."
                );
            }
        };

        if (id) {
            verifyEmail();
        }
    }, [id, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
            <div className="max-w-md w-full bg-white shadow-2xl rounded-2xl p-8">
                {status === "loading" && (
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto mb-4"></div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Verificando cuenta...</h2>
                        <p className="text-gray-600">Por favor espera un momento</p>
                    </div>
                )}

                {status === "success" && (
                    <div className="text-center">
                        <div className="bg-green-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                            <svg
                                className="h-10 w-10 text-green-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">¡Verificación exitosa!</h2>
                        <p className="text-gray-600 mb-4">{message}</p>
                        <p className="text-sm text-gray-500">Serás redirigido al login en unos segundos...</p>
                        <button
                            onClick={() => navigate("/login")}
                            className="mt-6 w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
                        >
                            Ir al Login ahora
                        </button>
                    </div>
                )}

                {status === "error" && (
                    <div className="text-center">
                        <div className="bg-red-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                            <svg
                                className="h-10 w-10 text-red-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Error en la verificación</h2>
                        <p className="text-gray-600 mb-4">{message}</p>
                        <button
                            onClick={() => navigate("/register")}
                            className="mt-6 w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
                        >
                            Volver a registrarse
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
