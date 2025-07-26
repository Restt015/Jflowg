import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../../shared/components/navbar";
import Footer from "../../shared/components/Footer";
import { Toaster } from 'react-hot-toast';
 
export default function EditProfile() {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    phone_number: '',
    birth_date: '',
    gender: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    const stored = sessionStorage.getItem("user") || localStorage.getItem("user");
    if (stored) {
      const userData = JSON.parse(stored);
      setUser(userData);
      setFormData({
        name: userData.name || '',
        lastName: userData.lastName || '',
        email: userData.email || '',
        phone_number: userData.phone_number || '',
        birth_date: userData.birth_date?.slice(0, 10) || '',
        gender: userData.gender || ''
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify(formData));
    sessionStorage.setItem("user", JSON.stringify(formData));
    alert('Cambios guardados correctamente');
    navigate('/Profile');
  };

  if (!user) return <p className="p-4">Cargando perfil...</p>;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-rose-200 to-gray-100">
      <Navbar />
      <main className="flex-grow max-w-6xl mx-auto px-4 py-28">
        <h1 className="text-4xl font-extrabold text-rose-700 mb-12 text-center font-serif">Editar Perfil</h1>

        <div className="bg-white shadow-2xl rounded-3xl flex flex-col md:flex-row overflow-hidden">
          <aside className="w-full md:w-1/3 border-r px-8 py-12 flex flex-col items-center">
            <div className="w-36 h-36 bg-rose-500 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow">
              {user.name?.[0] ?? ''}{user.lastName?.[0] ?? ''}
            </div>
            <h2 className="mt-6 text-2xl font-bold text-gray-800">{user.name} {user.lastName}</h2>
            
          </aside>

          <section className="flex-1 p-20">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nombre</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} className="mt-1 w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Apellido</label>
                  <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="mt-1 w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                  <input type="text" name="phone_number" value={formData.phone_number} onChange={handleChange} className="mt-1 w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Fecha de Nacimiento</label>
                  <input type="date" name="birth_date" value={formData.birth_date} onChange={handleChange} className="mt-1 w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Género</label>
                  <select name="gender" value={formData.gender} onChange={handleChange} className="mt-1 w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400">
                    <option value="">Seleccionar</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-4">
                <button type="submit" className="bg-rose-500 text-white px-6 py-3 rounded-full hover:bg-rose-600 transition shadow">Guardar Cambios</button>
                <button type="button" onClick={() => navigate('/Profile')} className="border border-gray-300 px-6 py-3 rounded-full hover:bg-gray-100 transition">Cancelar</button>
              </div>
            </form>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
