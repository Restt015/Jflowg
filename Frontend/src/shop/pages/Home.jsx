import React from 'react';
import Button1 from '../../shared/components/Button1';
import CardProduct from '../../shared/components/CardProduct';
import CardSellProduct from '../../shared/components/CardSellProduct';
import Navbar from '../../shared/components/navbar';
import Footer from '../../shared/components/Footer';

function Home() {
  return (
    <div className="pt-32 bg-gradient-to-b from-rose-100 to-pink-50">
  <Navbar></Navbar>
      <section className="w-full px-4 py-16 text-center max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl text-red-900 font-serif font-bold">JFLOWG</h1>
        <p className="mt-4 text-pink-900 text-base sm:text-lg font-mono">
          Descubre nuestra colección de ropa y accesorios únicos
        </p>
        <div className="mt-6">
          <Button1>Explorar Colección</Button1>
        </div>
      </section>
      <section className="w-full px-4 py-12 max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-red-900 font-serif">CATEGORÍAS</h2>
          <p className="text-gray-700 font-serif mt-4">
            Encuentra lo que buscas en nuestras categorías principales
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 place-items-center">
          <CardProduct 
           title="Ropa"
           description="Descubre nuestra ropa de moda" 
           image="" />
          <CardProduct 
          title="Zapatillas"
          description="Complementa tu look con zapatillas"
          image="" />
          <CardProduct 
          title="Gorras" 
          description="Encuentra la gorra perfecta para ti" 
          image="" />
          <CardProduct 
          title="Accesorios"
          description="Accesorios para cada ocasión" 
           image="" />
        </div>
      </section>
      <section className="w-full px-4 py-12 max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-red-900 font-serif">MÁS VENDIDOS</h2>
          <p className="text-gray-700 font-serif mt-4">
            Los productos favoritos de nuestros clientes
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 place-items-center">
          <CardSellProduct
            title="Zapatillas Sport"
            description="Tecnología avanzada"
            price="89.99"
            oldPrice="99.99"
            badge="Nuevo"
            badgeColor="bg-green-500"
            image=""
          />
          <CardSellProduct
            title="Zapatillas Sport"
            description="Tecnología avanzada"
            price="89.99"
            oldPrice="99.99"
            badge="-50%"
            badgeColor="bg-red-500"
            image=""
          />
          <CardSellProduct
            title="Zapatillas Sport"
            description="Tecnología avanzada"
            price="89.99"
            oldPrice="99.99"
            image=""
          />
          <CardSellProduct
            title="Zapatillas Sport"
            description="Tecnología avanzada"
            price="89.99"
            oldPrice="99.99"
            badge="Popular"
            badgeColor="bg-yellow-500"
            image=""
          />
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Home;
