import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'


const Register = () => {
const { register } = useContext(AuthContext)
const [form, setForm] = useState({ name: '', email: '', password: '' })
const [msg, setMsg] = useState(null)
const navigate = useNavigate()


const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })


const onSubmit = async (e) => {
e.preventDefault()
try {
await register(form)
setMsg('Registrado. Revisa tu email para verificar la cuenta.')
setTimeout(() => navigate('/login'), 2500)
} catch (err) {
setMsg(err.response?.data?.message || err.message)
}
}


return (
<div className="container py-8">
<h1 className="text-2xl font-bold mb-4">Registro</h1>
{msg && <div className="mb-4 p-3 bg-gray-100">{msg}</div>}
<form onSubmit={onSubmit} className="max-w-md">
<label className="block mb-2">Nombre</label>
<input name="name" value={form.name} onChange={onChange} className="w-full mb-3 p-2 border rounded" />
<label className="block mb-2">Email</label>
<input name="email" value={form.email} onChange={onChange} className="w-full mb-3 p-2 border rounded" />
<label className="block mb-2">Contraseña</label>
<input type="password" name="password" value={form.password} onChange={onChange} className="w-full mb-3 p-2 border rounded" />
<button className="px-4 py-2 bg-blue-600 text-white rounded">Registrarme</button>
</form>
</div>
)
}


export default Register