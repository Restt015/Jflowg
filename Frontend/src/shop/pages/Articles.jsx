import React, { useState } from "react";
import SidebarFilter from "../components/SideBarFilter";
import SortBar from "../components/Sortbar";
import ProductGrid from "../components/ProductGrid";
import Pagination from "../components/Pagination";
import NavBar from "../../shared/components/navbar";
import Footer from "../../shared/components/Footer";


function Articles() {
  const [currentPage, setCurrentPage] = useState(1);

  const products = [
  { id: "product1", title: "Artículo", description: "Zara", price: 89.99, image: "" },
  { id: "product2", title: "Artículo", description: "H&M", price: 45.99, image: "" },
  { id: "product3", title: "Artículo",  description: "Mango", price: 69.99, image: "" },
  { id: "product4", title: "Falda Floral", description: "Bershka", price: 39.99, image: "" },
  { id: "product5", title: "Blazer Formal", description: "Bershka", price: 99.99, image: "" },
  { id: "product6", title: "Artículo", description: "Zara", price: 55.99, image: "" },
  { id: "product7", title: "Artículo", description: "H&M", price: 79.99, image: "" },
  { id: "product8", title: "Artículo", description: "Mango", price: 29.99, image: "" },
];


  const totalPages = 5;

  return (
    <div className="pt-28 bg-gradient-to-b from-rose-200 to-gray-100 min-h-screen">
      <NavBar />

      <main className="max-w-10xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col lg:flex-row gap-8">
        {/* Sidebar para filtros */}
        <aside className="w-full lg:w-[260px]">
          <SidebarFilter />
        </aside>

        {/* Contenido principal */}
        <section className="flex-1 bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Ropa Masculina</h1>
              <p className="text-sm text-gray-500">{products.length} productos</p>
            </div>
            <SortBar />
          </div>

          {/* Productos */}
          <ProductGrid products={products} />

          {/* Paginación */}
          <div className="mt-10">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Articles;
