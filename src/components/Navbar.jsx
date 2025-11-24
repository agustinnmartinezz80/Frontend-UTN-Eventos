import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'


const Navbar = () => {
const { user, logout } = useContext(AuthContext)
return (
<nav className="bg-white border-b">
<div className="container flex items-center justify-between h-16">
<div className="flex items-center gap-4">
<Link to="/" className="font-bold text-lg">Gestor de Eventos</Link>
<Link to="/events" className="text-sm">Eventos</Link>
</div>
<div className="flex items-center gap-4">
{user ? (
<>
<span className="text-sm">{user.name}</span>
<button className="text-sm underline" onClick={logout}>Salir</button>
</>
) : (
<>
<Link to="/login" className="text-sm">Ingresar</Link>
<Link to="/register" className="text-sm">Registro</Link>
</>
)}
</div>
</div>
</nav>
)
}


export default Navbar