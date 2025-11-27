import React, { createContext, useEffect, useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userJson = localStorage.getItem('user');
        if (token && userJson) setUser(JSON.parse(userJson));
        setLoading(false);
    }, []);

    const register = async (payload) => {
        const res = await api.post('/api/auth/register', payload);
        return res.data;
    };

    const verifyEmail = async (token) => {
        const res = await api.get(`/api/auth/verify?token=${token}`);
        return res.data;
    };

    const login = async (payload) => {
        const res = await api.post('/api/auth/login', payload);
        const { token, user } = res.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
        return user;
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ user, loading, register, login, logout, verifyEmail }}>
            {children}
        </AuthContext.Provider>
    );
};
