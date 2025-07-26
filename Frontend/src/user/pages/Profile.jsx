import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pencil } from 'lucide-react';
import Navbar from "../../shared/components/navbar";
import Footer from "../../shared/components/Footer";

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = sessionStorage.getItem("user") || localStorage.getItem("user");
    if (stored) {
      const userData = JSON.parse(stored);
      setUser(userData);
    }
  }, []);

  if (!user) return <p className="p-4">Cargando perfil...</p>;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-rose-200 to-gray-100">
      <Navbar />
      <main className="flex-grow max-w-6xl mx-auto px-6 py-28">
        <h1 className="text-4xl font-extrabold text-rose-700 mb-12 text-center font-serif">Perfil del Usuario</h1>

        <div className="bg-white shadow-2xl rounded-3xl p-12 flex flex-col md:flex-row gap-12 items-center justify-center">
          {/* User Info */}
          <aside className="flex flex-col items-center text-center w-full md:w-1/3">
            <div className="w-36 h-36 bg-rose-500 rounded-full flex items-center justify-center text-white text-5xl font-bold shadow-xl">
              {user.name?.[0] ?? ''}{user.lastName?.[0] ?? ''}
            </div>
            <h2 className="mt-6 text-2xl font-bold text-gray-800">{user.name} {user.lastName}</h2>
            
            
          </aside>

          {/* Personal Info */}
          <div className="flex-1 w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Información Personal</h2>
              <button
                onClick={() => navigate('/EditProfile')}
                className="flex items-center gap-2 text-white bg-rose-500 px-4 py-2 rounded-full hover:bg-rose-600 transition duration-200 shadow-md text-sm"
              >
                <Pencil size={16} /> Editar
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6 text-base">
              <div className="bg-red-50 p-5 rounded-xl shadow-sm">
                <p className="text-gray-500 font-medium mb-1">Nombre</p>
                <p className="text-gray-900 font-semibold truncate">{user.name}</p>
              </div>
              <div className="bg-red-50 p-5 rounded-xl shadow-sm">
                <p className="text-gray-500 font-medium mb-1">Apellido</p>
                <p className="text-gray-900 font-semibold truncate">{user.lastName}</p>
              </div>
              <div className="bg-red-50 p-5 rounded-xl shadow-sm">
                <p className="text-gray-500 font-medium mb-1">Correo Electrónico</p>
                <p className="text-gray-900 font-semibold break-words truncate">{user.email}</p>
              </div>
              <div className="bg-red-50 p-5 rounded-xl shadow-sm">
                <p className="text-gray-500 font-medium mb-1">Teléfono</p>
                <p className="text-gray-900 font-semibold truncate">{user.phone_number || 'No especificado'}</p>
              </div>
              <div className="bg-red-50 p-5 rounded-xl shadow-sm">
                <p className="text-gray-500 font-medium mb-1">Fecha de Nacimiento</p>
                <p className="text-gray-900 font-semibold truncate">{user.birth_date?.slice(0, 10) || 'No especificada'}</p>
              </div>
              <div className="bg-red-50 p-5 rounded-xl shadow-sm">
                <p className="text-gray-500 font-medium mb-1">Género</p>
                <p className="text-gray-900 font-semibold capitalize truncate">{user.gender || 'No especificado'}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
