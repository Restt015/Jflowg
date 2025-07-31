import React from 'react';
import Navbar from '../../shared/components/navbar';
import Footer from '../../shared/components/Footer';

export default function AboutUs() {
    return (
        <section className="py-10 bg-gray-50">
            <Navbar />
            <div className="max-w-5xl mt-24 mx-auto px-4 text-center">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">Conócenos</h2>
                <p className="text-lg text-gray-600">
                    En nuestra tienda, creemos que la moda es una forma de expresión. Por eso te ofrecemos productos modernos, cómodos y asequibles para destacar tu estilo todos los días.
                </p>
            </div>
            {/* <Footer/> */}
        </section>
    );
}