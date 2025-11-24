import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function VerifyEmail() {
    const { id } = useParams();

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/auth/verify/${id}`)
    }, []);

    return <h2>Verificando cuenta...</h2>;
}

