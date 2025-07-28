import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../../shared/components/navbar";
import Footer from "../../shared/components/Footer";
import { updateUserProfile, getUserProfile } from '../../services/userService';

export default function EditProfile() {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    phone_number: '',
    birth_date: '',
    gender: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const stored = sessionStorage.getItem("user") || localStorage.getItem("user");
      console.log(stored);

      if (!stored) {
        navigate("/Login");
        return;
      }
      const res = await getUserProfile()
      setUser(res)
    }
    fetchUser()
  }, []);

  const handleChange = (e) => {
    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateUserProfile(formData);
      sessionStorage.setItem("user", JSON.stringify(res.user));
      localStorage.setItem("user", JSON.stringify(res.user));
      navigate(res.redirectTo);
    } catch (error) {
      console.error("Error al actualizar perfil:", error);
      alert("Error al guardar los cambios");
    }  
  
  const stored = sessionStorage.getItem("user") || localStorage.getItem("user");
    if (!stored) {
      alert("No hay sesión iniciada.");
      navigate("/Login");
      return;
    }

    

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const res = await updateUserProfile(formData);

      sessionStorage.setItem("user", JSON.stringify(res.user));
      localStorage.setItem("user", JSON.stringify(res.user));
      const updated = await updateUserProfile(formData);
      sessionStorage.setItem("user", JSON.stringify(updated));
      localStorage.setItem("user", JSON.stringify(updated));
      alert("Cambios guardados correctamente");
      navigate(res.redirectTo);
    } catch (error) {
      console.error("Error al actualizar perfil:", error);
      alert("Error al guardar los cambios");
    }
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
              {user.name?.[0]}{user.lastName?.[0]}
            </div>
            <h2 className="mt-6 text-2xl font-bold text-gray-800">{user.name} {user.lastName}</h2>
          </aside>

          <section className="flex-1 p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <input name="name" value={formData.name} onChange={handleChange} placeholder="Nombre" className="p-3 border rounded-xl" required />
                <input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Apellido" className="p-3 border rounded-xl" required />
                <input name="phone_number" value={formData.phone_number} onChange={handleChange} placeholder="Teléfono" className="p-3 border rounded-xl" />
                <input name="birth_date" type="date" value={formData.birth_date} onChange={handleChange} className="p-3 border rounded-xl" />
                <select name="gender" value={formData.gender} onChange={handleChange} className="p-3 border rounded-xl">
                  <option value="">Seleccionar</option>
                  <option value="male">Masculino</option>
                  <option value="female">Femenino</option>
                  <option value="other">Otro</option>
                </select>
              </div>
              <div className="flex justify-end gap-4">
                <button type="submit" className="bg-rose-500 text-white px-6 py-3 rounded-full hover:bg-rose-600">Guardar Cambios</button>
                <button type="button" onClick={() => navigate('/Profile')} className="border px-6 py-3 rounded-full">Cancelar</button>
              </div>
            </form>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
