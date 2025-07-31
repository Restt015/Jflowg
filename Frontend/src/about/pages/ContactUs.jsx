import React from 'react';
import Navbar from '../../shared/components/navbar';
import Footer from '../../shared/components/Footer';

export default function ContactUs() {
    return (
        <section className="py-10 bg-white">
            <Navbar />
            <div className="max-w-xl mx-auto px-4">
                <h2 className="text-3xl font-bold mt-24 mb-6 text-center">Envíanos un mensaje</h2>
                <form className="space-y-4">
                    <input type="text" placeholder="Nombre" className="w-full p-3 border border-gray-300 rounded-lg" />
                    <input type="email" placeholder="Correo" className="w-full p-3 border border-gray-300 rounded-lg" />
                    <textarea placeholder="Tu mensaje" className="w-full p-3 border border-gray-300 rounded-lg h-32" />
                    <button className="w-full bg-black text-white py-2 rounded hover:bg-gray-800">Enviar</button>
                </form>
            </div>
            {/* <Footer /> */}
        </section>
    );
}